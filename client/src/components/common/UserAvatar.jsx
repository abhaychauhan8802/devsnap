import AvatarImg from "@/assets/images/avatar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ avatarStyle = "", profilePicture, ...props }) => {
  return (
    <Avatar className={`cursor-pointer ${avatarStyle}`} {...props}>
      <AvatarImage
        src={profilePicture ? profilePicture : null}
        alt="profilePicture"
      />
      <AvatarFallback className="bg-gray-800 dark:bg-card text-white text-sm font-semibold">
        <img src={AvatarImg} alt="profilePicture" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
