<template>
  <div :id="id" :class="getContainerClass">
    <nav :class="getTargetClass" role="navigation" aria-label="pagination">
      <this-paginator-control
        v-if="isControlsOutside"
        :disabled="isFirstPage"
        :container-class="getPreviousClass"
        :btn-class="previousBtnClass"
        @click="prevPage"
        :icon="previousIcon"
        :icon-class="previousIconClass"
        :icon-data-tooltip="previousIconTooltip"
        :icon-tooltip-class="previousIconTooltipClass"
        :is-paddingless="isPaddingless"
        :is-shadowless="isShadowless"
      />
      <this-paginator-control
        v-if="isControlsOutside"
        :disabled="isLastPage"
        :container-class="getNextClass"
        :btn-class="nextBtnClass"
        @click="nextPage"
        :icon="nextIcon"
        :icon-class="nextIconClass"
        :icon-data-tooltip="nextIconTooltip"
        :icon-tooltip-class="nextIconTooltipClass"
        :is-paddingless="isPaddingless"
        :is-shadowless="isShadowless"
      />
      <ul :class="getListClass">
        <li>
          <span class="is-inline-block size-label has-text-weight-bold"
            >{{ sizeLabel }}:</span
          >
          <this-select
            v-model="rowsPerPage"
            :options="sizeOptions"
            remove-label="true"
            :add-empty-value="false"
            container-class="size-select-container is-inline-block"
            input-class="size-select"
            is-small="true"
            @change="onChange"
          />
        </li>
        <li>
          <span class="is-inline-block pages-count-label">{{
            getPagesCount
          }}</span>
        </li>
        <li :v-if="!isControlsOutside" key="left-controls">
          <this-paginator-control
            :disabled="isFirstPage"
            :container-class="getPreviousClass"
            :btn-class="previousBtnClass"
            @click="prevPage"
            :icon="previousIcon"
            :icon-class="previousIconClass"
            :icon-data-tooltip="previousIconTooltip"
            :icon-tooltip-class="previousIconTooltipClass"
            :is-paddingless="isPaddingless"
            :is-shadowless="isShadowless"
          />
        </li>
        <li>
          <a
            v-if="getShowNumbers && addFirstPage"
            :class="`${isFirstPage ? getCurrentLinkClass : getLinkClass}`"
            :aria-label="`Goto page 1`"
            @click="goTo(1)"
          >
            {{ 1 }}
          </a>
        </li>
        <li>
          <span
            class="pagination-ellipsis"
            v-if="getShowNumbers && addFirstPage"
            >&hellip;</span
          >
        </li>
        <li
          :v-if="getShowNumbers"
          v-for="page in activePagesScope"
          :key="page.number"
        >
          <a
            v-if="page.isCurrent && getShowNumbers"
            :class="`${getLinkClass} ${getCurrentLinkClass}`"
            :aria-label="`Goto page ${page.number}`"
            @click="goTo(page.number)"
          >
            {{ page.number }}
          </a>
          <a
            v-if="!page.isCurrent && getShowNumbers"
            :class="getLinkClass"
            :aria-label="`Goto page ${page.number}`"
            @click="goTo(page.number)"
          >
            {{ page.number }}
          </a>
        </li>
        <li>
          <span class="pagination-ellipsis" v-if="getShowNumbers && addLastPage"
            >&hellip;</span
          >
        </li>
        <li>
          <a
            v-if="getShowNumbers && addLastPage"
            :class="`${isLastPage ? getCurrentLinkClass : getLinkClass}`"
            :aria-label="`Goto page 1`"
            @click="goTo(numberOfPages)"
          >
            {{ numberOfPages }}
          </a>
        </li>
        <li :v-if="!isControlsOutside" key="right-controls">
          <this-paginator-control
            :disabled="isLastPage"
            :container-class="getNextClass"
            :btn-class="nextBtnClass"
            @click="nextPage"
            :icon="nextIcon"
            :icon-class="nextIconClass"
            :icon-data-tooltip="nextIconTooltip"
            :icon-tooltip-class="nextIconTooltipClass"
            :is-paddingless="isPaddingless"
            :is-shadowless="isShadowless"
          />
        </li>
      </ul>
    </nav>
    <slot />
  </div>
</template>
<script>
import Action from "../ThisAction/ThisAction";
import ThisIcon from "../ThisIcon/ThisIcon";
import CssArchitect from "../../utils/css-architect";
import syntax from "../../mixins/syntax";
import alignment from "../../mixins/alignment";
import sizes from "../../mixins/sizes";
import pagination from "../../mixins/pagination";
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import ThisPaginatorControl from "./ThisPaginatorControl";
import ThisSelect from "../ThisSelect/ThisSelect";

const UPDATE_EVENT = "update";

export default {
  name: "ThisPaginator",
  components: { ThisSelect, ThisPaginatorControl, ThisIcon, Action },
  mixins: [common, helpers, syntax, sizes, alignment, pagination],
  props: {
    listData: {
      type: Array,
      required: true
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
      type: [Boolean, String],
      default: false
    },
    isRounded: {
      type: [Boolean, String],
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
  computed: {
    isControlsOutside() {
      return this.getBoolean(this.controlsOutside);
    },
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("paginator");
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getTargetClass: function() {
      const cssArchitect = new CssArchitect("pagination");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass("is-rounded", this.getBoolean(this.isRounded));
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the previous button
     * @returns { A String with the chained css classes }
     */
    getPreviousClass() {
      const cssArchitect = new CssArchitect("pagination-previous");
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
      const cssArchitect = new CssArchitect("pagination-next");
      cssArchitect.addClass(this.nextClass, this.nextClass !== undefined);
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the ul element
     * @returns { A String with the chained css classes }
     */
    getListClass() {
      const cssArchitect = new CssArchitect("pagination-list");
      cssArchitect.addClass(this.listClass, this.listClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the link elements
     * @returns { A String with the chained css classes }
     */
    getLinkClass() {
      const cssArchitect = new CssArchitect("pagination-link");
      cssArchitect.addClass(this.linkClass, this.linkClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the current link element
     * @returns { A String with the chained css classes }
     */
    getCurrentLinkClass() {
      const cssArchitect = new CssArchitect("pagination-link is-current");
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
    getPagesCount() {
      return `${this.getStart + 1} - ${
        this.getEnd < parseInt(this.listData.length)
          ? this.getEnd
          : parseInt(this.listData.length)
      } of ${parseInt(this.listData.length)}`;
    },
    /**
     * Retrieves the paginated data list
     * @returns { An Array }
     */
    paginatedData() {
      return this.listData.slice(this.getStart, this.getEnd);
    },
    /**
     * Returns the number of pages
     * @returns { A integer value }
     */
    numberOfPages() {
      let dividend =
        parseInt(this.listData.length) + parseInt(this.rowsPerPage);
      let pages = dividend / parseInt(this.rowsPerPage);
      return parseInt(pages);
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
      return this.getBoolean(this.showNumbers);
    }
  },
  mounted() {
    this.$emit(UPDATE_EVENT, this.paginatedData);
  },
  updated() {
    this.$emit(UPDATE_EVENT, this.paginatedData);
  },
  methods: {
    /**
     * Goes to the next page and emits the corresponding event
     */
    nextPage() {
      if (!this.isLastPage) {
        this.currentPageNumber++;
        this.$emit(UPDATE_EVENT, this.paginatedData);
      }
    },
    /**
     * Goes to the prev page and emits the corresponding event
     */
    prevPage() {
      if (!this.isFirstPage) {
        this.currentPageNumber--;
        this.$emit(UPDATE_EVENT, this.paginatedData);
      }
    },
    /**
     * Sets the current page number when page changes
     */
    onChange() {
      if (this.currentPageNumber > this.numberOfPages - 1) {
        this.currentPageNumber = this.numberOfPages - 1;
      }
    },
    /**
     * Goes to specific page number
     */
    goTo(page) {
      this.currentPageNumber = page > 0 ? page - 1 : 0;
    }
  }
};
</script>
