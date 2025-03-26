const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ 메타 파일 경로를 입력하세요. 예: node generate-crud.js meta/products.meta?.json");
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
const meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));

const toPascalCase = (str) => str.replace(/(^\w|_\w)/g, (match) => match.replace("_", "").toUpperCase());

const writeFileSafe = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.log(`⚠️ 파일이 이미 존재합니다: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content);
  console.log(`✅ 파일 생성됨: ${filePath}`);
};

const baseName = meta?.name;
const pascalName = toPascalCase(baseName);
const outPageDir = path.join("generated", "pages", baseName);
const outCompDir = path.join("generated", "components", pascalName);
const outHookDir = path.join("generated", "hooks");

fs.mkdirSync(outPageDir, { recursive: true });
fs.mkdirSync(outCompDir, { recursive: true });
fs.mkdirSync(outHookDir, { recursive: true });

const pageContent = `
import ${pascalName}FormComponent from '../../components/${pascalName}/${pascalName}FormComponent';
import ${pascalName}TableComponent from '../../components/${pascalName}/${pascalName}TableComponent';

export default function Page() {
  return (
    <div>
      <h1>${meta?.title}</h1>
      <${pascalName}FormComponent />
      <${pascalName}TableComponent />
    </div>
  );
}
`;

writeFileSafe(path.join(outPageDir, "page.tsx"), pageContent);

const renderFormComponent = require("../templates/formComponent.tpl");
const formCode = renderFormComponent(meta, pascalName);
writeFileSafe(path.join(outCompDir, `${pascalName}FormComponent.tsx`), formCode);

const tableHeaders = meta?.columns.map((col) => `<th>${col.label}</th>`).join("");
const tableCells = meta?.columns.map((col) => `<td>{item.${col.name}}</td>`).join("");

const tableComponent = `
export default function ${pascalName}TableComponent() {
  const data = []; // TODO: API 연동 필요
  return (
    <table>
      <thead><tr>${tableHeaders}</tr></thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            ${tableCells}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
`;

writeFileSafe(path.join(outCompDir, `${pascalName}TableComponent.tsx`), tableComponent);

const apiHookContent = `
import axios from 'axios';

export const use${pascalName}Api = () => {
  const baseUrl = '${meta?.api.baseUrl}';

  const getList = () => axios.get(baseUrl);
  const create = (data) => axios.post(baseUrl, data);
  const update = (id, data) => axios.put(\`\${baseUrl}/\${id}\`, data);
  const remove = (id) => axios.delete(\`\${baseUrl}/\${id}\`);

  return { getList, create, update, remove };
};
`;

writeFileSafe(path.join(outHookDir, `use${pascalName}Api.js`), apiHookContent);

const filterFields = (meta?.filters || [])
  .map((field) => {
    if (field.type === "select") {
      const isStatic = field.options?.source === "static";
      if (isStatic) {
        const options = field.options.data.map((opt) => `<option value="${opt}">${opt}</option>`).join("");
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            ${options}
          </select>
        </label>`;
      } else {
        return `
        <label>${field.label}
          <select name="${field.name}" onChange={onChange}>
            <option value="">전체</option>
            {/* TODO: API로 ${field.options.url}에서 옵션 가져오기 */}
          </select>
        </label>`;
      }
    } else {
      return `
      <label>${field.label}
        <input name="${field.name}" type="text" onChange={onChange} />
      </label>`;
    }
  })
  .join("\\n");

const filterComponent = `
export default function ${pascalName}FilterComponent({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}) {
  return (
    <div>
      ${filterFields}
    </div>
  );
}
`;

writeFileSafe(path.join(outCompDir, `${pascalName}FilterComponent.tsx`), filterComponent);

const { generateComponent } = require("../ai/agent");
if (meta?.aiPrompt) {
  await generateComponent(meta?.aiPrompt, pascalName);
}
