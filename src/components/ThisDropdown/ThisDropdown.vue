<template>
  <div :id="id" ref="dropdown" :class="getClasses">
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click="toggleActive"
      >
        <span>{{ text }}</span>
        <span class="icon is-small">
          <i :class="icon" aria-hidden="true"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import alignment from "../../mixins/alignment";
import sizes from "../../mixins/sizes";
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import ThisImage from "../ThisImage/ThisImage";
import CssArchitect from "../../utils/css-architect";
import ThisIcon from "../ThisIcon/ThisIcon";

export default {
  name: "ThisDropdown",
  mixins: [common, alignment, sizes, helpers],
  components: { ThisIcon, ThisImage },
  props: {
    text: {
      type: String
    },
    icon: {
      type: String,
      default: "fas fa-angle-down"
    },
    isUp: {
      type: [Boolean, String],
      default: false
    },
    isHoverable: {
      type: [Boolean, String],
      default: false
    },
    isActive: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      isDropdownActive: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("dropdown");
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass("is-up", this.getBoolean(this.isUp));
      cssArchitect.addClass("is-hoverable", this.getBoolean(this.isHoverable));
      cssArchitect.addClass(
        "is-active",
        this.isActive || this.isDropdownActive
      );
      return cssArchitect.getClasses();
    }
  },
  methods: {
    toggleActive() {
      if (!this.isHoverable && !this.isActive) {
        this.isDropdownActive = !this.isDropdownActive;
      }
    }
  }
};
</script>
