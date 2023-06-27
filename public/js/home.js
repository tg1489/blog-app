$(() => {
  // Makes the Leave Comment modal appear
  $('.btn-open-modal').click(function () {
    const blogId = $(this).closest('.insert-new-comment').data('blog-id');
    $('#myModal').data('blog-id', blogId).modal('show');
  });

  // AJAX logic to send the data to the database
  const handleComment = async () => {
    const $comment = $('#comment').val().trim();
    const blogId = $('#myModal').data('blog-id');

    $.ajax({
      url: '/home',
      method: 'POST',
      data: {
        body: $comment,
        blogId: blogId,
      },
      success: function (response) {
        // Leave new comment on DOM
        const $newEl = $(
          `<p id="${blogId}" class="p-4 blog-paragraph comment insert-comment">`
        ).text(response.comment.user + ' - ' + $comment);
        $('.insert-new-comment[data-blog-id="' + blogId + '"]').append($newEl);

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
  $('#comment-save').click(handleComment);
});
