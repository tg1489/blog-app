function handleRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#register-username').value.trim();
  const password = document.querySelector('#register-password').value.trim();

  if (username && password) {
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to register');
        }
      })
      .then((data) => {
        window.location.href = '/dashboard'; // Redirect to the dashboard page
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        alert('Failed to register');
      });
  }
}

const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', handleRegister);
