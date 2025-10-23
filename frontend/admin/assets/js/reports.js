function getReports() {
  RestClient.get("reports", async function (response) {
    let row = ``;

    for (const report of response) {
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
              <button class="btn btn-sm btn-outline-danger delete-property-btn"
                      data-property-id="${report.property_id}"
                      data-report-id="${report.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>`;
    }

    document.querySelector("#reportsTableBody").innerHTML = row;

    // Attach event listeners to property delete buttons
    document.querySelectorAll(".delete-property-btn").forEach((btn) => {
      const propertyId = btn.getAttribute("data-property-id");
      const reportId = btn.getAttribute("data-report-id");
      btn.addEventListener("click", () =>
        deletePropertyOfReport(propertyId, reportId)
      );
    });

    // ✅ After table is rendered, check which properties still exist
    setTimeout(() => {
      checkAndHideDeletedProperties();
    }, 1000);
  });
}

// 🔍 Check if properties exist, hide buttons for deleted ones
function checkAndHideDeletedProperties() {
  const buttons = document.querySelectorAll(".delete-property-btn");

  buttons.forEach((btn) => {
    const propertyId = btn.getAttribute("data-property-id");
    console.log(propertyId);
    if (propertyId == "null") {
      console.log("Property not found");
      btn.style.display = "none";
    }
    // RestClient.get(
    //   `properties/${propertyId}`,
    //   function (response) {
    //     // Property exists — do nothing
    //   },
    //   function (error) {
    //     // Property not found or deleted — hide the delete button
    //     btn.style.display = "none";
    //   }
    // );
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
    `properties/${propertyOfReportIdToDelete}`,
    {},
    function (response) {
      // Hide the delete icon immediately for this property
      const btn = document.querySelector(
        `.delete-property-btn[data-property-id="${propertyOfReportIdToDelete}"]`
      );
      if (btn) btn.style.display = "none";

      // Update report status
      alterReportStatus(reportIdToAlter, "reviewed");

      toastr.success("Property deleted successfully");
      console.log("Property deleted:", response);

      // Close modal and reset vars
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("deletePropertyOfReportModal")
      );
      modal.hide();
      propertyOfReportIdToDelete = null;
    },
    function (error) {
      console.log("Error deleting property:", error);
      toastr.error(error.responseText || "Failed to delete property");
      propertyOfReportIdToDelete = null;
    }
  );
}

// Variable to store the report ID to be deleted
let reportIdToDelete = null;

function deleteReport(reportId) {
  reportIdToDelete = reportId;
  const modalElement = document.getElementById("deleteReportModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function confirmDeleteReport() {
  if (reportIdToDelete === null) {
    return;
  }

  RestClient.delete(
    `reports/${reportIdToDelete}`,
    {},
    function (response) {
      getReports();
      toastr.success("Report deleted successfully");
      console.log("Report deleted:", response);

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
      getReports();
      console.log("Report status altered:", response);
    },
    function (error) {
      console.log("Error altering report status:", error);
    }
  );
}
