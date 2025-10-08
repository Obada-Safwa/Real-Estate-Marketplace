function getReports() {
  RestClient.get("reports", function (response) {
    let row = ``;
    response.forEach((report) => {
      row += `
      <tr>
        <td>${report.id}</td>
        <td>${report.user_id}</td>
        <td>${report.property_id}</td>
        <td>${report.reason}</td>
        <td>${report.status}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-danger" onclick="deleteProperty(${report.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`;
    });
    document.querySelector("#reportsTableBody").innerHTML = row;
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
    `reports/${propertyIdToDelete}`,
    {},
    function (response) {
      getReports();

      toastr.success("Report deleted successfully");
      console.log("Report deleted:", response);

      // Close the modal and reset the property ID
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deletePropertyModal")
      );
      modal.hide();
      propertyIdToDelete = null;
    },
    function (error) {
      console.log("Error deleting report:", error);
      toastr.error(error.responseText || "Failed to delete report");
      propertyIdToDelete = null;
    }
  );
}
