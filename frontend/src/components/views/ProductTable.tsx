import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Edit, Plus, Trash } from "lucide-react";
import React from "react";
import ProductModal, { Product } from "../ProductModal";
import { useNavigate } from "react-router-dom";

interface ProductTableProps {
  data: Product[];
  loading: boolean;
  onAdd: (product: Product) => void;
  onUpdate: (product: Product) => void;
  onDelete: (product_id: string) => void;
}

const initialProduct: Product = {
  name: "",
  available: false,
  price: 0,
  quantity: 0,
  vendor: "",
  image_url: "",
};

const ProductTable: React.FC<ProductTableProps> = ({
  data,
  loading,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<Product>(initialProduct);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/");
  };

  const handleSubmit = () => {
    formData._id ? onUpdate(formData) : onAdd(formData);
    setShowModal(false);
    setFormData(initialProduct);
  };

  const onEdit = (data: Product) => {
    setFormData(data);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Product Table</h1>
        <div className="flex">
          <Button className="mx-5" onClick={() => setShowModal(true)}>
            <Plus />
            <span>Add Product</span>
          </Button>
          <Button variant="destructive" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
      <div className="border shadow-sm rounded-lg mt-4">
        {!data.length ? (
          <h1 className="m-10 text-center">
            {loading ? "Loading..." : "No product found"}
          </h1>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow>
                  <TableCell>
                    <img
                      src={item.image_url}
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        item.available
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {item.available ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>{`$${item.price}`}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.vendor}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => onEdit(item)}>
                      <Edit />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => onDelete(item._id as string)}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <ProductModal
        open={showModal}
        onClose={() => setShowModal(false)}
        data={formData}
        setData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProductTable;
