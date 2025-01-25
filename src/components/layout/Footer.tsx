import { GithubIcon, Globe, Linkedin, LinkedinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">Inventory System</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mx-auto">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/SyedMoin-lab/Dynamic-Inventory-Management-Table" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/syed-moinuddin106/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://syed-moin-v7.vercel.app/" target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5" />
              </a>
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {currentYear} Inventory System. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};