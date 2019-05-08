<template>
  <div :id="id" class="t-list-container">
    <t-input
      v-if="filtered"
      :container-class="getSearchClasses"
      v-model="searchKey"
      :override-defaults="overrideDefaults"
      :icon="$thisvui.icons.search"
    >
    </t-input>
    <t-paginator
      v-if="isPaginated && isPaginatorAtTop"
      :items="getFilteredItems"
      :server-side="serverSide"
      :total-items="totalItems"
      @update-page="updatePage"
      :show-text="showText"
      :previous-text="previousText"
      :next-text="nextText"
      :previous-btn-class="previousBtnClass"
      :next-btn-class="nextBtnClass"
      is-right
      is-left
      is-rounded
      is-shadowless
      is-paddingless
      :show-numbers="showNumbers"
      :link-class="linkClass"
      :current-link-class="currentLinkClass"
      :icon-lib="iconLib"
      :override-defaults="overrideDefaults"
    />
    <div v-if="hasHeader" :class="getHeaderClasses">
      <t-checkbox
        v-if="checkable"
        class="row-checker"
        has-background-color
        v-model="checkAllItems"
        @change.native="checkAllRows"
        @click.native.stop
      >
      </t-checkbox>
      <h2 v-text="header" v-if="header"></h2>
      <slot name="header"></slot>
    </div>
    <ul :class="getClasses">
      <li v-for="(item, index) in getItems" :key="index">
        <t-list-item v-if="isCheckable(item)">
          <t-checkbox
            class="row-checker"
            :value="isRowChecked(item)"
            @change.native="checkRow(item)"
            @click.native.stop
          ></t-checkbox>
        </t-list-item>
        <slot name="items" v-bind:item="item" v-bind:index="index"> </slot>
      </li>
    </ul>
    <t-paginator
      v-if="isPaginated && !isPaginatorAtTop"
      :items="getFilteredItems"
      :server-side="serverSide"
      :total-items="totalItems"
      @update-page="updatePage"
      :show-text="showText"
      :previous-text="previousText"
      :next-text="nextText"
      :previous-btn-class="previousBtnClass"
      :next-btn-class="nextBtnClass"
      is-right
      is-left
      is-rounded
      is-shadowless
      is-paddingless
      :show-numbers="showNumbers"
      :link-class="linkClass"
      :current-link-class="currentLinkClass"
      :icon-lib="iconLib"
      :override-defaults="overrideDefaults"
    />
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import TPaginator from "../TPaginator/TPaginator";
import list from "../../mixins/list";
import responsive from "../../mixins/responsive";
import dimension from "../../mixins/dimension";
import common from "../../mixins/common";

export default {
  name: "t-list",
  components: { TPaginator },
  mixins: [common, list, responsive, dimension],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    isResponsive: {
      type: Boolean,
      default: true
    },
    isFullwidth: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean
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
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("is-compact", this.compact);
      return cssArchitect.getClasses();
    },
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("t-list-header");
      cssArchitect.addClass(this.headerClass, this.headerClass !== undefined);
      return cssArchitect.getClasses();
    },
    hasHeader: function(){
      return this.showHeader || this.header
    }
  }
};
</script>
