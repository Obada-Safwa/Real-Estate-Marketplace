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
      </tr>`;
    });
    document.querySelector("#reportsTableBody").innerHTML = row;
  });
}

function deleteReport(reportId) {
  RestClient.delete(
    `reports/${reportId}`,
    {},
    function (response) {
      getReports();
      toastr.success("Report deleted successfully");
      console.log("Report deleted:", response);
    },
    function (error) {
      console.log("Error deleting report:", error);
      toastr.error(error.responseText || "Failed to delete report");
    }
  );
}
