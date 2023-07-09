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
      // When you click on the EDIT button
      const $clickedBlogEditContainer = $('#edit-blog-btn')[0];

      console.log($clickedBlogEditContainer);
      $editBlogContainer.toggle();
    });
  });

  // FORM EDIT
  $(document).on('submit', '.form-create-blog', async function (e) {
    e.preventDefault();

    const blogId = $(this).data('blog-id');
    const title = document.querySelector('input[name="blog-title"]').value;
    const date = document.querySelector('input[name="blog-date"]').value;
    const body = document.querySelector('textarea[name="blog-body"]').value;

    console.log(
      `BlogID===${blogId} title===${title} date===${date} body===${body}`
    );

    await fetch(`/dashboard`, {
      method: 'PUT',
      body: JSON.stringify({
        blogId,
        title,
        date,
        body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    document.location.replace('/dashboard');
  }); // END FORM EDIT

  // DELETE FORM
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
