import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import StructureButtons from "./components/StructureButtons";
import TextAlignButtons from "./components/TextAlignButtons";
import TextStyleButtons from "./components/TextStyleButtons";
import "./tiptap.css";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-card border-b">
      <StructureButtons editor={editor} />
      <TextStyleButtons editor={editor} />
      <TextAlignButtons editor={editor} />
    </div>
  );
};

const extensions = [
  StarterKit,
  Underline,
  Typography,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "Write your post here...",
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme,
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
];

const Tiptap = ({ onChange }) => {
  const editor = useEditor({
    extensions,
    content: "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  return (
    <div className="h-[80vh] md:h-[60vh] border rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="sticky top-0 z-10">
        <MenuBar editor={editor} />
      </div>
      <div className="flex-1 overflow-auto scrollbar [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full">
        <EditorContent
          editor={editor}
          className="text-text-primary max-w-full leading-5 py-2 px-3"
        />
      </div>
    </div>
  );
};

export default Tiptap;
