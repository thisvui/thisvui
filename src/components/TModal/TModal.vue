<template>
  <transition name="fade">
    <div :id="id" class="modal is-active" v-show="showModal">
      <div class="modal-background" />
      <transition :name="animationType">
        <div :class="getClasses" v-show="showModal">
          <header :class="getHeaderClass">
            <p v-if="title != undefined" :class="getTitleClass">{{ title }}</p>
            <button
              v-if="showClose"
              class="delete"
              aria-label="close"
              @click="$emit(closeEvent)"
            />
          </header>
          <section :class="getBodyClass">
            <slot />
          </section>
          <footer :class="getFootClass" v-if="showFooter">
            <slot name="footer" />
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-modal",
  mixins: [common, sizes, colors],
  props: {
    title: {
      type: String
    },
    showModal: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    targetClass: {
      type: String
    },
    headerClass: {
      type: String
    },
    titleClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    footClass: {
      type: String
    },
    width: {
      type: String
    },
    animationType: {
      type: String,
      default: "fade"
    },
    closeEvent: {
      type: String,
      default: function() {
        return this.$thisvui.events.modal.close;
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("modal-card");
      cssArchitect.addClass(this.targetClass, this.targetClass);
      cssArchitect.addClass(this.width);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal header
     * @returns { A String with the chained css classes }
     */
    getHeaderClass: function() {
      const cssArchitect = new CssArchitect("modal-card-head");
      cssArchitect.addClass(this.headerClass, this.headerClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal header title
     * @returns { A String with the chained css classes }
     */
    getTitleClass: function() {
      const cssArchitect = new CssArchitect("modal-card-title");
      cssArchitect.addClass(this.titleClass, this.titleClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal body
     * @returns { A String with the chained css classes }
     */
    getBodyClass: function() {
      const cssArchitect = new CssArchitect("modal-card-body");
      cssArchitect.addClass(this.bodyClass, this.bodyClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the modal foot
     * @returns { A String with the chained css classes }
     */
    getFootClass: function() {
      const cssArchitect = new CssArchitect("modal-card-foot");
      cssArchitect.addClass(this.footClass, this.footClass);
      return cssArchitect.getClasses();
    }
  },
  methods: {}
};
</script>
