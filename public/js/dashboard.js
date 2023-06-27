$(() => {
  const $blogButton = $('.blog-posts-button');
  const $blogDropdown = $('.blog-dropdown');
  const $editButton = $('.edit');
  const $deleteButton = $('.delete');
  const $editBlogContainer = $('.edit-blog-container');

  $blogDropdown.hide();
  $editButton.hide();
  $deleteButton.hide();
  $editBlogContainer.hide();

  $blogButton.on('click', () => {
    $blogDropdown.toggle();
    $editButton.toggle();
    $deleteButton.toggle();
    $editBlogContainer.hide(); // Hide the edit-blog-container for all blogs

    $editButton.on('click', function () {
      const $blogId = $(this)
        .closest('li')
        .find('.blog-dropdown-item')
        .data('id');
      const $clickedBlogEditContainer = $(this)
        .closest('li')
        .find('.edit-blog-container');

      if ($clickedBlogEditContainer.is(':visible')) {
        $clickedBlogEditContainer.hide();
      } else {
        $editBlogContainer.hide(); // Hide the edit-blog-container for other blogs
        $clickedBlogEditContainer.show();
      }
    });
  });

  // FORM EDIT
  $(document).on('submit', '.form-create-blog', function (e) {
    e.preventDefault();
    const $blogId = $(this)
      .closest('li')
      .find('.blog-dropdown-item')
      .data('id');
    // .prev(".blog-dropdown-item")
    // .data("id");
    const $clickedBlogEditContainer = $(this)
      .closest('li')
      .find('.edit-blog-container');

    console.log($blogId + 'BlogID should be here');
    console.log($(this).closest('li').find('.blog-dropdown-item'));

    if ($clickedBlogEditContainer.is(':visible')) {
      $clickedBlogEditContainer.hide();
    } else {
      $editBlogContainer.hide(); // Hide the edit-blog-container for other blogs
      $clickedBlogEditContainer.show();
    }

    const $title = $('#titleId').val().trim();
    const $date = $('#dateId').val();
    const $paragraph = $('#paragraphId').val();

    // Send AJAX request to retrieve the blog data and populate the edit-blog-container
    $.ajax({
      type: 'PUT',
      url: `/dashboard`,
      data: {
        title: $title,
        paragraph: $paragraph,
        date: $date,
      },
      success: function (response) {
        $clickedBlogEditContainer.html(response);
        console.log(`Front End Response: ${response}`);
      },
      error: function (error) {
        console.error('Error retrieving blog data:', error);
      },
    });
  });
  // END FORM EDIT

  $deleteButton.on('click', function () {
    const blogId = $(this).closest('li').find('.blog-dropdown-item').data('id');
    const $blogEl = $(this).closest('li'); // Grabs the <li> item clicked

    $.ajax({
      type: 'DELETE',
      url: `/dashboard/delete`,
      data: { blogId: blogId },
      success: function (response) {
        console.log('Blog deleted successfully');

        // Remove blog element right away
        $blogEl.remove();
      },
      error: function (error) {
        console.error('Error deleting blog:', error);
      },
    });
  });
});
