import { useRef } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

import useBreakPoints from "@/hooks/useBreakPoints";
import { useScrollStore } from "@/store/useScrollStore";

import { Sidebar } from "./components";
import Tabs from "./components/Tabs";

const MainLayout = () => {
  const scrollRef = useRef(null);

  const location = useLocation();

  const pathname = location.pathname;

  const saveScroll = useScrollStore((s) => s.saveScroll);
  const getScroll = useScrollStore((s) => s.getScroll);

  // 🧠 Save scroll only if it's the feed page ("/")
  useEffect(() => {
    const container = scrollRef.current;

    return () => {
      if (pathname === "/" && container) {
        saveScroll(pathname, container.scrollTop);
      }
    };
  }, [pathname, saveScroll]);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    if (pathname === "/") {
      const saved = getScroll(pathname);

      container.scrollTo({ top: saved, behavior: "auto" });
    } else {
      container.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, getScroll]);

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
