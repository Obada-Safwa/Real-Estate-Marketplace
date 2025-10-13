toastr.options = {
  closeButton: true,
  progressBar: true,
  positionClass: "toast-top-right",
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

document.addEventListener("DOMContentLoaded", function () {
  if (!Utils.get_from_localstorage("user")) {
    console.log("user not found");
    window.location.reload();
    window.location.href = "pages/login.html";
  }

  // Initialize Add Property modal
  const addPropertyModal = new bootstrap.Modal(
    document.getElementById("addPropertyModal")
  );

  // Open modal when Add Property button is clicked
  document
    .querySelector(".add-property-btn")
    .addEventListener("click", function () {
      addPropertyModal.show();
    });
});

$(document).ready(function () {
  FormValidation.validate(
    "#addPropertyForm",
    {
      title: {
        required: true,
        minlength: 5,
        maxlength: 100,
      },
      description: {
        required: true,
        minlength: 10,
        maxlength: 1000,
      },
      price: {
        required: true,
        min: 1,
        number: true,
      },
      type: {
        required: true,
      },
      bedrooms: {
        required: true,
        min: 0,
        number: true,
      },
      bathrooms: {
        required: true,
        min: 0.5,
        number: true,
      },
      area: {
        required: true,
        min: 1,
        number: true,
      },
      category: {
        required: true,
      },
      location: {
        required: true,
        minlength: 3,
        maxlength: 200,
      },
      images: {
        required: true,
      },
    },
    function (data) {
      console.log("data", data);
      RestClient.post(
        "properties",
        data,
        function (response) {
          toastr.success("Property Added");
          console.log("Property Added", response);
        },
        function (error) {
          console.log("error Add Property", error);

          toastr.error(error.responseText || "There is an Error");
        }
      );
    }
  );
  console.log("Document is ready!");
  console.log(document.getElementById("addPropertyForm"));
});

// Logout button functionality
document.getElementById("logout-btn").addEventListener("click", function () {
  // Clear user data from localStorage
  localStorage.removeItem("user");
  // Redirect to login page
  window.location.href = "pages/login.html";
  window.location.reload();
});

// Show/hide logout button based on login status
document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.getElementById("logout-btn");
  if (localStorage.getItem("user")) {
    logoutBtn.style.display = "block";
  } else {
    logoutBtn.style.display = "none";
  }
});
