$(() => {

    $('#dateId').datepicker();

    $('.form-create-blog').on('submit', async function (e) {
        e.preventDefault();
        const $title = $('#titleId').val().trim();
        const $date = $('#dateId').val();
        const $paragraph = $('#paragraphId').val().trim();

        $.ajax({
            url: "/blog",
            method: "POST",
            data: {
                title: $title,
                date: $date,
                paragraph: $paragraph,
            },
            success: function (response) {
                if (response.success)
                {window.location.assign('/home')}
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("AJAX request failed: " + textStatus + ", " + errorThrown);
              }
        });
    });
})