import encodeParams from "./encodeParams.js";

export default function auth() {

  let localToken = window.localStorage.getItem('token');

  if (localToken === null) {
    return triggerAuth();
  }

  let localTokenObject = JSON.parse(localToken);

  const tokenTimestamp = new Date(localTokenObject.expires);
  const currentTimestamp = new Date();

  /* check time of expiration, if expired, create new token... else return token */
  if (currentTimestamp < tokenTimestamp) {
    return localTokenObject.token;
  } else {
    return triggerAuth();
  }

};

function triggerAuth() {
  const paramString = encodeParams({
    'client_id': '26253e9f95d948378e1e70d9552a6efa',
    'response_type': 'token',
    'redirect_uri': window.location.origin + '/callback',
    'scope': ['playlist-read-collaborative', 'playlist-read-private', 'user-read-recently-played', 'user-library-read', 'user-follow-read', 'streaming', 'user-read-email', 'user-read-private'].join(' ')
  });

  const pageTriggeringAuth = window.location.href;

  window.localStorage.setItem('triggerPage', pageTriggeringAuth);

  window.location =`https://accounts.spotify.com/authorize?${paramString}`;
}