var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/Real-Estate-Marketplace/backend/";
    } else {
      return "https://backendrealestate-gcv2b.ondigitalocean.app/";
    }
  },
};
