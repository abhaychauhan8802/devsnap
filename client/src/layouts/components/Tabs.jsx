import { MessageCircleMore } from "lucide-react";
import { Compass } from "lucide-react";
import { House } from "lucide-react";
import { Plus } from "lucide-react";
import { AiFillPlusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipsesSharp,
  IoCompassOutline,
  IoCompassSharp,
} from "react-icons/io5";
import { useLocation } from "react-router";
import { Link } from "react-router";

import AvatarImg from "@/assets/images/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const iconSize = 23;

const Tabs = () => {
  const { authUser } = useAuthStore();

  const location = useLocation();

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
      name: "Create",
      path: "/create",
      icon: <AiOutlinePlusSquare size={iconSize} />,
      iconFill: <AiFillPlusSquare size={iconSize} />,
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
    <div className="border-t shadow-sm fixed bottom-0 bg-background z-20 w-full">
      <div className="flex h-16 items-center justify-between max-w-md px-6 mx-auto">
        {navLinks.map((link, idx) => {
          return (
            <Link
              to={link.path}
              key={idx}
              className={`hover:bg-accent rounded-full flex items-center justify-center gap-2 text-text-secondary ${location.pathname === link.path && link.name === "Profile" && "border-2 border-text-primary"}`}
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
                  {location.pathname === link.path ? link.iconFill : link.icon}
                  <span className="hidden lg:inline-block">{link.name}</span>
                </>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
