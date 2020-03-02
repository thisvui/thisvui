import alignment from "../../mixins/alignment";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import margin from "../../mixins/margin";
import padding from "../../mixins/padding";
import sizes from "../../mixins/sizes";
import themes from "../../mixins/themes";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-tabs",
  mixins: [common, themes, alignment, padding, margin, sizes, icons],
  props: {
    selected: Number,
    filled: Boolean,
    transparent: Boolean,
    shadowless: Boolean,
    fullwidth: Boolean,
    targetClass: String,
    activeClass: String
  },
  data() {
    return {
      tabs: [],
      activeTabIndex: this.selected || 0,
      sliderWidth: 0,
      sliderLeft: 0,
      switching: false
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("tabs");
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.targetClass);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the tabs heading
     * @returns { A String with the chained css classes }
     */
    getHeadingClasses: function() {
      const css = new CssArchitect("tabs__heading");
      this.isFilled(css, { active: this.filled });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.getAlignmentModifiers);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the slider element
     * @returns { A String with the chained css classes }
     */
    getSliderClasses: function() {
      const css = new CssArchitect("tab__slider");
      this.isFilled(css, { inverted: !this.transparent });
      this.alpha(css, { bg: 0.7 });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the tabs body
     * @returns { A String with the chained css classes }
     */
    bodyCss: function() {
      const css = new CssArchitect("tabs__body");
      this.alpha(css, { border: 0.7 });
      css.addClass(this.getSizesModifiers);
      css.addStyles([this.getPaddingStyles]);
      return css;
    },
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    containerCss: function() {
      const css = new CssArchitect("tabs__container");
      css.addClass("shadowless", this.shadowless);
      css.addStyles([this.getMarginStyles]);
      return css;
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
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab($index, init = false) {
      if (this.activeTabIndex === $index && !init) {
        return;
      }
      this.switching = true;
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
      setTimeout(() => {
        this.switching = false;
      }, 370);
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
      this.alpha(css, { bg: 0.7 });
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
     * Creates the tab icon
     */
    createIcon(architect, $icon) {
      if ($icon) {
        let md = "md" === this.iconLibrary;
        let iconContainer = architect.createSpan("icon medium");
        let icon = architect.createElement("i");
        icon.addClass($icon, !md);
        icon.innerHTML($icon, md);
        icon.setProps({
          icon: $icon,
          iconLib: this.iconLib,
          preserveDefaults: !this.overrideDefaults
        });
        iconContainer.addChild(icon);
        architect.addChild(iconContainer);
      }
    },
    /**
     * Dynamically build the css classes for the tabs heading item
     * @returns { A String with the chained css classes }
     */
    getItemClasses: function(active) {
      const css = new CssArchitect("tabs__item");
      let config = {
        hoverable: true
      };

      if (this.filled) {
        config.tint = active ? 40 : false;
        config.active = active && !this.transparent;
      }

      if (!this.filled) {
        config.tint = active ? false : 30;
        config.shade = active ? 5 : false;
        config.active = !this.transparent;
      }

      this.isFilled(css, config);
      this.isColored(css, { active: this.transparent });
      css.addClass("fullwidth", this.fullwidth);
      css.addClass("ripple");
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getAlignmentModifiers);
      return css;
    },
    /**
     * Creates the tab items
     * @param architect
     */
    createItems(architect) {
      let items = architect.createDiv(this.getHeadingClasses);
      for (let $index in this.tabs) {
        let $tab = this.tabs[$index];
        let $activeClass = $tab.isActive ? "active" : "inactive";

        let itemCss = this.getItemClasses($tab.isActive);
        let item = architect.createDiv(itemCss.getClasses());
        item.addClass($activeClass);
        item.setKey(`${this.id}${$index}`);
        item.setRef(`${this.id}${$index}`, true);

        let link = architect.createA();
        link.addClass(this.getLinkClasses, $tab.isActive);
        link.addClick(() => {
          this.selectTab($index);
        });

        this.createIcon(link, $tab.icon);

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
      let body = architect.createDiv(this.bodyCss.getClasses());
      body.addClass("switching", this.switching);
      body.setStyles(this.bodyCss.getStyles());
      body.setChildren(this.$slots.default);
      architect.addChild(body);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.containerCss.getClasses());
    root.setStyles(this.containerCss.getStyles());

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
