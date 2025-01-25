import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { 
  MoonIcon, 
  SunIcon 
       } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
       } from "@/components/ui/sheet";
import { NavigationMenu } from "./NavigationMenu";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <NavigationMenu className="flex flex-col items-start gap-4" />
            </SheetContent>
          </Sheet>
          <span className="text-xl font-bold">Inventory System</span>
        </div>

        <div className="hidden md:block">
          <NavigationMenu />
        </div>

        <Button variant="default" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};