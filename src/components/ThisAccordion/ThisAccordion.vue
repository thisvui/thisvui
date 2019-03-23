<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import syntax from "../../mixins/syntax";
import alignment from "../../mixins/alignment";
import sizes from "../../mixins/sizes";
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisAccordion",
  mixins: [common, syntax, alignment, sizes, helpers],
  props: {
    isBorderless: {
      type: [String, Boolean]
    },
    targetClass: {
      type: String,
      default: "is-primary"
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
      type: [Boolean, String],
      default: false
    },
    showIcon: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("this-accordion");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(
        "is-borderless",
        this.getBoolean(this.isBorderless)
      );
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
