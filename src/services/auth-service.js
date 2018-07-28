import moment from "moment";
import { decoded } from "jsonwebtoken";

class AuthService {
  getToken() {
    return localStorage.getItem("auth_token");
  }

  getExpiration(token) {
    const exp = decoded(token).exp;

    return moment.unix(exp);
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthenticated() {
    const token = this.getToken();
    return token && this.isValid(token) ? true : false;
  }
}

export default new AuthService();
