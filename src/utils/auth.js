export const BASE_URL = "http://localhost:8080";

const checkResponse = (res) => res.ok ? res.json() : Promise.reject("Server error");

export const authorize = (password, login) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({login, password})
  })
  .then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(checkResponse);
}