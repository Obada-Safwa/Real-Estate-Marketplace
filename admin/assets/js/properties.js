RestClient.get("properties", function (response) {
  response.forEach((property) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${property.id}</td>
        <td>${property.title}</td>
        <td>${property.price} BAM</td>
        <td>${property.location}</td>
        <td>${property.status}</td>
        <td>${property.type}</td>
        <td>
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-secondary" id="edit-button">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
    document.querySelector("#propertiesTableBody").appendChild(row);
  });
});

document
  .getElementById("add-property-button")
  .addEventListener("click", function () {
    const modal = new bootstrap.Modal(
      document.getElementById("propertyEditModal")
    );
    modal.show();
  });

FormValidation.validate("#propertyEditForm", {}, function (data) {
  console.log(data);
  RestClient.post("properties", data, function (response) {
    console.log(response);
    location.reload();
  });
});
