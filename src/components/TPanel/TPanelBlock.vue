<template>
  <div :class="getClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: "t-panel-block",
  props: {
    display: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      let panelBlockClass = "panel-block ";
      if (this.display !== undefined) {
        panelBlockClass += this.display;
      }
      return panelBlockClass.trim();
    }
  }
};
</script>
