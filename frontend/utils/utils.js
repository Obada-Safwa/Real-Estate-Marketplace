const Utils = {
  get_from_localstorage: (key) => {
    return JSON.parse(window.localStorage.getItem(key));
  },
  set_to_localstorage: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  get_from_sessionstorage: (key) => {
    return JSON.parse(window.sessionStorage.getItem(key));
  },
  set_to_sessionstorage: (key, value) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
};
