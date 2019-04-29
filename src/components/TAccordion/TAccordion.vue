<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import CssArchitect from "../../utils/css-architect";
import colors from "../../mixins/colors";

export default {
  name: "t-accordion",
  mixins: [common, icons, colors, helpers],
  props: {
    isBorderless: {
      type: Boolean
    },
    targetClass: {
      type: String
    },
    iconClass: {
      type: String
    },
    icon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.add;
      }
    },
    collapsedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.cancel;
      }
    },
    remainOpen: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-accordion");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("is-borderless", this.isBorderless);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    this.items = this.$children;
    this.$on("close-others", id => {
      this.closeInactiveItems(id);
    });
  },
  methods: {
    closeInactiveItems(id) {
      if (!this.remainOpen) {
        this.items.forEach(function(item) {
          item.isItemOpen = item.id === id;
        });
      }
    }
  }
};
</script>
