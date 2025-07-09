import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <SignIn afterSignInUrl="/admin" redirectUrl="/admin" />
    </div>
  );
};

export default Login;
