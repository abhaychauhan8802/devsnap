import { ListOrdered } from "lucide-react";
import { List } from "lucide-react";
import { Code } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

import Headings from "./Headings";

const StructureButtons = ({ editor }) => {
  return (
    <div className="flex gap-2 border-r pr-2">
      <Headings editor={editor} />
      <Toggle
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        aria-label="Toggle Ordered List"
      >
        <ListOrdered />
      </Toggle>

      <Toggle
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => {
          editor.chain().focus().toggleBulletList().run();
        }}
        aria-label="Toggle Bullet List"
      >
        <List />
      </Toggle>

      <Toggle
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => {
          editor.chain().focus().toggleCodeBlock().run();
        }}
        aria-label="Toggle Code Block"
      >
        <Code />
      </Toggle>
    </div>
  );
};

export default StructureButtons;
