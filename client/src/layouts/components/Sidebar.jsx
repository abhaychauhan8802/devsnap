import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/useAuthStore";
import { getInitials } from "@/utils/getInitials";
import { Plus } from "lucide-react";
import { Compass, House, LogOut, MessageCircleMore, Users } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router";
import { useLocation } from "react-router";

const Sidebar = () => {
  const { authUser, logout } = useAuthStore();

  const iconSize = 20;

  const navLinks = [
    {
      name: "Feed",
      path: "/",
      icon: <House size={iconSize} />,
    },
    {
      name: "Following",
      path: "/following",
      icon: <Users size={iconSize} />,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <Compass size={iconSize} />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <MessageCircleMore size={iconSize} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: (
        <Avatar className="size-6">
          <AvatarImage src={authUser.profilePicture} alt="pfp" />
          <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-xs font-semibold">
            {getInitials(authUser.username)}
          </AvatarFallback>
        </Avatar>
      ),
    },
  ];

  const location = useLocation();

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  return (
    <div className="w-[60px] lg:w-[300px] px-2 lg:px-3 border-r h-full py-3">
      {/* main content */}
      <div
        className={`flex flex-col justify-between ${!isDesktop && "items-center"} h-full`}
      >
        <div>
          <span className="hidden lg:inline-block font-bold text-text-secondary text-md pb-2">
            Menu
          </span>

          {/* Add new post button */}
          <Button size={isDesktop ? "lg" : "icon"} className="lg:w-full">
            <Plus /> <span className="hidden lg:inline-block">New Post</span>
          </Button>

          {/* Links */}
          <div className="flex flex-col mt-5 gap-2">
            {navLinks.map((link, idx) => (
              <Link
                to={link.path}
                key={idx}
                className={`hover:bg-secondary p-2 lg:px-4 lg:py-2 rounded-md flex items-center justify-center lg:justify-start gap-2 text-text-secondary ${location.pathname === link.path && "bg-secondary"}`}
              >
                {link.icon}
                <span className="hidden lg:inline-block">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/*  */}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full justify-center lg:justify-start lg:has-[>svg]:px-5"
              variant="ghost"
              size={isDesktop ? "lg" : "icon"}
            >
              <LogOut />
              <span className="hidden lg:inline-block">Logout</span>
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
      </div>
    </div>
  );
};

export default Sidebar;
