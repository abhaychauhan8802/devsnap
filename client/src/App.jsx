import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Navigate } from "react-router";

import { Toaster } from "@/components/ui/sonner";

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
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, checkAuthLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkAuthLoading) {
    return "";
  }

  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        <Route path="*" element={<h1>Page not found</h1>} />
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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
