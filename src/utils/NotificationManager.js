let showNotification = () => {};

const Notify = {
  // Setup the function that will trigger the notification
  register: (notifyFunc) => {
    showNotification = notifyFunc;
  },

  unsubscribe: () => {
    showNotification = () => {}; // Reset to an empty function
  },

  success: (message) => {
    showNotification(message, "success");
  },

  error: (message) => {
    showNotification(message, "error");
  },

  info: (message) => {
    showNotification(message, "info");
  },
};

export default Notify;
