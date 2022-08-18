import DOMAIN from './constants';

class Api {
  constructor(domain) {
    this._domain = domain;
  }

  getProfile() {
    return fetch(`https://${this._domain}/users/me`, {
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020'
      }
    })
      .then(res => this._handleError(res))
  }

  getInitialCards() {
    return fetch(`https://${this._domain}/cards`, {
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020'
      }
    })
      .then(res => this._handleError(res))
  }

  editProfile(name, about) {
    return fetch(`https://${this._domain}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
      .then(res => this._handleError(res))
  }

  addCard(name, link) {
    return fetch(`https://${this._domain}/cards`, {
      method: "POST",
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => this._handleError(res))
  }

  deleteCard(id) {
    return fetch(`https://${this._domain}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020',
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleError(res))
  }

  addLike(id) {
    return fetch(`https://${this._domain}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020',
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleError(res))
  }

  deleteLike(id) {
    return fetch(`https://${this._domain}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020',
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._handleError(res))
  }

  editAvatar(avatar) {
    return fetch(`https://${this._domain}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: 'e9991a6f-eae8-43d4-9748-5d955e306020',
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
