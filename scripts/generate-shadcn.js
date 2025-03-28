const fs = require('fs');
const path = require('path');

const renderForm = require('../templates/shadcn/Form.tpl.js');
const renderTable = require('../templates/shadcn/DataTable.tpl.js');
const renderFilter = require('../templates/shadcn/FilterBar.tpl.js');
const renderPreview = require('../templates/shadcn/PreviewPage.tpl.js');

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
const compDir = path.join('generated', 'components', pascalName);
const pageDir = path.join('generated', 'pages', meta.name);

fs.mkdirSync(compDir, { recursive: true });
fs.mkdirSync(pageDir, { recursive: true });

// Form 생성
const formCode = renderForm(meta, pascalName);
fs.writeFileSync(path.join(compDir, 'Form.tsx'), formCode, 'utf-8');
console.log(`✅ Form.tsx 생성 완료`);

// Table 생성
const tableCode = renderTable(meta, pascalName);
fs.writeFileSync(path.join(compDir, 'DataTable.tsx'), tableCode, 'utf-8');
console.log(`✅ DataTable.tsx 생성 완료`);

// Filter 생성
const filterCode = renderFilter(meta, pascalName);
fs.writeFileSync(path.join(compDir, 'FilterBar.tsx'), filterCode, 'utf-8');
console.log(`✅ FilterBar.tsx 생성 완료`);

// Preview 페이지 생성
const previewCode = renderPreview(meta, pascalName);
fs.writeFileSync(path.join(pageDir, 'preview.tsx'), previewCode, 'utf-8');
console.log(`✅ preview.tsx 생성 완료`);

console.log(`🎉 모든 shadcn 컴포넌트 및 미리보기 페이지가 생성되었습니다.`);