import { MessageCircleMore } from "lucide-react";
import { Compass } from "lucide-react";
import { House } from "lucide-react";
import { Plus } from "lucide-react";
import { useLocation } from "react-router";
import { Link } from "react-router";

import AvatarImg from "@/assets/images/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const Tabs = () => {
  const { authUser, logout } = useAuthStore();

  const iconSize = 23;

  const navLinks = [
    {
      name: "Feed",
      path: "/",
      icon: <House size={iconSize} />,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <Compass size={iconSize} />,
    },
    {
      name: "Add Post",
      path: "/add-post",
      icon: <Plus size={iconSize} />,
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
          <AvatarImage src={authUser?.profilePicture} alt="pfp" />
          <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-xs font-semibold">
            <img src={AvatarImg} alt="profilePicture" />
          </AvatarFallback>
        </Avatar>
      ),
    },
  ];

  const location = useLocation();

  return (
    <div className="h-16 w-full border-t shadow-sm">
      <div className="flex h-full items-center justify-between max-w-md px-4 mx-auto">
        {navLinks.map((link, idx) => {
          if (link.path === "/add-post") {
            return (
              <Link to={link.path}>
                <Button size="icon" className="lg:w-full ml-1 lg:ml-0">
                  <Plus />
                </Button>
              </Link>
            );
          }
          return (
            <Link
              to={link.path}
              key={idx}
              className={`hover:bg-accent p-2 lg:px-4 lg:py-2 rounded-md flex items-center justify-center lg:justify-start gap-2 text-text-secondary ${location.pathname === link.path && "bg-accent"}`}
            >
              {link.icon}
              <span className="hidden lg:inline-block">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
