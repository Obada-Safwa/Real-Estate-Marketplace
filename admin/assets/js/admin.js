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

// Load properties data
function loadPropertiesData() {
  // Fetch properties data from API
  // This is a placeholder - replace with actual API call
  console.log("Loading properties data");

  // Simulate API response for demonstration
  setTimeout(function () {
    const demoProperties = [
      {
        id: 1,
        title: "Modern Apartment in City Center",
        price: "$250,000",
        location: "New York",
        status: "Active",
        date: "2025-05-01",
      },
      {
        id: 2,
        title: "Suburban Family Home",
        price: "$450,000",
        location: "Los Angeles",
        status: "Pending",
        date: "2025-04-28",
      },
      {
        id: 3,
        title: "Beach House with Ocean View",
        price: "$1,200,000",
        location: "Miami",
        status: "Active",
        date: "2025-05-02",
      },
      {
        id: 4,
        title: "Downtown Condo",
        price: "$350,000",
        location: "Chicago",
        status: "Sold",
        date: "2025-04-15",
      },
      {
        id: 5,
        title: "Country Estate",
        price: "$780,000",
        location: "Dallas",
        status: "Active",
        date: "2025-04-30",
      },
    ];

    renderPropertiesTable(demoProperties);
  }, 500);
}

// Render properties table
function renderPropertiesTable(properties) {
  const tableBody = $("#propertiesTableBody");
  if (!tableBody.length) return;

  tableBody.empty();

  properties.forEach((property) => {
    let statusClass = "bg-success";
    if (property.status === "Pending") statusClass = "bg-warning";
    if (property.status === "Sold") statusClass = "bg-secondary";

    tableBody.append(`
            <tr>
                <td>${property.id}</td>
                <td>${property.title}</td>
                <td>${property.price}</td>
                <td>${property.location}</td>
                <td><span class="status-badge ${statusClass}">${property.status}</span></td>
                <td>${property.date}</td>
                <td>
                    <a href="#" class="action-btn action-btn-view" data-bs-toggle="tooltip" title="View">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="#" class="action-btn action-btn-edit" data-bs-toggle="tooltip" title="Edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="#" class="action-btn action-btn-delete" data-bs-toggle="tooltip" title="Delete">
                        <i class="fas fa-trash"></i>
                    </a>
                </td>
            </tr>
        `);
  });

  // Reinitialize tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Load users data
function loadUsersData() {
  // Fetch users data from API
  // This is a placeholder - replace with actual API call
  console.log("Loading users data");

  // Simulate API response for demonstration
  setTimeout(function () {
    const demoUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2025-05-08",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Agent",
        status: "Active",
        lastLogin: "2025-05-07",
      },
      {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        role: "User",
        status: "Inactive",
        lastLogin: "2025-04-30",
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        role: "Agent",
        status: "Active",
        lastLogin: "2025-05-08",
      },
      {
        id: 5,
        name: "Michael Wilson",
        email: "michael@example.com",
        role: "User",
        status: "Active",
        lastLogin: "2025-05-05",
      },
    ];

    renderUsersTable(demoUsers);
  }, 500);
}

// Render users table
function renderUsersTable(users) {
  const tableBody = $("#usersTableBody");
  if (!tableBody.length) return;

  tableBody.empty();

  users.forEach((user) => {
    let statusClass = "bg-success";
    if (user.status === "Inactive") statusClass = "bg-secondary";

    tableBody.append(`
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="status-badge ${statusClass}">${user.status}</span></td>
                <td>${user.lastLogin}</td>
                <td>
                    <a href="#" class="action-btn action-btn-view" data-bs-toggle="tooltip" title="View">
                        <i class="fas fa-eye"></i>
                    </a>
                    <a href="#" class="action-btn action-btn-edit" data-bs-toggle="tooltip" title="Edit">
                        <i class="fas fa-edit"></i>
                    </a>
                    <a href="#" class="action-btn action-btn-delete" data-bs-toggle="tooltip" title="Delete">
                        <i class="fas fa-trash"></i>
                    </a>
                </td>
            </tr>
        `);
  });

  // Reinitialize tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}
