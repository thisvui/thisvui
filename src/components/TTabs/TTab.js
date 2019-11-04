import common from "../../mixins/common";

import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-tab",
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
      default: "tab-enter"
    },
    transitionNext: {
      type: String,
      default: "tab-leave"
    },
    stateless: Boolean
  },
  data() {
    return {
      isActive: this.selected,
      transitionClassName: null,
      parentProps: this.$parent.$props
    };
  },
  computed: {
    /**
     * Determines if icon must be shown. Check both the parent and child props
     * @returns { A boolean value }
     */
    isStateless: function() {
      let parentStateless = this.parentProps.stateless
        ? this.parentProps.stateless
        : false;
      let stateless = this.stateless ? this.stateless : parentStateless;
      return stateless;
    }
  },
  methods: {
    /**
     * Activate or deactivate tab pane based on the index. Also determines which transition class to use
     */
    activate(oldIndex, index, activate) {
      let tPrev = this.isStateless ? "slidePrev" : this.transitionPrev;
      let tNext = this.isStateless ? "slideNext" : this.transitionNext;
      this.transitionClassName = index < oldIndex ? tNext : tPrev;
      this.isActive = activate;
    }
  },
  render: function(h) {
    let addChild = this.isStateless ? this.isActive : true;
    let root = new ElementArchitect(h, "transition");
    root.setProps({ name: this.transitionClassName });

    let tab = root.createDiv("tab__pane");
    tab.setId(this.id).setChildren(this.$slots.default);

    tab.addDirective(
      {
        name: "display",
        value: {
          active: this.isActive,
          transitionClass: this.transitionClassName
        }
      },
      !this.isStateless
    );

    root.addChild(tab, addChild);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};
