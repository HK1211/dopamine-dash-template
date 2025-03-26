
import axios from 'axios';

export const useProductsApi = () => {
  const baseUrl = '/api/products';

  const getList = () => axios.get(baseUrl);
  const create = (data) => axios.post(baseUrl, data);
  const update = (id, data) => axios.put(`${baseUrl}/${id}`, data);
  const remove = (id) => axios.delete(`${baseUrl}/${id}`);

  return { getList, create, update, remove };
};
