document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Validate passwords match
  if (password !== confirmPassword) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'error';
    messageDiv.textContent = 'Passwords do not match';
    return;
  }
  
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Show success message
      const messageDiv = document.getElementById('message');
      messageDiv.className = 'success';
      messageDiv.textContent = 'Registration successful! Redirecting to login...';
      
      // Clear form
      document.getElementById('registerForm').reset();
      
      // Redirect to login page
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      // Show error message
      const messageDiv = document.getElementById('message');
      messageDiv.className = 'error';
      messageDiv.textContent = data.error || 'Registration failed';
    }
  } catch (error) {
    console.error('Registration error:', error);
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'error';
    messageDiv.textContent = 'An error occurred. Please try again.';
  }
});

// Redirect if already logged in
if (localStorage.getItem('token')) {
  window.location.href = '/welcome';
}
