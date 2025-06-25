import { Loader2Icon } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";

import { useUserStore } from "../useUserStore";

const EditProfile = () => {
  const { authUser } = useAuthStore();
  const { editUserProfile, isUpdatingProfile } = useUserStore();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name,
    bio: authUser?.bio,
  });

  const imageFileRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file)); // Local preview
  };

  const handleSubmit = async () => {
    await editUserProfile(formData, selectedFile);
    if (!isUpdatingProfile) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="mt-3">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex justify-center">
              <UserAvatar
                profilePicture={previewURL || authUser?.profilePicture}
                avatarStyle="size-28"
                onClick={() => imageFileRef.current.click()}
              />
              <Input
                type="file"
                accept="image/*"
                ref={imageFileRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-3">
              <Label>Bio</Label>
              <Input
                type="text"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </div>

            <Button onClick={handleSubmit} disabled={isUpdatingProfile}>
              {isUpdatingProfile ? (
                <span className="flex gap-3 items-center">
                  <Loader2Icon className="animate-spin" /> Please wait
                </span>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditProfile;
