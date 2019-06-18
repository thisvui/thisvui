//
//
// <template>
//   <div :id="id" :class="getClasses">
//     <slot></slot>
//     <!-- Left side -->
//     <div v-if="!suppressLr" :class="getLeftClasses">
//       <slot name="level-left"></slot>
//     </div>
//     <!-- Right side -->
//     <div v-if="!suppressLr" :class="getRightClasses">
//       <slot name="level-right"></slot>
//     </div>
//   </div>
// </template>
//
// <script>
import responsive from "../../mixins/responsive";
import common from "../../mixins/common";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-level",
  mixins: [common, responsive, background],
  props: {
    suppressLr: {
      type: Boolean
    },
    leftClass: String,
    rightClass: String
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("level");
      cssArchitect.addClass(this.getResponsiveModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    },
    getLeftClasses: function() {
      const cssArchitect = new CssArchitect("level-left");
      cssArchitect.addClass(this.leftClass, this.leftClass !== undefined);
      return cssArchitect.getClasses();
    },
    getRightClasses: function() {
      const cssArchitect = new CssArchitect("level-right");
      cssArchitect.addClass(this.rightClass, this.rightClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);

    // Creating the head element
    let left = root.createDiv(this.getLeftClasses);
    left.setSlot("level-left").setChildren(this.$slots["level-left"]);

    // Creating the head element
    let right = root.createDiv(this.getRightClasses);
    right.setSlot("level-right").setChildren(this.$slots["level-right"]);

    root.setChildren(this.$slots.default);
    root.addChild(left, !this.suppressLr); // only if head slot is present
    root.addChild(right, !this.suppressLr); // only if foot slot is present
    return root.create();
  }
};
