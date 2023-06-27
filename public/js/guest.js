$(() => {
  // JavaScript code to handle button click event
  const buttons = document.querySelectorAll('.leave-comment');
  const usernameElement = document.querySelector('#username');
  const $closeButton = $('.close-button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log(button);
      // User is not logged in, show the login modal
      const loginModal = new bootstrap.Modal(
        document.getElementById('loginModal')
      );
      loginModal.show();
      $closeButton.click(() => {
        loginModal.hide();
      });
    });
  });
});
