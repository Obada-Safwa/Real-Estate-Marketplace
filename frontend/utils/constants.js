var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/Real-Estate-Marketplace/backend/";
    } else {
      return "https://walrus-app-dere7.ondigitalocean.app/Real-Estate-Marketplace/backend/";
    }
  },
};
