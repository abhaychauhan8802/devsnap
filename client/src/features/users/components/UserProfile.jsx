import { useEffect } from "react";
import { useParams } from "react-router";

import { useUserStore } from "../useUserStore";
import Profile from "./Profile";

const UserProfile = () => {
  const { user, getUser } = useUserStore();

  const params = useParams();

  useEffect(() => {
    getUser(params.username);
  }, [params.username]);

  return <Profile user={user} />;
};

export default UserProfile;
