import { useRef } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

import useBreakPoints from "@/hooks/useBreakPoints";

import { Header, Sidebar } from "./components";
import Tabs from "./components/Tabs";

const MainLayout = () => {
  const scrollRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    const isFeedPage = location.pathname === "/";
    const container = scrollRef.current;

    if (!isFeedPage) {
      container.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const { isMobile } = useBreakPoints();

  return (
    <div className="h-screen w-screen overflow-hidden text-text-primary">
      {isMobile ? (
        <div className="flex flex-col h-full w-full">
          <main
            ref={scrollRef}
            className="h-full w-full overflow-x-hidden overflow-y-auto scrollbar"
          >
            <Outlet />
          </main>
          <Tabs />
        </div>
      ) : (
        <div className="flex h-full w-full">
          <Sidebar />
          <main
            ref={scrollRef}
            className="h-full w-full overflow-x-hidden overflow-y-auto scrollbar"
          >
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
