<template>
  <transition :name="this.transition" tag="span" mode="out-in">
    <article :id="id" :class="getClasses" v-if="!removed">
      <button
        :class="getDeleteClasses"
        aria-label="delete"
        v-if="showDeleteButton"
        @click="removeElement"
      ></button>
      <slot></slot>
    </article>
  </transition>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import TButton from "../TButton/TButton";
import display from "../../mixins/display";
import colors from "../../mixins/colors";

export default {
  name: "t-notification",
  components: { TButton },
  mixins: [common, display, colors, helper],
  props: {
    targetClass: {
      type: String
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    },
    deleteClass: {
      type: String
    },
    timeout: {
      type: Boolean,
      default: false
    },
    transition: {
      type: String,
      default: "fade"
    },
    delay: {
      type: Number,
      default: 3000
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("notification");
      this.colorize(cssArchitect, "bg-color", true);
      this.colorize(cssArchitect, "border-color");
      this.colorize(cssArchitect, "shadow");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getDisplayModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.targetClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the delete button
     * @returns { A String with the chained css classes }
     */
    getDeleteClasses: function() {
      const cssArchitect = new CssArchitect("delete");
      cssArchitect.addClass(this.deleteClass, this.deleteClass);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      removed: false,
      timer: null
    };
  },
  methods: {
    /**
     * Removes the notification element from the DOM
     */
    removeElement() {
      this.removed = true;
      clearTimeout(this.timer);
      this.$emit(this.$thisvui.events.notification.close);
    }
  },
  mounted() {
    if (this.timeout) {
      this.timer = setTimeout(
        function() {
          this.removeElement();
        }.bind(this),
        this.delay
      );
    }
  }
};
</script>
