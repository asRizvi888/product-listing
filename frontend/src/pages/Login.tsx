import { signin, signup } from "@/api/user";
import router from "@/components/hoc/router";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/components/ui/use-toast";
import LoginForm from "@/components/views/LoginForm";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  "confirm-password"?: string;
};

const Login = () => {
  const [loginVisible, setLoginVisible] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const fieldOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const toggleForm = () => {
    setLoginVisible((prev) => !prev);
  };

  const handleSingin = async () => {
    try {
      const response = await signin({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("ACCESS_TOKEN", response.token);
      navigate("/product");
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  const handleSignup = async () => {
    if (formData.password !== formData["confirm-password"]) {
      toast({
        variant: "destructive",
        description: "Password didn't matched",
      });
      return;
    }
    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
      });
      setLoginVisible(true);
      toast({
        variant: "default",
        color: "green-500",
        description: response.message,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.response.data.message,
      });
    }
  };

  const onSubmit = () => {
    loginVisible ? handleSingin() : handleSignup();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-10 right-5 md:right-24">
        <ThemeToggle />
      </div>
      <LoginForm
        loginVisible={loginVisible}
        toggleForm={toggleForm}
        onSubmit={onSubmit}
        fieldOnChange={fieldOnChange}
      />
    </main>
  );
};

export default router(Login);
