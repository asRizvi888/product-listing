import api from ".";

export const getProducts = async () => {
  try {
    const { data } = await api.get("/api/products");
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addProduct = async (payload: {}) => {
  try {
    const { data } = await api.post(`/api/product`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateProduct = async (payload: {}) => {
  try {
    const { data } = await api.put(`/api/product`, payload);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { data } = await api.delete(`/api/product/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
