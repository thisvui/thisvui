<template>
  <div :id="id" class="this-list-container">
    <this-input
      v-if="filtered"
      :container-class="getSearchClasses"
      v-model="searchKey"
      icon="fas fa-search"
    >
    </this-input>
    <this-paginator
      v-if="isPaginated && isPaginatorAtTop"
      :list-data="getFilteredItems"
      @update="updateList"
      :show-text="showText"
      :previous-text="previousText"
      :next-text="nextText"
      previous-icon="fas fa-angle-left"
      next-icon="fas fa-angle-right"
      :previous-btn-class="previousBtnClass"
      :next-btn-class="nextBtnClass"
      is-right="true"
      is-left="true"
      is-rounded="true"
      is-shadowless="true"
      is-paddingless="true"
      :show-numbers="showNumbers"
      :link-class="linkClass"
      :current-link-class="currentLinkClass"
    />
    <ul :class="getClasses">
      <li v-for="(item, index) in getItems" :key="index">
        <slot name="items" v-bind:item="item" v-bind:index="index"> </slot>
      </li>
    </ul>
    <this-paginator
      v-if="isPaginated && !isPaginatorAtTop"
      :list-data="getFilteredItems"
      @update="updateList"
      :show-text="showText"
      :previous-text="previousText"
      :next-text="nextText"
      previous-icon="fas fa-angle-left"
      next-icon="fas fa-angle-right"
      :previous-btn-class="previousBtnClass"
      :next-btn-class="nextBtnClass"
      is-right="true"
      is-left="true"
      is-rounded="true"
      is-shadowless="true"
      is-paddingless="true"
      :show-numbers="showNumbers"
      :link-class="linkClass"
      :current-link-class="currentLinkClass"
    />
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import ThisPaginator from "../ThisPaginator/ThisPaginator";
import helpers from "../../mixins/helpers";
import list from "../../mixins/list";
import responsive from "../../mixins/responsive";
import dimension from "../../mixins/dimension";
import common from "../../mixins/common";

export default {
  name: "ThisList",
  components: { ThisPaginator },
  mixins: [common, helpers, list, responsive, dimension],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    isResponsive: {
      type: [Boolean, String],
      default: true
    },
    isFullwidth: {
      type: [Boolean, String],
      default: true
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getResponsiveModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      return cssArchitect.getClasses();
    }
  }
};
</script>
