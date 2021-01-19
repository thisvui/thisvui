import { ComponentNames } from "../../utils/constants";
import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TExpand,
  props: {
    expanded: Boolean,
    duration: {
      type: Number,
      default: 500
    },
    containerClass: {
      type: String
    }
  },
  data: () => ({
    css: new CssArchitect(),
    initial: false,
    hidden: false
  }),
  watch: {
    expanded() {
      this.toggle();
    }
  },
  render: function(h) {
    let root = createDiv(h);
    root.addClass(this.containerClass, this.containerClass !== undefined);
    root.setRef("expandContainer");
    root.setProps({ name: "expand" });
    root.setAttrs(this.attrs);
    root.setStyles(this.css.getStyles());
    root.addEvent("transitionend", this.onTransitionEnd);
    root.setChildren(this.$slots.default);
    return root.create();
  },
  mounted() {
    this.toggle();
    this.initialized = true;
  },

  created() {
    this.hidden = !this.expanded;
  },

  computed: {
    el() {
      return this.$refs.expandContainer;
    },

    attrs() {
      const attrs = {
        "aria-hidden": !this.expanded,
        "aria-expanded": this.expanded
      };

      return attrs;
    }
  },
  methods: {
    toggle() {
      if (this.expanded) {
        this.hidden = false;
        this.$emit("expand-start");
        if (this.initialized) {
          this.calculateHeight();
        }
      } else {
        this.$emit("collapse-start");
        this.calculateHeight();
      }
    },

    update(callback) {
      if (!this.initialized) {
        callback();
      } else {
        this.$nextTick(callback);
      }
    },

    calculateHeight() {
      let initial = this.expanded ? 0 : this.el.scrollHeight;
      this.css.addStyle("height", `${initial}px`);

      this.update(() => {
        let height = this.expanded ? this.el.scrollHeight : 0;
        this.css.addStyle("height", `${height}px`);
        this.css.addStyle("overflow", "hidden");
        this.css.addStyle("transition-property", "height");
        this.css.addStyle("transition-duration", `${this.duration}ms`);
      });
    },

    onTransitionEnd(event) {
      if (event.target !== this.el) {
        return;
      }
      this.$emit(this.expanded ? "expand-end" : "collapse-end");
    }
  }
};
