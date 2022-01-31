class Auth {
  constructor() {
    this.authenticated = false;
    this.role="";
  }

  login(cb,role) {
    this.authenticated = true;
    this.role = role;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    this.role=""
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
