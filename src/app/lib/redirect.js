import queryString from "query-string";

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export function setCookie(cname, cvalue, expiry) {
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(expiry);
  const expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
};


export function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("//") > -1) hostname = url.split('/')[2];
  else hostname = url.split('/')[0];

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

export function doRedirect(redirect){
  const redirectHost = extractHostname(redirect);
  const iu3 = JSON.parse(getCookie("iu3"));
  const stringified = queryString.stringify(iu3);
  window.location.replace(`https://${redirectHost}/verify?${stringified}&redirect=${redirect}`);
}
