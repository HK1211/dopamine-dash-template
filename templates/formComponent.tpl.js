module.exports = function renderFormComponent(meta, pascalName) {
  const fields = meta.form || [];

  const yupFields = fields
    .map((field) => {
      const rules = [];
      const v = field.validation || {};
      if (v.minLength) rules.push(`.min(${v.minLength})`);
      if (v.maxLength) rules.push(`.max(${v.maxLength})`);
      if (v.min) rules.push(`.min(${v.min})`);
      if (v.max) rules.push(`.max(${v.max})`);
      if (v.pattern) rules.push(`.matches(/${v.pattern}/, '${v.message || ""}')`);

      const baseType = field.type === "number" ? "yup.number()" : "yup.string()";
      return `  ${field.name}: ${baseType}${rules.join("")}`;
    })
    .join(",\n");

  const inputs = fields
    .map((field) => {
      const inputType = field.type === "number" ? "number" : "text";
      const tag =
        field.type === "textarea"
          ? `<textarea {...register("${field.name}")}></textarea>`
          : `<input type="${inputType}" {...register("${field.name}")} />`;
      return `
      <label>${field.label}
        ${tag}
        {errors.${field.name} && <span>{errors.${field.name}.message}</span>}
      </label>`;
    })
    .join("\n");

  return `
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
${yupFields}
});

export default function ${pascalName}FormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      ${inputs}
      <button type="submit">저장</button>
    </form>
  );
}
`;
};
