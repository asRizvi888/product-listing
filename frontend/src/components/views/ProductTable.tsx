import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { SVGProps, useState } from "react";
import { JSX } from "react/jsx-runtime";
import { Badge } from "../ui/badge";
import { Edit, Plus, Trash } from "lucide-react";
import React from "react";

type DataItem = {
  name: string;
  available: boolean;
  price: number;
  quantity: number;
  vendor: string;
};

type SortConfig = {
  key: keyof DataItem;
  direction: "ascending" | "descending";
};

const data: DataItem[] = [
  {
    name: "product1",
    available: true,
    price: 500,
    quantity: 100,
    vendor: "vendor 1",
  },
  {
    name: "product 2",
    available: false,
    price: 200,
    quantity: 500,
    vendor: "vendor 2",
  },
];

const ProductTable = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "price",
    direction: "ascending",
  });

  const sortedData = React.useMemo(() => {
    if (sortConfig.key !== null) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl">Product Table</h1>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="shrink-0">
                <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align="end">
              <DropdownMenuRadioGroup value="featured">
                <DropdownMenuRadioItem value="Newest">
                  Newest
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="low"
                  onClick={() => requestSort("price")}
                >
                  Price
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="high"
                  onClick={() => requestSort("quantity")}
                >
                  Quantity
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="ml-6">
            <Plus />
            <span>Add Product</span>
          </Button>
        </div>
      </div>
      <div className="border shadow-sm rounded-lg mt-4">
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
            {sortedData.map((item) => (
              <TableRow>
                <TableCell>
                  <img
                    src="/placeholder.svg"
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-red-100 text-red-500">
                    Out of Stock
                  </Badge>
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.vendor}
                </TableCell>
                <TableCell>
                  <Button variant="ghost">
                    <Edit />
                  </Button>
                  <Button variant="ghost">
                    <Trash color="#ff0000" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

function ArrowUpDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}

export default ProductTable;
