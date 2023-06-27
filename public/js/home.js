$(() => {
  const $saveButton = $('#comment-save');
  const $closeButton = $('.comment-close');
  const $xButton = $('.xButton');
  const $userId = $('');

  // Makes the Leave Comment modal appear
  $('.btn-open-modal').click(function () {
    $('#myModal').modal('show');
  });

  // AJAX logic to send the data to the database
  const handleComment = async () => {
    // New user comment stored
    const $comment = $('#comment').val().trim();

    $.ajax({
      url: '/home',
      method: 'POST',
      data: {
        body: $comment,
      },
      success: function (response) {
        // Leave new comment on DOM
        const $newEl = $(
          '<p class="p-4 blog-paragraph comment insert-comment">'
        ).text(' - ' + $comment);
        $('.leave-comment').before($newEl);

        // Close modal popup
        $('#myModal').modal('hide');
      },
      error: function (error) {
        // Handle error
        console.error(error);
      },
    });
  };

  // Event listener for AJAX
  $saveButton.click(handleComment);
});
