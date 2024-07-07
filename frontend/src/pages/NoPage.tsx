import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-screen">
      <h1 className="text-lg font-semibold">Ooops! Page not found 😫</h1>
      <Button className="mt-5" onClick={() => navigate("/")}>
        Go to Login
      </Button>
    </div>
  );
};

export default NoPage;
