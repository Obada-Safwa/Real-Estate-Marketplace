var RestClient = {
  get: (url, callback, error_callback) => {
    $.ajax({
      url: Constants.get_api_base_url() + url,
      type: "GET",
      beforeSend: (xhr) => {
        if (Utils.get_from_localstorage("user")) {
          xhr.setRequestHeader(
            "Authentication",
            Utils.get_from_localstorage("user").data.token
          );
        }
        if (Utils.get_from_localstorage("admin")) {
          xhr.setRequestHeader(
            "Authentication",
            Utils.get_from_localstorage("admin").data.token
          );
        }
      },
      success: (response) => {
        // if (!Utils.get_from_localstorage("user")) {
        //   Utils.loginModal();
        // }
        if (callback) callback(response);
      },
      error: (jqXHR, textStatus, errorThrown) => {
        // if (!Utils.get_from_localstorage("user")) {
        //   Utils.loginModal();
        // }

        if (error_callback) {
          error_callback(jqXHR);
        } else {
          // toastr.error(jqXHR.responseJSON.message);
          console.log("ERROR");
          console.error(jqXHR.responseJSON.message);
        }
      },
    });
  },
  request: (url, method, data, callback, error_callback) => {
    $.ajax({
      url: Constants.get_api_base_url() + url,
      type: method,
      data: data,
      beforeSend: (xhr) => {
        if (Utils.get_from_localstorage("user")) {
          xhr.setRequestHeader(
            "Authentication",
            Utils.get_from_localstorage("user").data.token
          );
        }
        if (Utils.get_from_localstorage("admin")) {
          xhr.setRequestHeader(
            "Authentication",
            Utils.get_from_localstorage("admin").data.token
          );
        }

        // if (
        //   !Utils.get_from_localstorage("user") &&
        //   window.location.href.includes("pages/login.html")
        // ) {
        //   console.log("for 1");
        //   window.location.reload();
        //   window.location.href = "../pages/login.html";
        // }
      },
    })
      .done((response, status, jqXHR) => {
        if (callback) callback(response);
        console.log("status", status);
        console.log("window", window.location);
        // Utils.set_to_localstorage("status", status);
        // window.location.reload();
        console.log("response DONE", response);
      })
      .fail((jqXHR, textStatus, errorThrown) => {
        // if (!Utils.get_from_localstorage("user")) {
        //
        // }
        if (error_callback) {
          error_callback(jqXHR, textStatus, errorThrown);
        } else {
          // toastr.error(jqXHR.responseJSON.message);
          console.error(jqXHR);
        }
      });
  },
  post: (url, data, callback, error_callback) => {
    RestClient.request(url, "POST", data, callback, error_callback);
  },
  delete: (url, data, callback, error_callback) => {
    RestClient.request(url, "DELETE", data, callback, error_callback);
  },
  put: (url, data, callback, error_callback) => {
    RestClient.request(url, "PUT", data, callback, error_callback);
  },
};
