$(document).ready(function () {
  // $("main#spapp > section").height($(document).height() - 60);

  var app = $.spapp({
    defaultView: "#main",
    templateDir: "./frontend/pages/",
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
  });
  app.route({
    view: "propertydetails",
    load: "propertydetails.html",
  });
  // run app
  app.run();
});
