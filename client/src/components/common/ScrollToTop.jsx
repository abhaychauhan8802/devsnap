import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const isFeedPage = location.pathname === "/";
    if (!isFeedPage) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};
