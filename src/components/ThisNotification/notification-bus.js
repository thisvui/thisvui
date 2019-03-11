import Vue from "vue";

export const NotificationBus = new Vue({
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    isFormValid: function() {
      return this.formIsValid;
    }
  },
  methods: {
    addNotification: function(notification) {
      this.notifications.push(notification);
    },
    removeNotification: function(notification) {
      const index = this.notifications.indexOf(notification);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    getTimeout(params) {
      return params !== undefined && params.timeout !== undefined
        ? params.timeout
        : true;
    },
    getDelay(params) {
      return params !== undefined && params.delay !== undefined
        ? params.delay
        : 3000;
    },
    showNotification(message, type, params) {
      this.addNotification({
        text: message,
        class: type,
        timeout: this.getTimeout(params),
        delay: this.getDelay(params)
      });
    },
    showSuccessMessage(message, params) {
      this.addNotification({
        text: message,
        success: true,
        timeout: this.getTimeout(params),
        delay: this.getDelay(params)
      });
    },
    showInfoMessage(message, params) {
      this.addNotification({
        text: message,
        info: true,
        timeout: this.getTimeout(params),
        delay: this.getDelay(params)
      });
    },
    showWarningMessage(message, params) {
      this.addNotification({
        text: message,
        warning: true,
        timeout: this.getTimeout(params),
        delay: this.getDelay(params)
      });
    },
    showErrorMessage(message, params) {
      this.addNotification({
        text: message,
        danger: true,
        timeout: this.getTimeout(params),
        delay: this.getDelay(params)
      });
    }
  }
});
