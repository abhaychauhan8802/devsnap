import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import { Navigate } from "react-router";

import MainLayout from "./layouts/MainLayout";
import { Home, Login, PostPage, Register } from "./pages";
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

        <Route
          element={
            authUser ? <MainLayout /> : <Navigate to="/auth/login" replace />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/following" element={<h1>following</h1>} />
          <Route path="/explore" element={<h1>explore</h1>} />
          <Route path="/messages" element={<h1>messages</h1>} />
          <Route path="/notifications" element={<h1>notifications</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/post/:postId" element={<PostPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
