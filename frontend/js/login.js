document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Show success message
      const messageDiv = document.getElementById('message');
      messageDiv.className = 'success';
      messageDiv.textContent = 'Login successful! Redirecting...';
      
      // Redirect to welcome page
      setTimeout(() => {
        window.location.href = '/welcome';
      }, 1000);
    } else {
      // Show error message
      const messageDiv = document.getElementById('message');
      messageDiv.className = 'error';
      messageDiv.textContent = data.error || 'Login failed';
    }
  } catch (error) {
    console.error('Login error:', error);
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'error';
    messageDiv.textContent = 'An error occurred. Please try again.';
  }
});

// Redirect if already logged in
if (localStorage.getItem('token')) {
  window.location.href = '/welcome';
}
