import { Loader2Icon } from "lucide-react";

import Logo from "@/assets/images/logo.png";

const SplashScreen = () => {
  return (
    <div className="bg-background flex flex-col gap-3 items-center justify-center h-screen">
      <img src={Logo} alt="logo" className="w-40" />
      <Loader2Icon className="animate-spin" size={30} />
    </div>
  );
};

export default SplashScreen;
