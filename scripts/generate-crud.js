const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ 메타 파일 경로를 입력하세요. 예: node generate-crud.js meta/products.meta.json');
  process.exit(1);
}

const metaPath = path.resolve(args[0]);
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

const toPascalCase = (str) =>
  str.replace(/(^\w|_\w)/g, (match) => match.replace('_', '').toUpperCase());

const writeFileSafe = (filePath, content) => {
  if (fs.existsSync(filePath)) {
    console.log(`⚠️ 파일이 이미 존재합니다: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, content);
  console.log(`✅ 파일 생성됨: ${filePath}`);
};

const baseName = meta.name;
const pascalName = toPascalCase(baseName);
const outPageDir = path.join('generated', 'pages', baseName);
const outCompDir = path.join('generated', 'components', pascalName);
const outHookDir = path.join('generated', 'hooks');

fs.mkdirSync(outPageDir, { recursive: true });
fs.mkdirSync(outCompDir, { recursive: true });
fs.mkdirSync(outHookDir, { recursive: true });

const pageContent = `
import ${pascalName}FormComponent from '../../components/${pascalName}/${pascalName}FormComponent';
import ${pascalName}TableComponent from '../../components/${pascalName}/${pascalName}TableComponent';

export default function Page() {
  return (
    <div>
      <h1>${meta.title}</h1>
      <${pascalName}FormComponent />
      <${pascalName}TableComponent />
    </div>
  );
}
`;

writeFileSafe(path.join(outPageDir, 'page.tsx'), pageContent);

const formFields = meta.form.map((field) => {
  const type = field.type === 'textarea' ? 'textarea' : 'input';
  const inputType = field.type === 'number' ? 'number' : 'text';
  return type === 'textarea'
    ? `<label>${field.label}<textarea name="${field.name}" /></label>`
    : `<label>${field.label}<input name="${field.name}" type="${inputType}" /></label>`;
}).join('\n  ');

const formComponent = `
export default function ${pascalName}FormComponent() {
  return (
    <form>
      ${formFields}
    </form>
  );
}
`;

writeFileSafe(path.join(outCompDir, `${pascalName}FormComponent.tsx`), formComponent);

const tableHeaders = meta.columns.map(col => `<th>${col.label}</th>`).join('');
const tableCells = meta.columns.map(col => `<td>{item.${col.name}}</td>`).join('');

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