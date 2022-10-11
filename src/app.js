const stateId = "nim-state-cookie";

import './cookie.js'

setCookie(stateId, "logo");
log(checkCookie(stateId));
