$(() => {
  $('#dateId').datepicker();

  $('.form-create-blog').on('submit', async function (e) {
    e.preventDefault();
    const $title = $('#titleId').val().trim();
    const $date = $('#dateId').val();
    const $paragraph = $('#paragraphId').val().trim();
    const blogIdentification = Math.floor(Math.random() * 100 * 100);

    $.ajax({
      url: '/blog',
      method: 'POST',
      data: {
        title: $title,
        paragraph: $paragraph,
        date: $date,
      },
      success: function (response) {
        if (response.success) {
          window.location.assign('/dashboard');
        }
      },
      error: function (textStatus, errorThrown) {
        console.log('AJAX request failed: ' + textStatus + ', ' + errorThrown);
      },
    });
  });
});
