import { Outlet } from "react-router";

import { Header, Sidebar } from "./components";

const MainLayout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden text-text-primary">
      <Header />
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <Sidebar />
        <main className="h-full w-full overflow-x-hidden overflow-y-scroll scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
