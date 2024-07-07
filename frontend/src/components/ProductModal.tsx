import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface ProductModalProps {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  data: Product;
  setData: Dispatch<SetStateAction<Product>>;
}

export type Product = {
  name: string;
  image_url: string;
  quantity: number;
  available: boolean;
  price: number;
  vendor: string;
  _id?: string;
};

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  data,
  setData,
  onSubmit,
}) => {
  const fieldOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage Product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Type product name"
              value={data.name}
              onChange={fieldOnChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image_url">Image</Label>
            <Input
              id="image_url"
              name="image_url"
              type="text"
              placeholder="Paste image URL"
              value={data.image_url}
              onChange={fieldOnChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              value={data.quantity}
              onChange={fieldOnChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="text"
              value={data.price}
              onChange={fieldOnChange}
              className="col-span-3"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="price">Available</Label>
            <Switch
              id="available"
              checked={data.available}
              onCheckedChange={(checked) =>
                setData({ ...data, available: checked })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price">Vendor</Label>
            <Input
              id="vendor"
              name="vendor"
              type="vendor"
              placeholder="Type vendor name"
              value={data.vendor}
              onChange={fieldOnChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
