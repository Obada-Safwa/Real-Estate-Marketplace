// Admin Dashboard Main JavaScript
$(document).ready(function () {
  // Initialize SPA
  var app = $.spapp({
    defaultView: "#dashboard",
    templateDir: "./pages/",
    pageNotFound: "404.html",
  });

  // Define routes in the same format as in frontend/assets/js/custom.js
  app.route({
    view: "dashboard", // No # prefix in the route definition
    load: "dashboard.html",
    onCreate: function () {
      console.log("Dashboard view created");
    },
    onReady: function () {
      console.log("Dashboard view loaded");
      initDashboardCharts();
    },
  });

  app.route({
    view: "properties", // No # prefix in the route definition
    load: "properties.html",
    onCreate: function () {
      console.log("Properties view created");
    },
    onReady: function () {
      console.log("Properties view loaded");
      loadPropertiesData();
    },
  });

  app.route({
    view: "users", // No # prefix in the route definition
    load: "users.html",
    onCreate: function () {
      console.log("Users view created");
    },
    onReady: function () {
      console.log("Users view loaded");
      loadUsersData();
    },
  });

  app.route({
    view: "settings", // No # prefix in the route definition
    load: "settings.html",
    onCreate: function () {
      console.log("Settings view created");
    },
    onReady: function () {
      console.log("Settings view loaded");
    },
  });

  // Run the app
  app.run();

  // Toggle sidebar on mobile
  $("#sidebarToggle").on("click", function () {
    $("#sidebar").toggleClass("show");
  });

  // Make sidebar links active based on current page
  $(".sidebar .nav-link").on("click", function () {
    $(".sidebar .nav-link").removeClass("active");
    $(this).addClass("active");

    // Hide sidebar on mobile after clicking a link
    if (window.innerWidth < 768) {
      $("#sidebar").removeClass("show");
    }
  });

  // Tooltip initialization
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Show spinner when loading content
  $(document).on("spapp:viewChange", function () {
    $("#spinner").addClass("show");
    setTimeout(function () {
      $("#spinner").removeClass("show");
    }, 500);
  });
});

// Initialize dashboard charts (placeholder)
function initDashboardCharts() {
  // This is a placeholder for chart initialization
  // We would use Chart.js or similar library to create charts
  console.log("Dashboard charts would be initialized here");

  // Simulate data for demonstration purposes
  updateDashboardStats({
    totalProperties: 145,
    totalUsers: 312,
    pendingApprovals: 8,
    recentSales: 24,
  });
}

// Update dashboard statistics
function updateDashboardStats(data) {
  $("#totalProperties").text(data.totalProperties);
  $("#totalUsers").text(data.totalUsers);
  $("#pendingApprovals").text(data.pendingApprovals);
  $("#recentSales").text(data.recentSales);
}
