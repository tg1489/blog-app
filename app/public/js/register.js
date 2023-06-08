function handleRegister(e) {
    e.preventDefault();
  
    const username = document.querySelector('#register-username').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;
    const isLogin = e.target.getAttribute('data-action') === 'login';
  
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        if (isLogin) {
          console.log('Login successful');
          // Redirect to the dashboard or perform other actions
        } else {
          console.log('Registration successful');
          return res.json();
        }
      } else {
        throw new Error('Registration/Login failed');
      }
    })
    .then((data) => {
      if (!isLogin) {
        console.log('User data:', data);
        // Redirect to the dashboard or perform other actions
      }
    })    
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }
  
  const registerForm = document.querySelector('#register-form');
  registerForm.addEventListener('click', handleRegister);
  
  // const loginButton = document.querySelector('#register-input-button');
  // loginButton.addEventListener('click', handleRegister);
  