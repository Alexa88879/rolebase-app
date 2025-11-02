// Utility functions
function getToken() {
  return localStorage.getItem('token');
}

function getUserData() {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
}

function saveAuthData(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

function showMessage(message, type = 'error') {
  const messageDiv = document.getElementById('message');
  if (messageDiv) {
    messageDiv.className = type;
    messageDiv.textContent = message;
  }
}

function logout() {
  const token = getToken();
  
  // Call logout endpoint
  fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  clearAuthData();
  window.location.href = '/login';
}

// Check if user is authenticated
function requireAuth() {
  const token = getToken();
  if (!token) {
    window.location.href = '/login';
    return false;
  }
  return true;
}

// Check if user is admin
function requireAdmin() {
  if (!requireAuth()) return false;
  
  const user = getUserData();
  if (!user || user.role !== 'admin') {
    window.location.href = '/welcome';
    return false;
  }
  return true;
}
