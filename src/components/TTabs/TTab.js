import common from "../../mixins/common";
import { ComponentNames } from "../../utils/constants";

import { createTransition } from "../../utils/element-architect";

export default {
  name: ComponentNames.TTab,
  mixins: [common],
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String
    },
    selected: {
      default: false
    },
    transitionPrev: {
      type: String,
      default: "slidePrev"
    },
    transitionNext: {
      type: String,
      default: "slideNext"
    }
  },
  data() {
    return {
      isActive: this.selected,
      transitionClassName: null
    };
  },
  methods: {
    /**
     * Activate or deactivate tab pane based on the index. Also determines which transition class to use
     */
    activate(oldIndex, index, activate) {
      this.transitionClassName =
        index < oldIndex ? this.transitionNext : this.transitionPrev;
      this.isActive = activate;
    }
  },
  render: function(h) {
    let root = createTransition(h, this.transitionClassName);

    let tab = root.createDiv(`${ComponentNames.TTab}__pane`);
    tab.setId(this.id).setChildren(this.$slots.default);

    root.addChild(tab, this.isActive);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};
