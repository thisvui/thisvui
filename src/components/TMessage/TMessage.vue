<template>
  <article :id="id" :class="getClasses" v-if="!removed">
    <div :class="getHeaderClasses" v-if="showHeader">
      <p>{{ title }}</p>
      <button
        :class="getDeleteClasses"
        aria-label="delete"
        v-if="showDeleteButton"
        @click="removeElement"
      ></button>
    </div>
    <div :class="getBodyClasses">
      <div class="has-text-right" v-if="showDeleteButton && !showHeader">
        <button
          :class="getDeleteClasses"
          aria-label="delete"
          @click="removeElement"
        ></button>
      </div>
      <slot></slot>
    </div>
  </article>
</template>

<script>
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import TLevel from "../TLevel/TLevel";
import TLevelItem from "../TLevel/TLevelItem";

export default {
  name: "t-message",
  components: { TLevelItem, TLevel },
  mixins: [common, syntax, sizes, helper],
  props: {
    title: {
      type: String
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showDeleteButton: {
      type: Boolean,
      default: false
    },
    targetClass: {
      type: String
    },
    headerClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    deleteClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("message");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass("is-bold", this.isBold);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the message header container
     * @returns { A String with the chained css classes }
     */
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("message-header");
      cssArchitect.addClass(this.headerClass, this.headerClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the message body container
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("message-body");
      cssArchitect.addClass(this.bodyClass, this.bodyClass);
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
      removed: false
    };
  },
  methods: {
    removeElement() {
      this.removed = true;
    }
  }
};
</script>
