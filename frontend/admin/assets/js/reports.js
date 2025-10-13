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
            <button class="btn btn-sm btn-outline-danger" onclick="deleteReport(${report.id})">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-danger" onclick="deletePropertyOfReport(${report.property_id}, ${report.id})">
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
let propertyOfReportIdToDelete = null;
let reportIdToAlter = null;

function deletePropertyOfReport(propertyId, reportId) {
  propertyOfReportIdToDelete = propertyId;
  reportIdToAlter = reportId;
  const modalElement = document.getElementById("deletePropertyOfReportModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// Function to actually delete the property after confirmation
function confirmDeletePropertyOfReport() {
  if (propertyOfReportIdToDelete === null) {
    return;
  }

  RestClient.delete(
    `reports/${propertyOfReportIdToDelete}`,
    {},
    function (response) {
      getReports();
      alterReportStatus(reportIdToAlter, "reviewed");
      toastr.success("Property deleted successfully");
      console.log("Property deleted:", response);

      // Close the modal and reset the property ID
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deletePropertyOfReportModal")
      );
      modal.hide();
      propertyOfReportIdToDelete = null;
    },
    function (error) {
      console.log("Error deleting report:", error);
      toastr.error(error.responseText || "Failed to delete report");
      propertyOfReportIdToDelete = null;
    }
  );
}

// Variable to store the property ID to be deleted
let reportIdToDelete = null;

// Function to show delete confirmation modal
function deleteReport(propertyId) {
  reportIdToDelete = propertyId;
  const modalElement = document.getElementById("deleteReportModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

// Function to actually delete the property after confirmation
function confirmDeleteReport() {
  if (reportIdToDelete === null) {
    return;
  }

  RestClient.delete(
    `reports/${reportIdToDelete}`,
    {},
    function (response) {
      getReports();
      // alterReportStatus(reportIdToDelete, "reviewed");
      toastr.success("Report deleted successfully");
      console.log("Report deleted:", response);

      // Close the modal and reset the property ID
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteReportModal")
      );
      modal.hide();
      reportIdToDelete = null;
    },
    function (error) {
      console.log("Error deleting report:", error);
      toastr.error(error.responseText || "Failed to delete report");
      reportIdToDelete = null;
    }
  );
}

function alterReportStatus(reportId, status) {
  RestClient.patch(
    `reports/${status}/${reportId}`,
    {},
    function (response) {
      // getReports();
      // toastr.success("Report status altered successfully");
      console.log("Report status altered:", response);
    },
    function (error) {
      console.log("Error altering report status:", error);
      // toastr.error(error.responseText || "Failed to alter report status");
    }
  );
}
