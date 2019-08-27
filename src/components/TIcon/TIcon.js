import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-icon",
  mixins: [common, syntax, sizes],
  props: {
    icon: {
      type: String,
      required: true
    },
    iconLib: {
      type: String
    },
    preserveDefaults: {
      type: Boolean,
      default: false
    },
    dataTooltip: {
      type: String
    },
    targetClass: {
      type: String
    },
    containerClass: {
      type: String
    },
    tooltipClass: {
      type: String
    },
    layerClass: {
      type: String
    }
  },
  data() {
    return {
      iconLibrary: ""
    };
  },
  computed: {
    isMd() {
      return "md" === this.iconLibrary;
    },
    /**
     * Dynamically build the css classes for the icon element when icon lib is not material design
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect(this.icon);
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("t-icon icon");
      this.colorize(cssArchitect, "color", true);
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass(this.getTooltipClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the tooltip element
     * @returns { A String with the chained css classes }
     */
    getTooltipClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("tooltip", this.dataTooltip !== undefined);
      cssArchitect.addClass(this.tooltipClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element when icon lib is material design
     * @returns { A String with the chained css classes }
     */
    getMaterialIconsClass: function() {
      const cssArchitect = new CssArchitect("material-icons");
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    /**
     * Determines what icon library to use based on global and local props
     */
    configureIconLib() {
      if (this.preserveDefaults) {
        this.iconLibrary = this.$thisvui.iconLib;
      } else {
        let parent = this.$parent;
        let pIconLib = parent && parent.$props ? parent.$props.iconLib : null;
        this.iconLibrary = this.iconLib
          ? this.iconLib
          : parent && pIconLib
          ? pIconLib
          : this.$thisvui.iconLib;
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "span", this.getContainerClass);
    root.setId(this.id);
    root.setKey(`${this.id}-${this.icon}`);
    root.addAttr("data-tooltip", this.dataTooltip);

    let icon = root.createElement("i");
    icon.addClass(this.isMd ? this.getMaterialIconsClass : this.getClasses);
    icon.innerHTML(this.icon, this.isMd);

    root.addChild(icon);
    return root.create();
  },
  mounted() {
    this.configureIconLib();
  }
};
