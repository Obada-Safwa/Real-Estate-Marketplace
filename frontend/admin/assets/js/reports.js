// ============================
// Reports.js – SPA Friendly
// ============================

// Variables to store IDs to delete
let propertyOfReportIdToDelete = null;
let reportIdToAlter = null;
let reportIdToDelete = null;

// Fetch and render all reports
function getReports() {
  RestClient.get("reports", function (response) {
    let rows = "";

    response.forEach((report) => {
      rows += `
        <tr>
          <td>${report.id}</td>
          <td>${report.user_id}</td>
          <td>${report.property_id}</td>
          <td>${report.reason}</td>
          <td>${report.status}</td>
          <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-danger delete-report-btn" data-report-id="${report.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-danger delete-property-btn"
                      data-property-id="${report.property_id}"
                      data-report-id="${report.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>`;
    });

    document.querySelector("#reportsTableBody").innerHTML = rows;

    // After table rendered, check deleted properties
    checkAndHideDeletedProperties();
  });
}

// Hide property delete buttons if property is deleted
function checkAndHideDeletedProperties() {
  document.querySelectorAll(".delete-property-btn").forEach((btn) => {
    const propertyId = btn.getAttribute("data-property-id");
    if (propertyId == "null") {
      btn.style.display = "none";
    }
  });
}

// Open modals
function deletePropertyOfReport(propertyId, reportId) {
  propertyOfReportIdToDelete = propertyId;
  reportIdToAlter = reportId;
  const modal = new bootstrap.Modal(
    document.getElementById("deletePropertyOfReportModal")
  );
  modal.show();
}

function deleteReport(reportId) {
  reportIdToDelete = reportId;
  const modal = new bootstrap.Modal(
    document.getElementById("deleteReportModal")
  );
  modal.show();
}

// Confirm deletes
function confirmDeletePropertyOfReport() {
  if (!propertyOfReportIdToDelete) return;

  RestClient.delete(
    `properties/${propertyOfReportIdToDelete}`,
    {},
    function (response) {
      const btn = document.querySelector(
        `.delete-property-btn[data-property-id="${propertyOfReportIdToDelete}"]`
      );
      if (btn) btn.style.display = "none";

      alterReportStatus(reportIdToAlter, "reviewed");

      toastr.success("Property deleted successfully");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deletePropertyOfReportModal")
      );
      modal.hide();

      propertyOfReportIdToDelete = null;
    },
    function (error) {
      toastr.error(error.responseText || "Failed to delete property");
      propertyOfReportIdToDelete = null;
    }
  );
}

function confirmDeleteReport() {
  if (!reportIdToDelete) return;

  RestClient.delete(
    `reports/${reportIdToDelete}`,
    {},
    function (response) {
      toastr.success("Report deleted successfully");
      getReports();

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deleteReportModal")
      );
      modal.hide();

      reportIdToDelete = null;
    },
    function (error) {
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
      console.log("Report status altered:", response);
      getReports();
    },
    function (error) {
      console.log("Error altering report status:", error);
    }
  );
}

// ============================
// Delegated Event Binding
// ============================

// Delete property buttons in table
$(document).on("click", ".delete-property-btn", function () {
  const propertyId = $(this).data("property-id");
  const reportId = $(this).data("report-id");
  deletePropertyOfReport(propertyId, reportId);
});

// Delete report buttons in table
$(document).on("click", ".delete-report-btn", function () {
  const reportId = $(this).data("report-id");
  deleteReport(reportId);
});

// Confirm delete buttons in modals
$(document).on("click", "#confirmDeleteBtn", function () {
  confirmDeletePropertyOfReport();
});

$(document).on("click", "#confirmDeleteReportBtn", function () {
  confirmDeleteReport();
});
