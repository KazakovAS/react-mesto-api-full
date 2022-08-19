import DOMAIN from './constants';

class Auth {
  constructor(domain) {
    this._domain = domain;
  }

  _handleError(res) {
    return res.ok ? res.json(): Promise.reject(res.status)
  }

  register(email, password) {
    return fetch(`https://${this._domain}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._handleError(res))
  }

  authorize(email, password) {
    return fetch(`https://${this._domain}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
      .then(res => this._handleError(res))
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('email', email);
          return res;
        }
      })
  }

  checkToken(token) {
    return fetch(`https://${this._domain}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._handleError(res))
      .then(res => res)
  }
}

const auth = new Auth(DOMAIN);

export default auth;
