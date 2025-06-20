import { Logo } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2Icon } from "lucide-react";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import { Link, data } from "react-router";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, authUser, register } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    register(formData);
  };

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  if (authUser) return <Navigate to="/" replace />;

  return (
    <div className="bg-background flex flex-col min-h-screen p-8">
      <Logo />

      <div className="w-full flex items-center justify-center mt-7 md:mt-16">
        <div className="max-w-xl w-full md:px-10">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full size-10 -ml-4 mb-5"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
          </Button>

          <h1 className="text-3xl font-medium mb-6 text-text-secondary">
            Get started on devsnap
          </h1>

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

                <div>
                  <Label className="mb-1 text-lg font-medium text-text-muted">
                    Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-secondary h-12"
                  />
                </div>

                <div>
                  <Label className="mb-1 text-lg font-medium text-text-muted">
                    Username
                  </Label>
                  <Input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="bg-secondary h-12"
                  />
                </div>

                {formData.email && formData.password && formData.username ? (
                  <Button type="submit" className="w-full" size="xl">
                    {!loading ? (
                      "Submit"
                    ) : (
                      <>
                        <Loader2Icon className="animate-spin" /> Please wait
                      </>
                    )}
                  </Button>
                ) : (
                  <Button type="button" className="w-full" size="xl" disabled>
                    Submit
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
                  <Link to="/auth/login">I already have an account</Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
