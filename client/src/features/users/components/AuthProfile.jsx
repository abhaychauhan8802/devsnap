import { useAuthStore } from "@/store/useAuthStore";

import Profile from "./Profile";

const AuthUser = () => {
  const { authUser } = useAuthStore();

  return <Profile user={authUser} />;
};

export default AuthUser;
