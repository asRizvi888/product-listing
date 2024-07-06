import ThemeToggle from "@/components/ThemeToggle";
import LoginForm from "@/components/views/LoginForm";

const Login = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-10 right-5 md:right-24">
        <ThemeToggle />
      </div>
      <LoginForm />
    </main>
  );
};

export default Login;
