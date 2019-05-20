<template>
  <div class="t-table-container">
    <t-input
      v-if="filtered"
      :container-class="getSearchClasses"
      v-model="searchKey"
      :override-defaults="overrideDefaults"
      :icon="$thisvui.icons.search"
      is-shadowless
      is-opaque
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
      is-small
      :show-numbers="showNumbers"
      :link-class="linkClass"
      :current-link-class="currentLinkClass"
      :icon-lib="iconLib"
      :override-defaults="overrideDefaults"
    />
    <table :id="id" :class="getClasses">
      <thead>
        <tr>
          <th v-if="checkable || expandable" class="t-table-functions-col">
            <div class="is-flex">
              <div class="col-expandable" v-if="expandable"></div>
              <div class="col-checkable" v-if="checkable">
                <t-checkbox
                  class="row-checker"
                  has-background-color
                  v-model="checkAllItems"
                  @change.native="checkAllRows"
                  @click.native.stop
                >
                </t-checkbox>
              </div>
            </div>
          </th>
          <template v-if="columns">
            <th
              v-for="column in mappedColumns"
              :key="column.name"
              :class="getThClasses"
              @click="sortBy(column)"
            >
              <span>
                {{ (column.display || column.name) | capitalize }}
                <t-icon
                  v-if="column.sortable"
                  :icon="getSortIcon(column.name)"
                  @click="sortBy(column)"
                  class="sort-icon"
                >
                </t-icon>
              </span>
            </th>
          </template>
          <slot name="header" />
          <th
            v-if="hasActionColumn"
            v-text="actionText"
            :class="getThClasses"
          />
        </tr>
      </thead>
      <tbody class="is-relative">
        <transition name="fade">
          <div v-if="isLoading" class="t-table-loading is-absolute">
            <t-progress indeterminate compact></t-progress>
            <div class="t-table-block">
            </div>
          </div>
        </transition>

        <slot name="items" v-if="simple"> </slot>
        <template v-for="(item, index) in getItems" v-if="!simple">
          <tr
            v-on="isExpandable(item) ? { click: () => toggleExpand(item) } : {}"
            :class="getTrClasses"
          >
            <td
              v-if="isCheckable(item) || isExpandable(item)"
              :style="{ width: getFunctionColWidth(item) + 'px' }"
            >
              <div class="is-flex">
                <span v-if="isExpandable(item)" class="col-expandable">
                  <div v-show="!isExpanded(item)">
                    <t-icon
                      :preserve-defaults="!overrideDefaults"
                      :icon="closedIcon"
                    />
                  </div>
                  <div v-show="isExpanded(item)">
                    <t-icon
                      :preserve-defaults="!overrideDefaults"
                      :icon="openedIcon"
                    />
                  </div>
                </span>
                <div class="col-checkable" v-if="isCheckable(item)">
                  <t-checkbox
                    class="row-checker"
                    :value="isRowChecked(item)"
                    @change.native="checkRow(item)"
                    @click.native.stop
                  >
                  </t-checkbox>
                </div>
              </div>
            </td>
            <slot name="items" v-bind:item="item" v-bind:index="index"></slot>
            <td v-if="hasActionColumn">
              <slot name="actions" v-bind:item="item" v-bind:index="index">
              </slot>
            </td>
          </tr>
          <tr v-if="isExpandable(item)" class="t-table-expandable-row">
            <td class="t-table-expandable-col" :colspan="getColspan">
              <t-expand>
                <div
                  v-if="isExpanded(item)"
                  class="t-table-expandable-container"
                >
                  <div class="t-table-expandable-content">
                    <slot
                      name="detail"
                      v-bind:item="item"
                      v-bind:index="index"
                    ></slot>
                  </div>
                </div>
              </t-expand>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <slot name="footer" />
      </tfoot>
    </table>
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
      is-small
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
import helpers from "../../mixins/helpers";
import list from "../../mixins/list";
import common from "../../mixins/common";
import TInput from "../TInput/TInput";
import TCheckbox from "../TCheckbox/TCheckbox";
import TPaginator from "../TPaginator/TPaginator";
import TExpand from "../TAnimation/TExpand";
import colors from "../../mixins/colors";
import TProgress from "../TProgress/TProgress";

export default {
  name: "t-table",
  components: { TProgress, TExpand, TPaginator, TCheckbox, TInput },
  mixins: [common, list, colors, helpers],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    columns: Array,
    actionColumn: {
      type: Boolean,
      default: false
    },
    actionText: {
      type: String,
      default: "Actions"
    },
    simple: {
      type: Boolean,
      default: false
    },
    expandable: {
      type: Boolean,
      default: false
    },
    openedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowDown;
      }
    },
    closedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.arrowRight;
      }
    },
    isLoading: {
      type: Boolean
    },
    isResponsive: {
      type: Boolean,
      default: true
    },
    isBordered: {
      type: Boolean
    },
    isStriped: {
      type: Boolean
    },
    isNarrow: {
      type: Boolean
    },
    isHoverable: {
      type: Boolean,
      default: true
    },
    isFullwidth: {
      type: Boolean,
      default: true
    },
    targetClass: {
      type: String
    }
  },
  computed: {
    hasActionColumn() {
      return this.actionColumn;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("table");
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("is-responsive", this.isResponsive);
      cssArchitect.addClass("is-bordered", this.isBordered);
      cssArchitect.addClass("is-striped", this.isStriped);
      cssArchitect.addClass("is-narrow", this.isNarrow);
      cssArchitect.addClass("is-hoverable", this.isHoverable);
      cssArchitect.addClass("is-fullwidth", this.isFullwidth);
      cssArchitect.addClass(this.targetClass);
      this.colorize(cssArchitect, false, true);
      cssArchitect.addClass(this.getColorsModifiers);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    getThClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getTrClasses: function() {
      const cssArchitect = new CssArchitect();
      this.colorize(cssArchitect, "bg-hover", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getColumns() {
      let columns = [];
      if (this.columns) {
        columns = this.columns.map(column => {
          let isString = typeof column === "string";
          let key = isString ? column : column.name;
          this.sortOrders[key] = 0;
          if (isString) {
            return { name: column, sortable: this.sortable };
          }
          if (column.sortable === undefined && this.sortable) {
            column.sortable = this.sortable;
          }
          return column;
        });
      }
      return columns;
    },
    getColspan() {
      let columnsNumber = this.columns.length;
      let additionalColumns = this.actionColumn ? 2 : 1;
      return columnsNumber + additionalColumns;
    }
  },
  data: function() {
    return {
      mappedColumns: [],
      expandedRows: []
    };
  },
  methods: {
    isExpandable(item) {
      return (
        (item && item.expandable) ||
        (item.expandable === undefined && this.expandable)
      );
    },
    isExpanded(item) {
      return this.expandedRows.includes(item);
    },
    toggleExpand(item) {
      const index = this.expandedRows.indexOf(item);
      if (index > -1) {
        this.expandedRows.splice(index, 1);
      } else {
        this.expandedRows.push(item);
      }
    },
    getFunctionColWidth(item) {
      let width = 30;
      if (this.isCheckable(item)) {
        width = width + 40;
      }
      return width;
    }
  },
  beforeCreate: function() {
    this.$options.components.TInput = require("../TInput/TInput").default;
    this.$options.components.TPaginator = require("../TPaginator/TPaginator").default;
    this.$options.components.TCheckbox = require("../TCheckbox/TCheckbox").default;
  },
  mounted() {
    this.mappedColumns = this.getColumns;
  }
};
</script>
