$(() => {
  // JavaScript code to handle button click event
  const button = document.querySelector(".leave-comment");
  const editCommentButton = document.querySelector(".edit");
  const deleteCommentButton = document.querySelector(".delete");
  const usernameElement = document.querySelector("#username");
  const $closeButton = $(".close-button");

  button.addEventListener("click", () => {
    // Check if the user is logged in
    if (!usernameElement) {
      // User is not logged in, show the login modal
      const loginModal = new bootstrap.Modal(
        document.getElementById("loginModal")
      );
      loginModal.show();
      $closeButton.click(() => {
        loginModal.hide();
      });
    }
  });

  editCommentButton.addEventListener("click", () => {
    // Check if the user is logged in
    if (!usernameElement) {
      // User is not logged in, show the login modal
      const loginModal = new bootstrap.Modal(
        document.getElementById("loginModal")
      );
      loginModal.show();
      $closeButton.click(() => {
        loginModal.hide();
      });
    }
  });

  deleteCommentButton.addEventListener("click", () => {
    // Check if the user is logged in
    if (!usernameElement) {
      // User is not logged in, show the login modal
      const loginModal = new bootstrap.Modal(
        document.getElementById("loginModal")
      );
      loginModal.show();
      $closeButton.click(() => {
        loginModal.hide();
      });
    }
  });
});
