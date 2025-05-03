// import { atomWithStorage } from 'jotai/utils';
import { UserManager } from "oidc-client-ts";
import { atom } from "jotai";

export const oidcAtom = atom(() =>
  new UserManager({
    authority: String(process.env.NEXT_PUBLIC_AUTHORITY),
    client_id: String(process.env.NEXT_PUBLIC_CLIENT_ID),
    redirect_uri: String(process.env.NEXT_PUBLIC_REDIRECT_URI),
    post_logout_redirect_uri: process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI,
    response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
    scope: process.env.NEXT_PUBLIC_SCOPE,
  })
)

export const isSessionActive = atom(false);

export const logoutAtom = atom(null, (get, set) => {
  get(oidcAtom).signoutRedirect()
})
