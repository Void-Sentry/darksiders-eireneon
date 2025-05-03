// app/callback/page.tsx
"use client";
import { isSessionActive, oidcAtom } from "../atoms/authAtom";
import { Navigate, useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export default function CallbackPage() {
  const isSessionActiveState = useAtom(isSessionActive)[0];
  const oidc = useAtomValue(oidcAtom);
  const navigate = useNavigate();
  const { swap } = useProfile();

  if (isSessionActiveState)
    return <Navigate to="/feed" replace />;

  useEffect(() => {
    oidc.signinRedirectCallback()
      .then(async (response) => {
        await swap(String(response.id_token));
        navigate('/feed');
      })
      .catch((error) => {
        console.error("Falha no callback OIDC:", error);
      });
  }, []);

  return <p>Processando login...</p>;
}