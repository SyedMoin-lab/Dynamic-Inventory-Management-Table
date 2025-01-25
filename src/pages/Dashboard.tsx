import { InventoryTable } from "@/components/inventory/InventoryTable";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container py-8 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground mt-2">Manage your stock levels and items efficiently</p>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <InventoryTable />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;