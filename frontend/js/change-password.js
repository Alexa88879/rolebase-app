// Check if user is logged in
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/login';
}

document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Validate passwords match
  if (newPassword !== confirmPassword) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'error';
    messageDiv.textContent = 'New passwords do not match';
    return;
  }
  
  // Validate new password is different from current
  if (currentPassword === newPassword) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'error';
    messageDiv.textContent = 'New password must be different from current password';
    return;
  }
  
  try {
    const response = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Show success message
      const messageDiv = document.getElementById('message');
      messageDiv.className = 'success';
      messageDiv.textContent = 'Password changed successfully! Redirecting...';
      
      // Clear form
      document.getElementById('changePasswordForm').reset();
      
      // Redirect to welcome page
      setTimeout(() => {
        window.location.href = '/welcome';
      }, 2000);
    } else {
      // Show error message
      const messageDiv = document.getElementById('message');
      messageDiv.className = 'error';
      messageDiv.textContent = data.error || 'Failed to change password';
    }
  } catch (error) {
    console.error('Change password error:', error);
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'error';
    messageDiv.textContent = 'An error occurred. Please try again.';
  }
});
