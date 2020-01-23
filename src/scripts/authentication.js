import encodeParams from "./encodeParams.js";

export default function auth() {
  if (window.localStorage.getItem('token')) {
    const authentication = window.localStorage.getItem('token');

    return authentication;
  }

  const paramString = encodeParams({
    'client_id': '26253e9f95d948378e1e70d9552a6efa',
    'response_type': 'token',
    'redirect_uri': 'http://localhost:8080/callback'
  });

  const pageTriggeringAuth = window.location.href;

  window.localStorage.setItem('triggerPage', pageTriggeringAuth);

  window.location =`https://accounts.spotify.com/authorize?${paramString}`;
};