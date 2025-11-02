// Check if user is logged in and is admin
const token = localStorage.getItem('token');
const userData = localStorage.getItem('user');

if (!token || !userData) {
  window.location.href = '/login';
}

const user = JSON.parse(userData);
if (user.role !== 'admin') {
  window.location.href = '/welcome';
}

// Load users when page loads
loadUsers();

// Create user form handler
document.getElementById('createUserForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  
  try {
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, role })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Show success message
      showMessage('User created successfully!', 'success');
      
      // Clear form
      document.getElementById('createUserForm').reset();
      
      // Reload users table
      loadUsers();
    } else {
      showMessage(data.error || 'Failed to create user', 'error');
    }
  } catch (error) {
    console.error('Create user error:', error);
    showMessage('An error occurred. Please try again.', 'error');
  }
});

// Load all users
async function loadUsers() {
  try {
    const response = await fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      displayUsers(data.users);
    } else {
      showMessage(data.error || 'Failed to load users', 'error');
    }
  } catch (error) {
    console.error('Load users error:', error);
    showMessage('An error occurred while loading users.', 'error');
  }
}

// Display users in table
function displayUsers(users) {
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = '';
  
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</td>
      <td>${new Date(user.created_at).toLocaleString()}</td>
      <td>
        <div class="action-buttons">
          ${getCurrentUserId() !== user.id ? `
            <button class="btn-danger btn-small" onclick="deleteUser(${user.id}, '${user.username}')">Delete</button>
          ` : '<span style="color: #999;">(You)</span>'}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Delete user
async function deleteUser(userId, username) {
  if (!confirm(`Are you sure you want to delete user "${username}"?`)) {
    return;
  }
  
  try {
    const response = await fetch(`/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      showMessage('User deleted successfully!', 'success');
      loadUsers();
    } else {
      showMessage(data.error || 'Failed to delete user', 'error');
    }
  } catch (error) {
    console.error('Delete user error:', error);
    showMessage('An error occurred. Please try again.', 'error');
  }
}

// Get current user ID
function getCurrentUserId() {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    return user.id;
  }
  return null;
}

// Show message
function showMessage(message, type = 'error') {
  const messageDiv = document.getElementById('message');
  messageDiv.className = type;
  messageDiv.textContent = message;
  
  // Auto-hide success messages after 3 seconds
  if (type === 'success') {
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = '';
    }, 3000);
  }
}

// Logout function
function logout() {
  fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }).catch((error) => {
    console.error('Logout error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  });
}
