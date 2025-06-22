import { Bell } from "lucide-react";

import { Logo, ThemeToggle } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <div className="border-b px-3 flex justify-between items-center h-16">
      <div className="scale-60 origin-left">
        <Logo />
      </div>

      <div>
        <Input
          type="text"
          placeholder="Search..."
          className="pr-12 h-10 min-w-md"
        />
      </div>

      <div className="flex gap-1 items-center">
        <Button variant="ghost" className="rounded-full" size="icon">
          <Bell />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
