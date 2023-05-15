import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithPopup } = useAuth0();

  return <button className="px-4 py-1 text-sm text-emerald-400 font-semibold rounded-full border border-emerald-200 hover:text-white hover:bg-emerald-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2" onClick={() => loginWithPopup()}>Log In</button>;
};

export default LoginButton;
