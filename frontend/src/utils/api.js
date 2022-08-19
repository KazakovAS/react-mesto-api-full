import DOMAIN from './constants';

class Api {
  constructor(domain) {
    this._domain = domain;
  }

  getProfile(token) {
    return fetch(`https://${this._domain}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._handleError(res))
  }

  getInitialCards(token) {
    return fetch(`https://${this._domain}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(res => this._handleError(res))
  }

  editProfile(name, about, token) {
    return fetch(`https://${this._domain}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
      .then(res => this._handleError(res))
  }

  addCard(name, link, token) {
    return fetch(`https://${this._domain}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => this._handleError(res))
  }

  deleteCard(id, token) {
    return fetch(`https://${this._domain}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleError(res))
  }

  addLike(id, token) {
    return fetch(`https://${this._domain}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleError(res))
  }

  deleteLike(id, token) {
    return fetch(`https://${this._domain}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleError(res))
  }

  editAvatar(avatar, token) {
    return fetch(`https://${this._domain}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    })
      .then(res => this._handleError(res))
  }

  _handleError(res) {
    return res.ok ? res.json(): Promise.reject(res.status)
  }
}

const api = new Api(DOMAIN);

export default api;
