import React from "react";
import LoginContent from "./LoginContent/LoginContent";
import LoginHeader from "./LoginHeader/LoginHeader";

const LoginContainer: React.FC = () => {
  return (
    <div>
      <LoginHeader />
      <br />
      <LoginContent />
    </div>
  );
};

export default LoginContainer;
