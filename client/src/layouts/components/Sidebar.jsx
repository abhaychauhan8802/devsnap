import { Plus } from "lucide-react";
import { Compass, House, LogOut, MessageCircleMore } from "lucide-react";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoCompassOutline,
  IoCompassSharp,
} from "react-icons/io5";
import { Link } from "react-router";
import { useLocation } from "react-router";

import AvatarImg from "@/assets/images/avatar.png";
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
import useBreakPoints from "@/hooks/useBreakPoints";
import { useAuthStore } from "@/store/useAuthStore";

const iconSize = 20;

const Sidebar = () => {
  const { authUser, logout } = useAuthStore();

  const location = useLocation();

  const { isDesktop } = useBreakPoints();

  const navLinks = [
    {
      name: "Feed",
      path: "/",
      icon: <GoHome size={iconSize} />,
      iconFill: <GoHomeFill size={iconSize} />,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: <IoCompassOutline size={iconSize} />,
      iconFill: <IoCompassSharp size={iconSize} />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <IoChatbubbleEllipsesOutline size={iconSize} />,
      iconFill: <IoChatbubbleEllipsesSharp size={iconSize} />,
    },
    {
      name: "Profile",
      path: `/user/${authUser?.username}`,
    },
  ];

  return (
    <div className="w-[60px] lg:w-[300px] px-2 lg:px-3 border-r h-full py-3 shadow-sm">
      {/* main content */}
      <div
        className={`flex flex-col justify-between ${!isDesktop && "items-center"} h-full`}
      >
        <div>
          <span className="hidden lg:inline-block font-bold text-text-secondary text-md pb-2">
            Menu
          </span>

          {/* Add new post button */}
          <Link to="/add-post">
            <Button
              size={isDesktop ? "lg" : "icon"}
              className="lg:w-full ml-[2px] lg:ml-0"
            >
              <Plus /> <span className="hidden lg:inline-block">New Post</span>
            </Button>
          </Link>

          {/* Links */}
          <div className="flex flex-col mt-5 gap-2">
            {navLinks.map((link, idx) => (
              <Link
                to={link.path}
                key={idx}
                className={`hover:bg-accent p-2 lg:px-4 lg:py-2 rounded-md flex items-center justify-center lg:justify-start gap-2 text-text-secondary ${location.pathname === link.path && "bg-accent"}`}
              >
                {link.name === "Profile" ? (
                  <>
                    <Avatar className="size-5">
                      <AvatarImage src={authUser?.profilePicture} alt="pfp" />
                      <AvatarFallback className="bg-gray-800 dark:bg-gray-600 text-white text-xs font-semibold">
                        <img src={AvatarImg} alt="profilePicture" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline-block">{link.name}</span>
                  </>
                ) : (
                  <>
                    {location.pathname === link.path
                      ? link.iconFill
                      : link.icon}
                    <span className="hidden lg:inline-block">{link.name}</span>
                  </>
                )}
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
