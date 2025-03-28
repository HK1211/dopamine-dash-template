const fs = require('fs');
const path = require('path');

const renderShadcnForm = require('../templates/shadcn/Form.tpl.js');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ meta JSON 파일 경로를 입력해주세요.');
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
if (!fs.existsSync(metaPath)) {
  console.error('❌ meta 파일이 존재하지 않습니다:', metaPath);
  process.exit(1);
}

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
const pascalName = meta.name.charAt(0).toUpperCase() + meta.name.slice(1);
const outputDir = path.join('generated', 'components', pascalName);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const formCode = renderShadcnForm(meta, pascalName);
const outPath = path.join(outputDir, 'Form.tsx');
fs.writeFileSync(outPath, formCode, 'utf-8');

console.log(`✅ shadcn 스타일 Form 컴포넌트가 생성되었습니다: ${outPath}`);