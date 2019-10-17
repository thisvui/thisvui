import TIcon from "../TIcon/TIcon";
import TPaginatorControl from "./TPaginatorControl";
import TSelect from "../TSelect/TSelect";

import alignment from "../../mixins/alignment";
import sizes from "../../mixins/sizes";
import pagination from "../../mixins/pagination";
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import justify from "../../mixins/justify";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-paginator",
  components: { TSelect, TPaginatorControl, TIcon },
  mixins: [common, pagination, sizes, alignment, justify, helpers],
  props: {
    items: {
      type: Array
    },
    size: {
      type: Number,
      required: false,
      default: 10
    },
    sizeLabel: {
      type: String,
      default: "Rows per page"
    },
    controlsOutside: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPageNumber: 0, // default to page 0
      sizeOptions: [5, 10, 15, 25, 50, 100],
      rowsPerPage: this.size,
      addFirstPage: true,
      addLastPage: true
    };
  },
  watch: {
    items: function(newVal, oldVal) {
      this.updateData(!this.serverSide);
    }
  },
  computed: {
    isControlsOutside() {
      return this.controlsOutside;
    },
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("t-paginator");
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getTargetClass: function() {
      const cssArchitect = new CssArchitect("pagination");
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getJustifyModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass("is-rounded", this.isRounded);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the previous button
     * @returns { A String with the chained css classes }
     */
    getPreviousClass() {
      const cssArchitect = new CssArchitect("pagination__previous");
      cssArchitect.addClass(
        this.previousClass,
        this.previousClass !== undefined
      );
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the next button
     * @returns { A String with the chained css classes }
     */
    getNextClass() {
      const cssArchitect = new CssArchitect("pagination__next");
      cssArchitect.addClass(this.nextClass, this.nextClass !== undefined);
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the ul element
     * @returns { A String with the chained css classes }
     */
    getListClass() {
      const cssArchitect = new CssArchitect("pagination__list");
      cssArchitect.addClass(this.listClass, this.listClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the link elements
     * @returns { A String with the chained css classes }
     */
    getLinkClass() {
      const cssArchitect = new CssArchitect("pagination__link");
      cssArchitect.addClass(this.linkClass, this.linkClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the current link element
     * @returns { A String with the chained css classes }
     */
    getCurrentLinkClass() {
      const cssArchitect = new CssArchitect("pagination__link is-current");
      cssArchitect.addClass(
        this.currentLinkClass,
        this.currentLinkClass !== undefined
      );
      return cssArchitect.getClasses();
    },
    /**
     * Calculate an returns the first page number
     * @returns { A integer value }
     */
    getStart() {
      const start =
        parseInt(this.currentPageNumber) * parseInt(this.rowsPerPage);
      return start;
    },
    /**
     * Calculate an returns the last page number
     * @returns { A integer value }
     */
    getEnd() {
      const end = this.getStart + parseInt(this.rowsPerPage);
      return end;
    },
    /**
     * Returns the pages count string
     * @returns { A String value }
     */
    getItemsCount() {
      let length = this.serverSide ? this.totalItems : this.items.length;
      return `${this.getStart + 1} - ${
        this.getEnd < parseInt(length) ? this.getEnd : parseInt(length)
      } of ${parseInt(length)}`;
    },
    /**
     * Retrieves the paginated data list
     * @returns { An Array }
     */
    paginatedItems() {
      return this.serverSide
        ? this.items
        : this.items.slice(this.getStart, this.getEnd);
    },
    /**
     * Returns the number of pages
     * @returns { A integer value }
     */
    numberOfPages() {
      let totalItems = this.totalItems || 0;
      let dividend = this.serverSide
        ? totalItems
        : parseInt(this.items.length);
      let pages = dividend / parseInt(this.rowsPerPage);
      pages = pages > parseInt(pages) ? parseInt(pages) + 1 : parseInt(pages);
      return pages;
    },
    /**
     * Returns the current pages scope to build the range of links to be shown
     * @returns { An Array }
     */
    activePagesScope() {
      const first = Math.max(1, this.currentPageNumber - 1);
      const last = Math.min(this.currentPageNumber + 2, this.numberOfPages);
      this.addFirstPage = first > 1 || false;
      this.addLastPage = last < this.numberOfPages || false;
      const pages = [];
      for (let i = first; i <= last; i++) {
        pages.push({
          number: i,
          isCurrent: this.currentPageNumber + 1 === i
        });
      }
      return pages;
    },
    /**
     * Checks if the current page is the last page
     * @returns { A Boolean value }
     */
    isLastPage() {
      return this.currentPageNumber === this.numberOfPages - 1;
    },
    /**
     * Checks if the current page is the first page
     * @returns { A Boolean value }
     */
    isFirstPage() {
      return this.currentPageNumber === 0;
    },
    /**
     * Converts showNumbers to Boolean
     * @returns { A Boolean value }
     */
    getShowNumbers() {
      return this.showNumbers && this.numberOfPages > 1;
    }
  },
  methods: {
    updateData(emitEvent = true) {
      let data = {
        items: this.paginatedItems,
        page: this.currentPageNumber,
        size: this.rowsPerPage
      };
      if (emitEvent) {
        this.$emit(this.$thisvui.events.paginator.updatePage, data);
      }
    },
    /**
     * Goes to the next page and emits the corresponding event
     */
    nextPage() {
      if (!this.isLastPage) {
        this.currentPageNumber++;
      }
      this.updateData();
    },
    /**
     * Goes to the prev page and emits the corresponding event
     */
    prevPage() {
      if (!this.isFirstPage) {
        this.currentPageNumber--;
      }
      this.updateData();
    },
    /**
     * Sets the current page number when page changes
     */
    onChange() {
      let numberOfPages = this.numberOfPages > 0 ? this.numberOfPages - 1 : 0
      if (this.currentPageNumber > numberOfPages) {
        this.currentPageNumber = numberOfPages;
      }
      this.updateData();
    },
    /**
     * Goes to specific page number
     */
    goTo(page) {
      this.currentPageNumber = page > 0 ? page - 1 : 0;
      this.updateData();
    },
    /**
     * Creates the size selection element
     */
    createSizeSelect(architect) {
      let root = architect.createLi();
      let sizeLabel = root.createSpan(
        "pagination__size"
      );


      let sizeSelect = root.createElement(TSelect);
      let sizeSelectProps = {
        items: this.sizeOptions,
        removeLabel: true,
        allowEmptyValue: false,
        containerClass: "pagination__select",
        inputClass: "size-select",
        compact: true,
        small: true,
        isShadowless: true,
        initialValue: this.rowsPerPage
      };
      sizeSelect.setProps(sizeSelectProps);
      sizeLabel.innerHTML(this.sizeLabel);
      sizeSelect.addInput( value => {
        this.rowsPerPage = value;
        this.onChange();
      }); // Emulates v-model
      root.addChild(sizeLabel);
      root.addChild(sizeSelect);
      architect.addChild(root);
    },
    /**
     * Creates the items count label
     */
    createItemsCount(architect) {
      let root = architect.createLi();

      let itemsCount = root.createSpan("pagination__count");
      itemsCount.addDomProp("innerHTML", this.getItemsCount);

      root.addChild(itemsCount);
      architect.addChild(root);
    },
    /**
     * Creates the first Page element
     */
    createPageNumber(
      architect,
      { condition = false, current = false, value = 1 } = config
    ) {
      let root = architect.createLi("is-hidden-mobile");

      let pageNumber = root.createA(this.getLinkClass);
      pageNumber.addClass("is-current", current);
      pageNumber.addClass(
        this.currentLinkClass,
        this.currentLinkClass !== undefined && current
      );
      pageNumber.innerHTML(value);
      pageNumber.addEvent("click", () => {
        this.goTo(value);
      });

      root.addChild(pageNumber, condition);
      architect.addChild(root);
    },
    /**
     * Creates the first Page element
     */
    createFirstPage(architect) {
      let pageEllipsis = this.createPageEllipsis(architect);
      this.createPageNumber(architect, {
        condition: this.getShowNumbers && this.addFirstPage,
        current: this.isFirstPage
      });
      architect.addChild(
        pageEllipsis,
        this.getShowNumbers && this.addFirstPage
      );
    },
    /**
     * Creates the last Page element
     */
    createLastPage(architect) {
      let pageEllipsis = this.createPageEllipsis(architect);
      architect.addChild(pageEllipsis, this.getShowNumbers && this.addLastPage);
      this.createPageNumber(architect, {
        condition: this.getShowNumbers && this.addLastPage,
        current: this.isLastPage,
        value: this.numberOfPages
      });
    },
    /**
     * Creates the page numbers
     */
    createPageNumbers(architect) {
      for (let page of this.activePagesScope) {
        this.createPageNumber(architect, {
          condition: true,
          current: page.isCurrent,
          value: page.number
        });
      }
    },
    /**
     * Creates a Page ellipsis
     */
    createPageEllipsis(architect) {
      let root = architect.createLi("is-hidden-mobile");

      let ellipsis = root.createSpan(`pagination__ellipsis`);
      ellipsis.innerHTML("&hellip;");

      root.addChild(ellipsis);
      return root;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);
    root.setId(this.id);

    // Creating the nav element
    let nav = root.createNav(this.getTargetClass);
    nav.addAttr("role", "navigation");
    nav.addAttr("aria-label", "pagination");

    // Creating the previous button
    let previous = root.createElement(TPaginatorControl);
    let previousProps = {
      disabled: this.isFirstPage,
      containerClass: this.getPreviousClass,
      btnClass: this.previousBtnClass,
      icon: this.previousIcon,
      iconClass: this.previousIconClass,
      iconDataTooltip: this.previousIconTooltip,
      iconTooltipClass: this.previousIconTooltipClass,
      iconLib: this.iconLib,
      overrideDefaults: this.overrideDefaults
    };
    previous.setProps(previousProps);
    previous.addEvent("click", this.prevPage);

    // Creating the next button
    let next = root.createElement(TPaginatorControl);
    let nextProps = {
      disabled: this.isLastPage,
      containerClass: this.getNextClass,
      btnClass: this.nextBtnClass,
      icon: this.nextIcon,
      iconClass: this.nextIconClass,
      iconDataTooltip: this.nextIconTooltip,
      iconTooltipClass: this.nextIconTooltipClass,
      iconLib: this.iconLib,
      overrideDefaults: this.overrideDefaults
    };
    next.setProps(nextProps);
    next.addEvent("click", this.nextPage);

    root.addChild(previous, this.controlsOutside && this.numberOfPages > 1);
    root.addChild(next, this.controlsOutside && this.numberOfPages > 1);

    // Creating the list element
    let list = root.createUl(this.getListClass);

    // Creating list children elements
    this.createSizeSelect(list);
    this.createItemsCount(list);
    if (!this.controlsOutside) {
      let insidePrevious = root.createLi();
      insidePrevious.setKey("left-controls");
      insidePrevious.addChild(previous);
      list.addChild(insidePrevious, this.numberOfPages > 1);
    }
    if (this.getShowNumbers) {
      this.createFirstPage(list);
      this.createPageNumbers(list);
      this.createLastPage(list);
    }
    if (!this.controlsOutside) {
      let insideNext = root.createLi();
      insideNext.setKey("right-controls");
      insideNext.addChild(next);
      list.addChild(insideNext, this.numberOfPages > 1);
    }
    nav.addChild(list);
    root.addChild(nav);
    return root.create();
  }
};
