import { Logo } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2Icon } from "lucide-react";
import { Eye, EyeOff, Heart, MessageCircle, Star } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router";

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
    <div className="min-h-screen bg-background flex">
      {/* Left side - Hero section */}
      <div className="w-3/5 hidden md:flex flex-col p-8 bg-gradient-to-br from-teal-50 to-blue-50">
        {/* logo */}
        <Logo />

        <div className="h-full flex items-center justify-center">
          <div className="max-w-lg text-center mt-8">
            <h1 className="text-4xl font-medium bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent mb-4">
              Where Developers Meet, Connect, and Inspire.
            </h1>

            <div className="relative mx-auto mt-12 w-80 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                {/* Status bar */}
                <div className="h-6 bg-gray-100 flex items-center justify-between px-4 text-xs">
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>

                {/* Mock Instagram interface */}
                <div className="p-4 space-y-4">
                  {/* Story circles */}
                  <div className="flex space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full p-0.5">
                      <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-0.5">
                      <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full p-0.5">
                      <div className="w-full h-full bg-gray-200 rounded-full"></div>
                    </div>
                  </div>

                  {/* Mock post */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-40 bg-gradient-to-br from-blue-200 to-green-200 rounded-lg relative overflow-hidden">
                      <div className="absolute top-2 left-2">
                        <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                      </div>
                      <div className="absolute top-2 right-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-white bg-opacity-90 rounded-full px-3 py-1 text-xs">
                          Beautiful moment ✨
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Heart className="w-5 h-5 text-gray-700" />
                      <MessageCircle className="w-5 h-5 text-gray-700" />
                      <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      className="bg-secondary h-12"
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
                        className="bg-secondary h-12"
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
                    variant="outlineblue"
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
