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
  
      $editButton.on('click', function() {
        const $blogId = $(this).closest('li').find('.blog-dropdown-item').data('id');
        const $clickedBlogEditContainer = $(this).closest('li').find('.edit-blog-container');
  
        if ($clickedBlogEditContainer.is(':visible')) {
            $clickedBlogEditContainer.hide();
        } else {
          $editBlogContainer.hide(); // Hide the edit-blog-container for other blogs
          $clickedBlogEditContainer.show();
        }
  
        // Send AJAX request to retrieve the blog data and populate the edit-blog-container
        $.ajax({
          type: 'PUT',
          url: `/dashboard/edit/${$blogId}`,
          success: function(response) {
    
            $clickedBlogEditContainer.html(response);

          },
          error: function(error) {
            console.error('Error retrieving blog data:', error);
          }
        });
      });
    });
  
    $deleteButton.on('click', function() {
      const blogId = $(this).closest('li').find('.blog-dropdown-item').data('id');
  
      $.ajax({
        type: 'DELETE',
        url: `/dashboard/delete/${blogId}`,
        success: function(response) {
          console.log('Blog deleted successfully');
        },
        error: function(error) {
          console.error('Error deleting blog:', error);
        }
      });
    });
  });
  