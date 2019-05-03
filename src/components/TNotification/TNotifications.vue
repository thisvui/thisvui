<template>
  <div :id="id" class="notifications">
    <t-notification
      v-for="(notification, index) in notifications"
      @close-notification="removeNotification(notification)"
      show-delete-button
      :key="`Notification${index}`"
      :is-warning="notification.warning"
      :is-info="notification.info"
      :is-success="notification.success"
      :is-danger="notification.danger"
      :is-primary="notification.primary"
      :timeout="notification.timeout"
      :delay="notification.delay"
      :class="notification.class"
      transition="fade"
    >
      <p class="has-text-weight-bold">{{ notification.text }}</p>
    </t-notification>
  </div>
</template>

<script>
import { NotificationBus } from "./notification-bus";
import TNotification from "./TNotification";
import common from "../../mixins/common";

export default {
  name: "t-notifications",
  mixins: [common],
  components: {
    TNotification,
    Notification
  },
  data() {
    return {
      notifications: NotificationBus.notifications
    };
  },
  methods: {
    /**
     * Removes a notification from the Notification Bus
     */
    removeNotification: function(notification) {
      NotificationBus.removeNotification(notification);
    }
  }
};
</script>
