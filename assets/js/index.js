$(document).ready(function() {
    // Add event listener to the form
    $('#add_user').submit(function(event) {
      // Prevent the default form submission
    //   event.preventDefault();
      alert("data added successfully");
    });

    // Check if the current page is '/admin_dashboard'
    if (window.location.pathname == '/admin_dashboard') {
      // Select the delete links
      $ondelete = $(".table tbody td a.delete");
      $ondelete.click(function() {
        // Get the 'data-id' attribute value
        var id = $(this).attr('data-id');

        var request = {
          "url": `http://localhost:3000/api/users/${id}`,
          "method": "GET"
        };

        if (confirm("Do you really want to delete this user?")) {
          $.ajax(request).done(function(response) {
            alert("Data deleted successfully");
            location.reload();
          });
        }
      });
    }
  });