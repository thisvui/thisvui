import pagination from "./pagination";
import icons from "./icons";
import CssArchitect from "../utils/css-architect";

const UPDATE_PAGE_EVENT = "update-page";
const SORT_EVENT = "onSort";

export default {
  mixins: [pagination, icons],
  props: {
    items: {
      type: Array,
      required: true
    },
    paginated: {
      type: [Boolean, String],
      default: false
    },
    paginatorAtBottom: {
      type: [Boolean, String],
      default: false
    },
    filtered: {
      type: [Boolean, String],
      default: false
    },
    isSortable: {
      type: [Boolean, String],
      default: false
    },
    sortIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.sort;
      }
    },
    ascendingIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.sortUp;
      }
    },
    descendingIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.sortDown;
      }
    }
  },
  computed: {
    /**
     * Retrives filtered items
     * @returns { An Array }
     */
    getFilteredItems() {
      return this.filteredData;
    },
    /**
     * Retrieves the list items. If paginated retrieves the paginated list
     * @returns { A String value }
     */
    getItems() {
      return this.isPaginated ? this.paginatedList : this.getFilteredItems;
    },
    isPaginated() {
      return this.getBoolean(this.paginated);
    },
    isPaginatorAtTop() {
      return this.getBoolean(!this.paginatorAtBottom);
    },
    /**
     * Filters and sorts the items
     * @returns { A String value }
     */
    filteredData: function() {
      let sortKey = this.sortKey;
      let filterKey = this.searchKey && this.searchKey.toLowerCase();
      let order = this.sortOrders[sortKey];
      let data = this.items;
      if (this.filtered && filterKey) {
        data = data.filter(row => {
          return this.searchItem(row, filterKey);
        });
      }
      if (sortKey && order !== 0) {
        data = data.slice().sort(function(a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },
    /**
     * Dynamically build the css classes for the search input
     * @returns { A String with the chained css classes }
     */
    getSearchClasses: function() {
      const cssArchitect = new CssArchitect("this-search");
      cssArchitect.addClass(
        "is-absolute",
        this.isPaginated && this.isPaginatorAtTop
      );
      return cssArchitect.getClasses();
    }
  },
  watch: {
    items: function(newVal, oldVal) {
      if(this.serverSide){
        this.paginatedList = newVal;
      }
    }
  },
  data: function() {
    return {
      sortKey: "",
      sortOrders: {},
      searchKey: "",
      paginationData: null,
      paginatedList: []
    };
  },
  methods: {
    /**
     * Search a item given a filter keyword
     * @returns { A String value }
     */
    searchItem(row, filterKey) {
      return Object.keys(row).some(key => {
        let item = row[key];
        let isObject = item instanceof Object;
        if (!isObject) {
          return (
            String(item)
              .toLowerCase()
              .indexOf(filterKey) > -1
          );
        } else {
          return this.searchItem(item, filterKey);
        }
      });
      return false;
    },
    /**
     * Determines and returns the sort icon
     * @returns { A css icon class }
     */
    getSortIcon(key) {
      let icon = this.sortIcon
      switch (this.sortOrders[key]) {
        case 0:
          icon = this.sortIcon;
          break;
        case 1:
          icon = this.ascendingIcon;
          break;
        case -1:
          icon = this.descendingIcon;
          break;
      }
      return icon;

    },
    /**
     * Determines the sort order giben a sort key
     */
    sortBy: function(column) {
      if(column.sortable) {
        this.sortKey = column.name;
        let sortOrders = {...this.sortOrders}
        switch (sortOrders[this.sortKey]) {
          case 0:
            sortOrders[this.sortKey] = 1;
            break;
          case 1:
            sortOrders[this.sortKey] = -1;
            break;
          case -1:
            sortOrders[this.sortKey] = 0;
            break;
        }
        this.sortOrders = sortOrders;
        if (this.serverSide) {
          this.updatePage(this.paginationData);
        }
        this.$emit(SORT_EVENT);
      }
    },
    /**
     * Updates the paginated list
     */
    updatePage(data) {
      this.paginationData = data || {};
      if(!this.serverSide) {
        let {items} = this.paginationData ;
        this.paginatedList = items;
      }
      this.paginationData.sortKey = this.sortKey
      this.paginationData.sortOrder = this.sortOrders[this.sortKey];
      this.$emit(UPDATE_PAGE_EVENT, { ...this.paginationData });
    }
  }
};
