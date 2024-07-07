import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";

interface LoginFormProps {
  loginVisible: boolean;
  fieldOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  toggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginVisible,
  fieldOnChange,
  onSubmit,
  toggleForm,
}) => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {loginVisible ? "Login" : "Signup"}
        </CardTitle>
        <CardDescription>
          {loginVisible
            ? "Enter your email and password to login to your account"
            : "Enter your email and password to create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mail@example.com"
              required
              onChange={fieldOnChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              minLength={8}
              required
              onChange={fieldOnChange}
            />
          </div>
          {!loginVisible && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                minLength={8}
                required
                onChange={fieldOnChange}
              />
            </div>
          )}
          <Button className="w-full" onClick={onSubmit}>
            {loginVisible ? "Login" : "Signup"}
          </Button>
        </div>
        <div className="flex items-center justify-center w-full mt-2">
          <span>
            {loginVisible
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <Button
            variant="link"
            className="px-2 font-semibold"
            onClick={toggleForm}
          >
            {loginVisible ? "Create one" : "Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
