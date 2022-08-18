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
          return res;
        }
      })
  }

  checkToken(token) {
    return fetch(`https://${this._domain}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => this._handleError(res))
      .then(res => res.data)
  }
}

const auth = new Auth(DOMAIN);

export default auth;
