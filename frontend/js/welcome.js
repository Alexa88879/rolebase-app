// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/login';
}

// Get user data
const userData = localStorage.getItem('user');
if (userData) {
  const user = JSON.parse(userData);
  
  // Display user information
  document.getElementById('userName').textContent = user.username;
  document.getElementById('userUsername').textContent = user.username;
  document.getElementById('userRole').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
  
  // Show admin button if user is admin
  if (user.role === 'admin') {
    document.getElementById('adminBtn').classList.remove('hidden');
  }
} else {
  window.location.href = '/login';
}

function logout() {
  const token = localStorage.getItem('token');
  
  // Call logout endpoint
  fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(() => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    window.location.href = '/login';
  }).catch((error) => {
    console.error('Logout error:', error);
    // Clear local storage anyway
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  });
}
