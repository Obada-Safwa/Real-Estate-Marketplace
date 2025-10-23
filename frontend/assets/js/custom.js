$(document).ready(function () {
  // $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({
    defaultView: "#main",
    templateDir: "./pages/",
  }); // initialize
  app.route({
    view: "main",
    load: "main.html",
  });
  app.route({
    view: "about",
    load: "about.html",
  });
  app.route({
    view: "properties",
    load: "properties.html",
    onCreate: function () {},
    onReady: function () {
      PropertiesServices.filterInit();
    },
  });
  app.route({
    view: "service",
    load: "service.html",
    onCreate: function () {
      console.log("Service view created");
    },
    onReady: function () {
      // Load properties and reports for this user
      getProperties();
      getPropertiesWithReport();

      // Attach delete listener after the content is loaded
      const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
      if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener("click", confirmDeleteProperty);
      } else {
        console.error("confirmDeleteBtn element not found!");
      }

      console.log("Service view loaded");
    },
  });
  app.route({
    view: "propertydetails",
    load: "propertydetails.html",
  });
  // run app
  app.run();
});
