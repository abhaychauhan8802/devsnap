import { Loader2Icon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaLink, FaRegBookmark } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router";

import { Logo } from "@/components";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";

import Avatar from "../../assets/images/avatar.png";
import DummyImage from "../../assets/images/dummy-image.webp";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const { loading, authUser, login } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  if (authUser) return <Navigate to="/" replace />;

  return (
    <div className="h-screen bg-background flex overflow-auto">
      {/* Left side - Hero section */}
      <div className="min-h-full w-3/5 hidden md:flex flex-col p-8 bg-gradient-to-br from-secondary to-primary">
        {/* logo */}
        <Logo logoTextStyle="" />

        <div className="h-full flex items-center justify-center">
          <div className="max-w-lg text-center mt-8">
            <h1 className="text-4xl font-bold mb-4 text-text-primary">
              Where Developers Meet, Connect, and Inspire.
            </h1>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="md:w-2/5 w-full flex flex-col p-8 bg-background">
        <div className="md:hidden">
          <Logo />
        </div>
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="text-center mb-7">
              <h1 className="text-3xl font-medium mb-6 text-text-secondary">
                Log into devsnap
              </h1>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-1 text-lg font-medium text-text-muted">
                      Email
                    </Label>
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>

                  <div>
                    <Label className="mb-1 text-lg font-medium text-text-muted">
                      Password
                    </Label>
                    <div className="relative w-full">
                      <Input
                        type={!passwordVisible ? "password" : "text"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          })
                        }
                        className="h-12"
                      />
                      <Button
                        variant="ghost"
                        type="button"
                        className="absolute inset-y-[6px] right-1 flex items-center rounded-full"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                      >
                        {!passwordVisible ? <Eye /> : <EyeOff />}
                      </Button>
                    </div>
                  </div>

                  {formData.email && formData.password ? (
                    <Button type="submit" className="w-full " size="xl">
                      {!loading ? (
                        "Login"
                      ) : (
                        <>
                          <Loader2Icon className="animate-spin" /> Please wait
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className="w-full "
                      size="xl"
                      disabled
                    >
                      Log in
                    </Button>
                  )}
                </div>

                <div className="pt-1 border-gray-200">
                  <Button
                    asChild
                    variant="outlineColor"
                    className="w-full"
                    size="xl"
                    type="button"
                  >
                    <Link to="/auth/register">Create new account</Link>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
