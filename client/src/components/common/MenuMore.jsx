import { FaRegMoon } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";

import { useTheme } from "@/context/theme-provider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Logout from "./Logout";

const MenuMore = ({ children, align = "start" }) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-[250px]" align={align}>
        <DropdownMenuGroup>
          {/* <DropdownMenuItem className="py-2 px-3 cursor-pointer">
            <MdOutlineSettings className="text-secondary-foreground" />
            <span className="font-medium">Settings</span>
          </DropdownMenuItem> */}

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex gap-3 py-2 px-3 cursor-pointer">
              <FaRegMoon className="text-secondary-foreground" />
              <span className="font-medium">Theme</span>
            </DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuMore;
