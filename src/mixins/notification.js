import { NotificationBus } from "../components/TNotification/notification-bus";

export default {
  data() {
    return {
      scopes: new Map()
    };
  },
  computed: {
    isFormValid: function() {
      return this.formIsValid;
    }
  },
  methods: {
    addScope(key){
        if(key && !this.scopes.has(key)) {
          this.scopes.set(key, [])
        }
    },
    getScope(key){
      if(key){
        if(!this.scopes.has(key)){
          throw new Error(`Notification scope ${key} not found`)
        }
        return this.scopes.get(key)
      }
    },
    addNotification: function(notification) {
      let scope = notification.scope || "global"
      let notifications = this.getScope(scope)
      notifications.push(notification);
      NotificationBus.$emit(this.$thisvui.events.notification.added)
      NotificationBus.$emit(this.$thisvui.events.notification.updated)
    },
    removeNotification: function(notification) {
      let scope = notification.scope || "global"
      let notifications = this.getScope(scope)
      const index = notifications.indexOf(notification);
      if (index !== -1) {
        notifications.splice(index, 1);
      }
      NotificationBus.$emit(this.$thisvui.events.notification.removed)
      NotificationBus.$emit(this.$thisvui.events.notification.updated)
    },
    getType(params) {
      return params !== undefined && params.type !== undefined
        ? params.type
        : "info";
    },
    getInfinite(params) {
      return params !== undefined && params.infinite !== undefined
        ? params.infinite
        : true;
    },
    getTimeout(params) {
      return params !== undefined && params.timeout !== undefined
        ? params.timeout
        : 3000;
    },
    notify(message, params) {
      this.addNotification({
        text: message,
        type: this.getType(params),
        infinite: this.getInfinite(params),
        timeout: this.getTimeout(params),
        ...params
      });
    },
    success(message, params) {
      this.notify(message, { type: "success", ...params });
    },
    info(message, params) {
      this.notify(message, { type: "info", ...params });
    },
    warning(message, params) {
      this.notify(message, { type: "warning", ...params });
    },
    error(message, params) {
      this.notify(message, { type: "danger", ...params });
    }
  }
};
