import { AlignJustify } from "lucide-react";
import { AlignRight } from "lucide-react";
import { AlignCenter } from "lucide-react";
import { AlignLeft } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

const TextAlignButtons = ({ editor }) => {
  return (
    <div className="flex gap-2 border-r-none pr-2">
      <Toggle
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() => {
          editor.chain().focus().setTextAlign("left").run();
        }}
        aria-label="Toggle Left"
      >
        <AlignLeft />
      </Toggle>

      <Toggle
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() => {
          editor.chain().focus().setTextAlign("center").run();
        }}
        aria-label="Toggle Center"
      >
        <AlignCenter />
      </Toggle>

      <Toggle
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() => {
          editor.chain().focus().setTextAlign("right").run();
        }}
        aria-label="Toggle Right"
      >
        <AlignRight />
      </Toggle>

      <Toggle
        pressed={editor.isActive({ textAlign: "justify" })}
        onPressedChange={() => {
          editor.chain().focus().setTextAlign("justify").run();
        }}
        aria-label="Toggle Justify"
      >
        <AlignJustify />
      </Toggle>
    </div>
  );
};

export default TextAlignButtons;
