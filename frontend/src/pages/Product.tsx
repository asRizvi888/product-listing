import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/api/product";
import router from "@/components/hoc/router";
import { Product as ProductType } from "@/components/ProductModal";
import { useToast } from "@/components/ui/use-toast";
import ProductTable from "@/components/views/ProductTable";
import { useEffect, useState } from "react";

const Product = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchProduts = async () => {
    setLoading(true);
    const response = await getProducts();
    setData(response.data);
    setLoading(false);
  };

  const handleAdd = async (data: ProductType) => {
    try {
      const { message } = await addProduct(data);
      await fetchProduts();

      toast({
        description: message,
        className: "bg-green-500",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  const handleUpdate = async (data: ProductType) => {
    try {
      const { message } = await updateProduct(data);
      await fetchProduts();

      toast({
        description: message,
        className: "bg-green-500",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  const handleDelete = async (product_id: string) => {
    try {
      const { message } = await deleteProduct(product_id);
      await fetchProduts();

      toast({
        description: message,
        className: "bg-green-500",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchProduts();
  }, []);

  return (
    <ProductTable
      data={data}
      loading={loading}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default router(Product);
