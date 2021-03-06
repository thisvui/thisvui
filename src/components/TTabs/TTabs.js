import alignment from "../../mixins/alignment";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import TIcon from "../TIcon/TIcon";
import colors from "../../mixins/colors";
import icons from "../../mixins/icons";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-tabs",
  components: { TIcon },
  mixins: [common, colors, alignment, sizes, icons],
  props: {
    selected: Number,
    borderless: {
      type: Boolean
    },
    fullwidth: Boolean,
    targetClass: {
      type: String
    },
    activeClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("tabs");
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass("borderless", this.borderless);
      css.addClass(this.targetClass);
      this.setupColorModifier(css);
      css.addClass("is-primary", !this.hasColorModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the tabs heading
     * @returns { A String with the chained css classes }
     */
    getHeadingClasses: function() {
      const css = new CssArchitect("tabs__heading");
      let colorModifier = this.hasColorModifier ? this.colorModifier : "is-primary";
      this.borderedElement(css);
      css.addClass(colorModifier);
      css.addClass("borderless", this.borderless);
      css.addClass(this.getAlignmentModifiers);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the tabs heading item
     * @returns { A String with the chained css classes }
     */
    getItemClasses: function() {
      let colorModifier = this.hasColorModifier ? this.colorModifier : "is-primary";
      const css = new CssArchitect("tabs__item");
      css.addClass("borderless", this.borderless);
      css.addClass("fullwidth", this.fullwidth);
      this.filled(css, { hoverable : true })
      css.addClass(colorModifier);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the slider element
     * @returns { A String with the chained css classes }
     */
    getSliderClasses: function() {
      let colorModifier = this.hasColorModifier ? this.colorModifier : "is-primary";
      const css = new CssArchitect("tab__slider");
      this.filled(css, { inverted : true })
      this.alpha(css, { bg : 0.7 })
      css.addClass(colorModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the tabs body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      let colorModifier = this.hasColorModifier ? this.colorModifier : "is-primary";
      const css = new CssArchitect("tabs__body");
      this.borderedElement(css);
      css.addClass(colorModifier);
      css.addClass("borderless", this.borderless);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    getBodyStyles: function() {
      const css = new CssArchitect();
      this.alpha(css, { border : 0.7 });
      return css.getStyles();
    },
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClasses: function() {
      const css = new CssArchitect("tabs__container");
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the link items
     * @returns { A String with the chained css classes }
     */
    getLinkClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.activeClass);
      return css.getClasses();
    }
  },
  data() {
    return {
      tabs: [],
      activeTabIndex: this.selected || 0,
      sliderWidth: 0,
      sliderLeft: 0
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab($index, init = false) {
      if (this.activeTabIndex === $index && !init) {
        return;
      }

      if (this.activeTabIndex < this.tabs.length) {
        this.tabs[this.activeTabIndex].activate(
          this.activeTabIndex,
          $index,
          false
        );
      }
      this.tabs[$index].activate(this.activeTabIndex, $index, true);
      this.activeTabIndex = $index;
      this.configSlider();
      this.$emit(this.$thisvui.events.common.change, $index);
    },
    configSlider(timeout = 0) {
      setTimeout(() => {
        let ref = `${this.id}${this.activeTabIndex}`;
        let currentItem = this.$refs[ref][0];
        let borderWidth = 0;
        this.sliderWidth = currentItem.scrollWidth + borderWidth;
        this.sliderLeft = currentItem.offsetLeft;
      }, timeout);
    },
    getSliderStyles: function() {
      const css = new CssArchitect();
      this.alpha(css, { bg : 0.7 });
      css.addStyle("width", `${this.sliderWidth}px`);
      css.addStyle("left", `${this.sliderLeft}px`);
      return css.getStyles();
    },
    /**
     * Creates the tabs slider
     * @param architect
     */
    createSlider(architect) {
      let tabSliderWrapper = architect.createDiv(
        "tab__slider--wrapper is-absolute"
      );
      let tabSlider = architect.createSpan(this.getSliderClasses);
      tabSlider.setStyles(this.getSliderStyles());
      tabSliderWrapper.addChild(tabSlider);
      architect.addChild(tabSliderWrapper);
    },
    /**
     * Creates the tab items
     * @param architect
     */
    createItems(architect) {
      let items = architect.createDiv(this.getHeadingClasses);
      for (let $index in this.tabs) {
        let $tab = this.tabs[$index];
        let $activeClass = $tab.isActive ? "active" : "inactive"

        let item = architect.createDiv(this.getItemClasses);
        item.addClass($activeClass);
        item.setKey(`${this.id}${$index}`);
        item.setRef(`${this.id}${$index}`, true);

        let link = architect.createA();
        link.addClass(this.getLinkClasses, $tab.isActive);
        link.addClick(() => {
          this.selectTab($index);
        });

        if ($tab.icon) {
          let iconContainer = architect.createSpan(
            this.getIconContainerClasses
          );
          let icon = architect.createIcon(this.iconClass);
          icon.addClass("icon", $tab.isActive);
          icon.addClass(`icon ${$tab.iconClass}`, !$tab.isActive);
          icon.setProps({
            icon: this.tab.icon,
            iconLib: this.iconLib,
            preserveDefaults: !this.overrideDefaults
          });
          iconContainer.addChild(icon);
          link.addChild(iconContainer);
        }

        if ($tab.name) {
          let name = architect.createSpan();
          name.innerHTML($tab.name);
          link.addChild(name);
        }

        item.addChild(link);
        items.addChild(item);
      }
      architect.addChild(items);
    },
    /**
     * Creates the tabs body
     * @param architect
     */
    createBody(architect) {
      let body = architect.createDiv(this.getBodyClasses);
      body.setStyles(this.getBodyStyles);
      body.setChildren(this.$slots.default);
      architect.addChild(body);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClasses);

    let tabsHeader = root.createDiv(this.getClasses);
    tabsHeader.setId(this.id);

    this.createSlider(tabsHeader);
    this.createItems(tabsHeader);
    root.addChild(tabsHeader);
    this.createBody(root);

    return root.create();
  },
  mounted() {
    if (this.activeTabIndex < this.tabs.length) {
      this.tabs[this.activeTabIndex].isActive = true;
    }
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this.configSlider(700);
    });
    this.includeBgModifiers = false;
  }
};
