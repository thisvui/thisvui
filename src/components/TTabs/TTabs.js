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
    isToggle: {
      type: Boolean
    },
    isToggleRounded: {
      type: Boolean
    },
    isBorderless: {
      type: Boolean
    },
    isBoxed: {
      type: Boolean
    },
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
      const cssArchitect = new CssArchitect("tabs");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass("is-boxed", this.isBoxed);
      cssArchitect.addClass("is-toggle", this.isToggle);
      cssArchitect.addClass(
        "is-toggle is-toggle-rounded",
        this.isToggleRounded
      );
      cssArchitect.addClass("is-borderless", this.isBorderless);
      cssArchitect.addClass(this.targetClass);
      this.setupColorModifier(cssArchitect);
      cssArchitect.addClass("is-primary", !this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the tabs body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("tabs-body");
      cssArchitect.addClass("is-borderless", this.isBorderless);
      cssArchitect.addClass("is-clipped");
      cssArchitect.addClass(this.getSizesModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClasses: function() {
      const cssArchitect = new CssArchitect("tabs-container");
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the link items
     * @returns { A String with the chained css classes }
     */
    getLinkClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.activeClass);
      return cssArchitect.getClasses();
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
    selectTab(index) {
      if (this.activeTabIndex === index) return;

      if (this.activeTabIndex < this.tabs.length) {
        this.tabs[this.activeTabIndex].activate(
          this.activeTabIndex,
          index,
          false
        );
      }
      this.tabs[index].activate(this.activeTabIndex, index, true);
      this.activeTabIndex = index;
      this.configSlider();
      this.$emit(this.$thisvui.events.common.change, index);
    },
    configSlider() {
      let ref = `${this.id}${this.activeTabIndex}`;
      let currentLi = this.$refs[ref][0];
      let borderWidth =
        this.isBoxed || this.isToggle || this.isToggleRounded ? 2 : 0;
      this.sliderWidth = currentLi.scrollWidth + borderWidth;
      this.sliderLeft = currentLi.offsetLeft;
    },
    /**
     * Creates the tabs slider
     * @param architect
     */
    createSlider(architect) {
      let tabSliderWrapper = architect.createDiv(
        "tab-slider-wrapper is-absolute"
      );
      let tabSlider = architect.createSpan("tab-slider");
      let css = new CssArchitect();
      css.addStyle("width", `${this.sliderWidth}px`);
      css.addStyle("left", `${this.sliderLeft}px`);
      tabSlider.setStyles(css.getStyles());
      tabSliderWrapper.addChild(tabSlider);
      architect.addChild(tabSliderWrapper);
    },
    /**
     * Creates the tab items
     * @param architect
     */
    createItems(architect) {
      let items = architect.createUl();
      for (let index in this.tabs) {
        let tab = this.tabs[index];

        let item = architect.createLi();
        item.addClass("is-tab-active", tab.isActive);
        item.setKey(`${this.id}${index}`);

        let link = architect.createA();
        link.addClass(this.getLinkClasses, tab.isActive);
        link.setRef(`${this.id}${index}`, true);
        link.addClick(() => {
          this.selectTab(index);
        });

        if (tab.icon) {
          let iconContainer = architect.createSpan(
            this.getIconContainerClasses
          );
          let icon = architect.createIcon(this.iconClass);
          icon.addClass("icon", tab.isActive);
          icon.addClass(`icon ${tab.iconClass}`, !tab.isActive);
          icon.setProps({
            icon: this.tab.icon,
            iconLib: this.iconLib,
            preserveDefaults: !this.overrideDefaults
          });
          iconContainer.addChild(icon);
          link.addChild(iconContainer);
        }

        if (tab.name) {
          let name = architect.createSpan();
          name.innerHTML(tab.name);
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
      this.configSlider();
    });
    this.includeBgModifiers = false;
  }
};
