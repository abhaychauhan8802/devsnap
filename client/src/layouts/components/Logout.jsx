import { FiLogOut } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useBreakPoints from "@/hooks/useBreakPoints";
import { useAuthStore } from "@/store/useAuthStore";

const Logout = () => {
  const { logout } = useAuthStore();

  return (
    <Dialog>
      <DialogTrigger asChild className="flex justify-start">
        <Button variant="ghost" className="w-full">
          <FiLogOut />
          <span>Logout</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-[300px] overflow-hidden"
        showCloseButton={false}
      >
        <DialogHeader className="mb-12">
          <DialogTitle className="text-center text-xl font-bold">
            Logout
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <button
          className="border-t h-10 absolute bottom-0 inset-x-0 hover:bg-secondary cursor-pointer text-md"
          onClick={() => logout()}
        >
          Logout
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default Logout;
