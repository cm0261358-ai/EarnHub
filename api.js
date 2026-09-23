const API = '';

function getToken() {
    return localStorage.getItem('earnhub_token');
}

function setSession(token, user) {
    localStorage.setItem('earnhub_token', token);
    localStorage.setItem('earnhub_user', JSON.stringify(user));
}

function clearSession() {
    localStorage.removeItem('earnhub_token');
    localStorage.removeItem('earnhub_user');
}

async function api(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const token = getToken();
    if (token) headers.Authorization = 'Bearer ' + token;

    const res = await fetch(API + path, { ...options, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || 'Request failed');
    }
    return data;
}

function requireAuth() {
    if (!getToken()) {
        window.location.href = '/login.html';
    }
}
