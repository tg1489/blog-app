document.addEventListener('DOMContentLoaded', function() {
    const handleLogin = async function(e) {
      e.preventDefault();
      const loginContainerEl = document.querySelector('.login');
      loginContainerEl.style.display = 'block';
      const username = document.querySelector('#login-username').value;
      const password = document.querySelector('#login-password').value;
  
      try {
        const response = await fetch('/login', {
          method: 'POST',
          body: JSON.stringify({
            username: username,
            password: password
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (response.ok) {
          console.log('Login successful');
          // Redirect to the dashboard or perform other actions
          window.location.assign('/dashboard');  // Redirect to the dashboard page
        } else {
          console.log('Login failed');
          alert('Login Failed')
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Login failed at catch')
      }
    };
  
    const loginAnchorEl = document.querySelector('.login-start');
    loginAnchorEl.addEventListener('click', handleLogin);
  });
  