// Using the updated path for RestClient after admin folder relocation
function getProperties() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.data.id);
  userId = user.data.id;
  RestClient.get("properties", function (response) {
    let row = ``;
    response.forEach((property) => {
      if (property.user_id === userId) {
        console.log(property);
        row += `
      <tr>
        <td>${property.title}</td>
        <td>${property.price} BAM</td>
        <td>${property.type}</td>
        <td>${property.category}</td>
        <td>${property.status}</td>
        <td style="display: flex; justify-content: center; align-items: center;">
          <div class="btn-group" >
            <button class="btn btn-sm btn-outline-danger" onclick="deleteProperty(${property.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`;
      }
    });
    document.getElementById("propertiesTableBody").innerHTML = row;
    console.log(".DATAAA", response);
  });
}

// document
//   .getElementById("add-property-button")
//   .addEventListener("click", function () {
//     const modal = new bootstrap.Modal(
//       document.getElementById("propertyEditModal")
//     );
//     modal.show();
//   });

// FormValidation.validate("#propertyEditForm", {}, function (data) {
//   console.log(data);
//   RestClient.post("properties", data, function (response) {
//     console.log(response);
//     location.reload();
//   });
// });

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
    `properties/${propertyIdToDelete}`,
    {},
    function (response) {
      getProperties();

      toastr.success("Property deleted successfully");
      console.log("Property deleted:", response);

      // Close the modal and reset the property ID
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deletePropertyModal")
      );
      modal.hide();
      propertyIdToDelete = null;
    },
    function (error) {
      console.log("Error deleting property:", error);
      toastr.error(error.responseText || "Failed to delete property");
      propertyIdToDelete = null;
    }
  );
}
