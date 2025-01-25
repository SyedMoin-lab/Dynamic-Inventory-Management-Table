import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface NavigationMenuProps {
  className?: string;
}

export const NavigationMenu = ({ className }: NavigationMenuProps) => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/inventory", label: "Inventory" },
    { href: "/reports", label: "Reports" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};