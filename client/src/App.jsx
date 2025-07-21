import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Navigate } from "react-router";

import { Toaster } from "@/components/ui/sonner";

import SplashScreen from "./components/SplashScreen";
import useBreakPoints from "./hooks/useBreakPoints";
import MainLayout from "./layouts/MainLayout";
import {
  AddPostPage,
  ExplorePage,
  FeedPage,
  Login,
  MessagePage,
  PostPage,
  ProfilePage,
  Register,
  SearchPage,
} from "./pages";
import PageNotFound from "./pages/PageNotFound";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, checkAuthLoading } = useAuthStore();

  const { isMobile } = useBreakPoints();

  useEffect(() => {
    const splash = document.getElementById("splash");
    if (splash) splash.remove();

    const theme = localStorage.getItem("vite-ui-theme");

    if (!theme) localStorage.setItem("vite-ui-theme", "system");
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkAuthLoading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route
          element={
            authUser ? <MainLayout /> : <Navigate to="/auth/login" replace />
          }
        >
          <Route path="/" element={<FeedPage />} />
          <Route path="/create" element={<AddPostPage />} />
          <Route path="/explore/search" element={<SearchPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/messages" element={<MessagePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/user/:username" element={<ProfilePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
