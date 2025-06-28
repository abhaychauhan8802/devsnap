import { useRef } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

import { Header, Sidebar } from "./components";

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

  return (
    <div className="h-screen w-screen overflow-hidden text-text-primary">
      <Header />
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <Sidebar />
        <main
          ref={scrollRef}
          className="h-full w-full overflow-x-hidden overflow-y-auto scrollbar"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
