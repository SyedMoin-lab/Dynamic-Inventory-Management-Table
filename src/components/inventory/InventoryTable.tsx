import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
}

export const InventoryTable = () => {
  const [items, setItems] = useState<InventoryItem[]>([
    { id: "1", name: "Laptop", category: "Electronics", quantity: 5, price: 999.99 },
    { id: "2", name: "Desk Chair", category: "Furniture", quantity: 12, price: 199.99 },
    { id: "3", name: "Mouse", category: "Electronics", quantity: 8, price: 29.99 },
    { id: "4", name: "Keyboard", category: "Electronics", quantity: 15, price: 49.99 },
    { id: "5", name: "Monitor", category: "Electronics", quantity: 7, price: 299.99 },
    { id: "6", name: "Coffee Table", category: "Furniture", quantity: 10, price: 150.00 },
    { id: "7", name: "Sofa", category: "Furniture", quantity: 3, price: 799.99 },
    { id: "8", name: "Bookshelf", category: "Furniture", quantity: 5, price: 120.00 },
    { id: "9", name: "Blender", category: "Appliances", quantity: 20, price: 89.99 },
    { id: "10", name: "Toaster", category: "Appliances", quantity: 25, price: 29.99 },
    { id: "11", name: "Air Fryer", category: "Appliances", quantity: 8, price: 199.99 },
    { id: "12", name: "Tennis Racket", category: "Sports", quantity: 6, price: 89.99 },
    { id: "13", name: "Soccer Ball", category: "Sports", quantity: 15, price: 24.99 },
    { id: "14", name: "Yoga Mat", category: "Sports", quantity: 10, price: 39.99 },
    { id: "15", name: "Novel", category: "Books", quantity: 30, price: 14.99 },
    { id: "16", name: "Textbook", category: "Books", quantity: 12, price: 59.99 },
    { id: "17", name: "Magazine", category: "Books", quantity: 25, price: 5.99 },
    { id: "18", name: "Action Figure", category: "Toys", quantity: 18, price: 19.99 },
    { id: "19", name: "Puzzle", category: "Toys", quantity: 22, price: 15.99 },
    { id: "20", name: "Board Game", category: "Toys", quantity: 10, price: 29.99 },
  ]);
  const [filter, setFilter] = useState("");
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredItems = items
    .filter((item) =>
      item.category.toLowerCase().includes(filter.toLowerCase()) || 
      item.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.quantity - a.quantity);

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast({
      title: "Item deleted",
      description: "The item has been removed from inventory.",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem = {
      id: editingItem?.id || Math.random().toString(36).substr(2, 9),
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      quantity: Number(formData.get("quantity")),
      price: Number(formData.get("price")),
    };

    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? newItem : item)));
      toast({
        title: "Item updated",
        description: "The item has been successfully updated.",
      });
    } else {
      setItems([...items, newItem]);
      toast({
        title: "Item added",
        description: "New item has been added to inventory.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Filter by category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.category}</Badge>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${
                    item.quantity < 10 ? "text-red-500" : ""
                  }`}>
                    {item.quantity}
                  </span>
                </TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingItem?.name}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={editingItem?.category}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                defaultValue={editingItem?.quantity}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                defaultValue={editingItem?.price}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingItem ? 'Save Changes' : 'Add Item'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};