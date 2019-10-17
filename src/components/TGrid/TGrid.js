import common from "../../mixins/common";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-grid",
  mixins: [common, background],
  props: {
    auto: Boolean,
    inline: Boolean,
    flex: Boolean,
    flexBasis: Number,
    columns: Number,
    rows: Number,
    autoUnit: {
      type: String,
      default: "1fr"
    },
    grid: String,
    template: String,
    templateColumns: String,
    templateRows: String,
    templateAreas: String,
    columnGap: String,
    rowGap: String,
    gap: String,
    justifyItems: String,
    alignItems: String,
    placeItems: String,
    justifyContent: String,
    alignContent: String,
    placeContent: String,
    autoColumns: String,
    autoRows: String,
    autoFlow: String
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    /**
     * Dynamically build the css classes and styles for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect("grid");
      // Classes
      css.addClass("auto", this.auto);
      css.addClass("inline", this.inline);
      css.addClass("flex", this.flex);
      css.addClass(this.getBackgroundModifiers);

      // Styles
      css.addStyle("flex-basis", css.addPercent(this.flexBasis), this.isNotNull(this.flexBasis));
      css.addStyle("grid", this.grid, this.isNotNull(this.grid));
      css.addStyle("grid-template", this.template, this.isNotNull(this.template));
      css.addStyle("grid-template-columns", this.templateColumns, this.isNotNull(this.templateColumns));
      css.addStyle("grid-template-rows", this.templateRows, this.isNotNull(this.templateRows));
      css.addStyle("grid-template-areas", this.templateAreas, this.isNotNull(this.templateAreas));
      css.addStyle("grid-auto-columns", this.autoColumns, this.isNotNull(this.autoColumns));
      css.addStyle("grid-auto-rows", this.autoRows, this.isNotNull(this.autoRows));
      css.addStyle("grid-auto-flow", this.autoFlow, this.isNotNull(this.autoFlow));

      // Gap
      css.addStyle("grid-gap", this.gap, this.isNotNull(this.gap));
      css.addStyle("grid-column-gap", this.columnGap, this.isNotNull(this.columnGap));
      css.addStyle("grid-row-gap", this.rowGap, this.isNotNull(this.rowGap));

      // Positioning
      css.addStyle("justify-items", this.justifyItems, this.isNotNull(this.justifyItems));
      css.addStyle("align-items", this.alignItems, this.isNotNull(this.alignItems));
      css.addStyle("place-items", this.placeItems, this.isNotNull(this.placeItems));
      css.addStyle("justify-content", this.justifyContent, this.isNotNull(this.justifyContent));
      css.addStyle("align-content", this.alignContent, this.isNotNull(this.alignContent));
      css.addStyle("place-content", this.placeContent, this.isNotNull(this.placeContent));

      if(this.auto){
        css.addStyle("grid-template-columns", this.getRepeatFunction(this.columns, this.autoUnit), this.isNotNull(this.columns));
        css.addStyle("grid-template-rows", this.getRepeatFunction(this.rows, this.autoUnit), this.isNotNull(this.rows));
      }
      return css;
    }
  },
  methods: {
    getRepeatFunction(times=1, unit) {
      return `repeat(${times}, ${unit})`;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.css.getClasses());
    root.setId(this.id);
    root.setStyles(this.css.getStyles());
    root.setChildren(this.$slots.default);
    return root.create();
  },
  created() {
    this.items = this.$children;
  }
};
