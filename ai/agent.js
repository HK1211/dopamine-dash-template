require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateComponent(aiPrompt, name) {
  const promptTemplate = fs.readFileSync("ai/promptTemplates/component.prompt.txt", "utf-8");
  const fullPrompt = promptTemplate.replace("{{aiPrompt}}", aiPrompt);

  const chat = await openai.chat.completions.create({
    model: process.env.MODEL || "gpt-4",
    messages: [
      { role: "system", content: "당신은 React 전문가입니다." },
      { role: "user", content: fullPrompt },
    ],
    temperature: 0.2,
  });

  const code = chat.choices[0]?.message?.content;
  const filePath = path.join("generated", "ai", `${name}GeneratedComponent.tsx`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, code);
  console.log(`✅ AI 컴포넌트 생성 완료: ${filePath}`);
}

module.exports = { generateComponent };
