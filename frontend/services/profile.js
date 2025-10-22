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
        <td>${property.price.toLocaleString("de-DE")} BAM</td>
        <td>${property.type}</td>
        <td>${property.category}</td>
        <td>${property.status}</td>
        <td style="display: flex; justify-content: center; align-items: center;">
          <div class="btn-group" >
            <button class="btn btn-sm btn-outline-danger" onclick="deleteProperty(${
              property.property_id
            })">
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

function getPropertiesWithReport() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.data.id);
  userId = user.data.id;
  RestClient.get(`reports/reciever/${userId}`, function (response) {
    let row = ``;
    response.forEach((property) => {
      console.log(property);
      row += `
      <tr>
        <td>${property.property_title}</td>
        <td>Your Property was reported and Deleted.\nReason: ${property.report_reason}</td>
        <td>${property.report_status}</td>
      </tr>`;
    });
    document.getElementById("reportsTableBody").innerHTML = row;
    console.log(".Reports Table Body", response);
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
