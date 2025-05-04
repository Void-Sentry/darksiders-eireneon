// app/callback/page.tsx
"use client";
import { isSessionActive, oidcAtom } from "../atoms/authAtom";
import { useProfile } from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export default function CallbackPage() {
  const [isSessionActiveState, setIsSessionActive] = useAtom(isSessionActive);
  const oidc = useAtomValue(oidcAtom);
  const navigate = useNavigate();
  const { swap } = useProfile();

  useEffect(() => {
    if (isSessionActiveState)
      return navigate('/feed');

    oidc.signinRedirectCallback()
      .then(async (response) => {
        await swap(String(response.id_token));
        setIsSessionActive(true);
        navigate('/feed');
      })
      .catch((error) => {
        console.error("Falha no callback OIDC:", error);
        navigate('/');
      });
  }, [isSessionActive, swap, navigate, oidc]);

  return <p>Processando login...</p>;
}