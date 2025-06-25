import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import { Link } from "lucide-react";
import { useCallback } from "react";

import { Toggle } from "@/components/ui/toggle";

const TextStyleButtons = ({ editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex gap-2 border-r pr-2">
      <Toggle
        pressed={editor.isActive("bold")}
        onPressedChange={() => {
          editor.chain().focus().toggleBold().run();
        }}
        aria-label="Toggle Bold"
      >
        <Bold />
      </Toggle>

      <Toggle
        pressed={editor.isActive("italic")}
        onPressedChange={() => {
          editor.chain().focus().toggleItalic().run();
        }}
        aria-label="Toggle Italic"
      >
        <Italic />
      </Toggle>

      <Toggle
        pressed={editor.isActive("underline")}
        onPressedChange={() => {
          editor.chain().focus().toggleUnderline().run();
        }}
        aria-label="Toggle Underline"
      >
        <Underline />
      </Toggle>
      <Toggle
        pressed={editor.isActive("strike")}
        onPressedChange={() => {
          editor.chain().focus().toggleStrike().run();
        }}
        aria-label="Toggle Strike"
      >
        <Strikethrough />
      </Toggle>

      <Toggle
        pressed={editor.isActive("link")}
        onPressedChange={setLink}
        aria-label="Link"
      >
        <Link />
      </Toggle>
    </div>
  );
};

export default TextStyleButtons;
