// ============================
// Users.js – SPA Friendly
// ============================

// Store the ID of the user to delete
let userIdToDelete = null;

// Fetch and render all users
function getUsers() {
  RestClient.get("users", function (response) {
    let rows = "";
    response.forEach((user) => {
      rows += `
        <tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-danger delete-user-btn" data-user-id="${user.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>`;
    });

    document.querySelector("#usersTableBody").innerHTML = rows;
  });
}

// Open modal to confirm deletion
function deleteUser(id) {
  userIdToDelete = id;
  const modalElement = document.getElementById("deleteUserModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// Delete user after confirming
function confirmDeleteUser() {
  if (!userIdToDelete) return;

  RestClient.delete(
    `users/${userIdToDelete}`,
    {},
    function (response) {
      toastr.success("User deleted successfully");
      console.log("User deleted:", response);

      // Refresh table
      getUsers();

      // Close modal and reset ID
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteUserModal")
      );
      modal.hide();
      userIdToDelete = null;
    },
    function (error) {
      toastr.error(error.responseText || "Failed to delete user");
      console.log("Error deleting user:", error);
      userIdToDelete = null;
    }
  );
}

// ============================
// Event Delegation
// ============================

// Trash icon click (opens modal)
$(document).on("click", ".delete-user-btn", function () {
  const userId = $(this).data("user-id");
  deleteUser(userId);
});

// Confirm delete button in modal
$(document).on("click", "#confirmDeleteBtn", function () {
  confirmDeleteUser();
});
