module.exports = function renderPreviewRoute(meta) {
  const pageName = meta.name;
  const pascalName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return `
import Preview from "@/generated/pages/${pageName}/preview"

export default function Page() {
  return <Preview />
}
`;
};