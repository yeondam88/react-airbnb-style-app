import * as moment from "moment";
import * as jwt from "jsonwebtoken";

class AuthService {
  getToken() {
    return localStorage.getItem("auth_token");
  }

  decode(token) {
    return jwt.decode(token);
  }

  getExpiration(token) {
    const { exp } = this.decode(token);

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
