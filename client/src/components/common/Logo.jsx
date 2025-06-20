import LogoImage from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <div className="w-8 h-8 flex items-center gap-3">
      <img src={LogoImage} alt="logo" />
      <h2 className="font-bold text-3xl text-text-primary">devsnap</h2>
    </div>
  );
};

export default Logo;
