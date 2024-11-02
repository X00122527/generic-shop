import CookieUtil from "./cookieUtil";
import { jwtDecode } from "jwt-decode";


const getUserId = () => {
    let token = CookieUtil.getCookie('access');
    if (token) {
      let decodedToken = jwtDecode(token);
      return decodedToken.userId;
    }
    return "";
}


const CommonUtil = {
  getUserId: getUserId,
}

export default CommonUtil;