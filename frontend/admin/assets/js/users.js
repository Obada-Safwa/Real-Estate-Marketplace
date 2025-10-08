function getUsers() {
  RestClient.get("users", function (response) {
    let row = ``;
    response.forEach((user) => {
      row += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-danger" onclick="deleteProperty(${user.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`;
    });
    document.querySelector("#usersTableBody").innerHTML = row;
  });
}

// Variable to store the property ID to be deleted
let propertyIdToDelete = null;

// Function to show delete confirmation modal
function deleteProperty(propertyId) {
  propertyIdToDelete = propertyId;
  const modalElement = document.getElementById("deletePropertyModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// Function to actually delete the property after confirmation
function confirmDeleteProperty() {
  if (propertyIdToDelete === null) {
    return;
  }

  RestClient.delete(
    `users/${propertyIdToDelete}`,
    {},
    function (response) {
      getUsers();

      toastr.success("User deleted successfully");
      console.log("User deleted:", response);

      // Close the modal and reset the property ID
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deletePropertyModal")
      );
      modal.hide();
      propertyIdToDelete = null;
    },
    function (error) {
      console.log("Error deleting user:", error);
      toastr.error(error.responseText || "Failed to delete user");
      propertyIdToDelete = null;
    }
  );
}
