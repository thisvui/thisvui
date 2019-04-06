<template>
  <transition :name="this.transition" tag="span">
    <article :id="id" :class="getClasses" v-if="!removed">
      <button
        :class="getDeleteClasses"
        aria-label="delete"
        v-if="getBoolean(showDeleteButton)"
        @click="removeElement"
      ></button>
      <slot></slot>
    </article>
  </transition>
</template>

<script>
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import TAction from "../TAction/TAction";

export default {
  name: "t-notification",
  components: { TAction },
  mixins: [common, syntax, sizes, helper],
  props: {
    targetClass: {
      type: String
    },
    showDeleteButton: {
      type: [Boolean, String],
      default: false
    },
    deleteClass: {
      type: String
    },
    timeout: {
      type: [Boolean, String],
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
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass("is-bold", this.getBoolean(this.isBold));

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
      this.$emit("close-notification");
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
