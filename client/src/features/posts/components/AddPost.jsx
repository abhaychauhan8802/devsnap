import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useRef } from "react";
import { FaImage } from "react-icons/fa6";
import { useNavigate } from "react-router";

import Tiptap from "@/components/tiptap/Tiptap";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { usePostStore } from "../usePostStore";

const AddPost = () => {
  const { isAddingPost, addPost } = usePostStore();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const imageRef = useRef(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleUpdateContent = (html) => {
    setContent(html);
  };

  const handleSubmit = async () => {
    try {
      await addPost({ title, imageFile: selectedFile, text: content });
      navigate("/");
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <div className="w-full flex justify-center py-10">
      <Card className="max-w-4xl w-full bg-background shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Add new post</CardTitle>
          <CardDescription>
            Add title and post contents. Click Add when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full min-h-100vh">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Thumbnail</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={imageRef}
              />

              <div className="relative w-fit">
                <div
                  className="w-44 h-28 rounded-2xl overflow-hidden border border-input cursor-pointer"
                  onClick={() => imageRef.current.click()}
                >
                  {previewURL ? (
                    <>
                      <img
                        src={previewURL}
                        alt="image"
                        className="object-cover w-full h-full"
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -top-3 -right-3 dark:bg-input dark:hover:bg-input/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewURL(null);
                        }}
                      >
                        X
                      </Button>
                    </>
                  ) : (
                    <div className="w-full h-full bg-input/30 flex items-center justify-center hover:bg-input/50">
                      <FaImage size={28} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Post</Label>
              <Tiptap onChange={handleUpdateContent} />
            </div>

            <Button onClick={handleSubmit} disabled={!title || !content}>
              {isAddingPost ? (
                <span className="flex gap-3 items-center">
                  <Loader2Icon className="animate-spin" /> Please wait
                </span>
              ) : (
                <span>Add Post</span>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPost;
