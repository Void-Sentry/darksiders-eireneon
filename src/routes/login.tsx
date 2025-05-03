"use client"
import { isSessionActive, oidcAtom } from "../atoms/authAtom";
import { Navigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import "../styles/LoginPage.css";

function LoginPage() {
  const isSessionActiveState = useAtom(isSessionActive)[0];
  const oidc = useAtomValue(oidcAtom);

  if (isSessionActiveState)
    return <Navigate to="/feed" replace />;

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Bem-vindo</h1>
        <button className="login-button" onClick={() => oidc.signinRedirect()}>
          Login com Zitadel
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
