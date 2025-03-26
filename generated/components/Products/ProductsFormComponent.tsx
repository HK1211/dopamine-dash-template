
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).matches(/^[가-힣a-zA-Z0-9\s]+$/, '상품명은 2~50자, 한글/영문/숫자만 입력하세요.'),
  price: yup.number().max(10000000),
  category: yup.string(),
  description: yup.string()
});

export default function ProductsFormComponent() {
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
      
      <label>상품명
        <input type="text" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </label>

      <label>가격
        <input type="number" {...register("price")} />
        {errors.price && <span>{errors.price.message}</span>}
      </label>

      <label>카테고리
        <input type="text" {...register("category")} />
        {errors.category && <span>{errors.category.message}</span>}
      </label>

      <label>설명
        <textarea {...register("description")}></textarea>
        {errors.description && <span>{errors.description.message}</span>}
      </label>
      <button type="submit">저장</button>
    </form>
  );
}
