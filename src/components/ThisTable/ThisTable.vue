<template>
  <div class="this-table-container">
    <this-input
      v-if="filtered"
      :container-class="getSearchClasses"
      v-model="searchKey"
      :override-defaults="overrideDefaults"
      :icon="$thisvui.icons.search"
    >
    </this-input>
    <this-paginator
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
      is-right="true"
      is-left="true"
      is-rounded="true"
      is-shadowless="true"
      is-paddingless="true"
      is-small="true"
      :show-numbers="showNumbers"
      :link-class="linkClass"
      :current-link-class="currentLinkClass"
      :icon-lib="iconLib"
      :override-defaults="overrideDefaults"
    />
    <table :id="id" :class="getClasses">
      <thead>
        <tr>
          <th v-if="isCheckable">
            <this-checkbox
              class="row-checker"
              has-background-color="true"
              v-model="checkAllItems"
              @change.native="checkAllRows"
              @click.native.stop
            >
            </this-checkbox>
          </th>
          <template v-if="columns">
            <th
              v-for="column in mappedColumns"
              :key="column.name"
              :class="{ active: sortKey == column.name }"
              @click="sortBy(column)"
            >
              <span>
                {{(column.display || column.name) | capitalize }}
                <this-icon
                  v-if="column.sortable"
                  :icon="getSortIcon(column.name)"
                  @click="sortBy(column)"
                  class="sort-icon"
                >
                </this-icon>
              </span>
            </th>
          </template>
          <slot name="header" />
          <th v-if="hasActionColumn" v-text="actionText" />
        </tr>
      </thead>
      <tbody>
        <slot name="items" v-if="simple"> </slot>
        <tr v-for="(item, index) in getItems" :key="index" v-if="!simple">
          <td v-if="isCheckable">
            <this-checkbox
              class="row-checker"
              :value="isRowChecked(item)"
              @change.native="checkRow(item)"
              @click.native.stop
            >
            </this-checkbox>
          </td>
          <slot name="items" v-bind:item="item" v-bind:index="index"> </slot>
          <td v-if="hasActionColumn">
            <slot name="actions" v-bind:item="item" v-bind:index="index">
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <slot name="footer" />
      </tfoot>
    </table>
    <this-paginator
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
      is-right="true"
      is-left="true"
      is-rounded="true"
      is-shadowless="true"
      is-paddingless="true"
      is-small="true"
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
import ThisInput from "../ThisInput/ThisInput";
import ThisCheckbox from "../ThisCheckbox/ThisCheckbox";
import ThisPaginator from "../ThisPaginator/ThisPaginator";

export default {
  name: "ThisTable",
  components: { ThisPaginator, ThisCheckbox, ThisInput },
  mixins: [common, helpers, list],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    columns: Array,
    actionColumn: {
      type: [Boolean, String],
      default: false
    },
    actionText: {
      type: String,
      default: "Actions"
    },
    checkedRows: {
      type: Array,
      default: () => []
    },
    simple: {
      type: Boolean,
      default: false
    },
    isResponsive: {
      type: [Boolean, String],
      default: true
    },
    isBordered: {
      type: [String, Boolean]
    },
    isStriped: {
      type: [String, Boolean]
    },
    isNarrow: {
      type: [String, Boolean]
    },
    isHoverable: {
      type: [Boolean, String],
      default: true
    },
    isCheckable: {
      type: [Boolean, String]
    },
    isFullwidth: {
      type: [Boolean, String],
      default: true
    }
  },
  computed: {
    hasActionColumn() {
      return this.getBoolean(this.actionColumn);
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("table");
      cssArchitect.addClass(
        "is-responsive",
        this.getBoolean(this.isResponsive)
      );
      cssArchitect.addClass("is-bordered", this.getBoolean(this.isBordered));
      cssArchitect.addClass("is-striped", this.getBoolean(this.isStriped));
      cssArchitect.addClass("is-narrow", this.getBoolean(this.isNarrow));
      cssArchitect.addClass("is-hoverable", this.getBoolean(this.isHoverable));
      cssArchitect.addClass("is-fullwidth", this.getBoolean(this.isFullwidth));
      return cssArchitect.getClasses();
    },
    getColumns(){
      let columns = []
      if(this.columns){
        columns = this.columns.map(column => {
          let isString = typeof column === "string"
          let key = isString ? column : column.name
          this.sortOrders[key] = 0;
          if(isString){
            return {name : column, sortable : this.isSortable};
          }
          if(column.sortable === undefined && this.isSortable){
            column.sortable = this.isSortable
          }
          return column;
        });
      }
      return columns
    }
  },
  data: function() {
    return {
      mappedColumns: [],
      checkAllItems: false,
      updatedCheckedRows: [...this.checkedRows]
    };
  },
  methods: {
    isRowChecked(item) {
      return this.updatedCheckedRows.indexOf(item) >= 0;
    },
    removeCheckedRow(item) {
      const index = this.updatedCheckedRows.indexOf(item);
      if (index >= 0) {
        this.updatedCheckedRows.splice(index, 1);
      }
    },
    checkRow(item) {
      if (!this.isRowChecked(item)) {
        this.updatedCheckedRows.push(item);
      } else {
        this.removeCheckedRow(item);
      }
      this.$emit("checkRow", this.updatedCheckedRows, item);
      this.$emit("update:checkedRows", this.updatedCheckedRows);
    },
    checkAllRows() {
      for (let item of this.getItems) {
        let check = !this.isRowChecked(item) && this.checkAllItems;
        if (check) {
          this.updatedCheckedRows.push(item);
          continue;
        }
        if (!this.checkAllItems) {
          this.removeCheckedRow(item);
        }
      }
      this.$emit("update:checkedRows", this.updatedCheckedRows);
    }
  },
  beforeCreate: function() {
    this.$options.components.ThisInput = require("../ThisInput/ThisInput").default;
    this.$options.components.ThisPaginator = require("../ThisPaginator/ThisPaginator").default;
    this.$options.components.ThisCheckbox = require("../ThisCheckbox/ThisCheckbox").default;
  },
  mounted() {
    this.mappedColumns = this.getColumns
  }
};
</script>
