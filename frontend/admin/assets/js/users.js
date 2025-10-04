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
            <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`;
    });
    document.querySelector("#usersTableBody").innerHTML = row;
  });
}

function deleteUser(userId) {
  RestClient.delete(
    `users/${userId}`,
    {},
    function (response) {
      getUsers();
      toastr.success("User deleted successfully");
      console.log("User deleted:", response);
    },
    function (error) {
      console.log("Error deleting user:", error);
      toastr.error(error.responseText || "Failed to delete user");
    }
  );
}
