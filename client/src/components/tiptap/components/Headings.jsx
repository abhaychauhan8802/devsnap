import { useState } from "react";
import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Headings = ({ editor }) => {
  const [current, setCurrent] = useState("H");

  const setBlock = (type, options = {}) => {
    editor.chain().focus()[type](options).run();
  };

  useEffect(() => {
    if (!editor) return null;

    const updateHeading = () => {
      if (editor.isActive("heading", { level: 1 })) setCurrent("H1");
      else if (editor.isActive("heading", { level: 2 })) setCurrent("H2");
      else if (editor.isActive("heading", { level: 3 })) setCurrent("H3");
      else if (editor.isActive("heading", { level: 4 })) setCurrent("H4");
      else setCurrent("H");
    };

    // Update on selection or content change
    editor.on("selectionUpdate", updateHeading);
    editor.on("transaction", updateHeading);

    // Initial check
    updateHeading();

    return () => {
      editor.off("selectionUpdate", updateHeading);
      editor.off("transaction", updateHeading);
    };
  }, [editor]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-1" variant="ghost">
          {current} <IoIosArrowDown className="mt-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36" align="start">
        <DropdownMenuGroup>
          {[1, 2, 3, 4].map((level) => (
            <DropdownMenuItem
              key={level}
              onClick={() => {
                setBlock("toggleHeading", { level });
              }}
              className={
                editor.isActive("heading", { level })
                  ? "bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white"
                  : ""
              }
              aria-label={`h${level}`}
            >
              H{level} Heading {level}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Headings;
