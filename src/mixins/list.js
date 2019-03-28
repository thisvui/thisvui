import pagination from "./pagination";
import icons from "./icons";
import CssArchitect from "../utils/css-architect";

const UPDATE_PAGE_EVENT = "update-page";

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
      if (this.isSortable && sortKey && order !== 0) {
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
    let sortOrders = {};
    if (this.columns) {
      this.columns.forEach(function(key) {
        sortOrders[key] = 0;
      });
    }
    return {
      sortKey: "",
      sortOrders: sortOrders,
      searchKey: "",
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
      return this.sortOrders[key] > 0
        ? this.ascendingIcon
        : this.sortOrders[key] === 0
        ? this.sortIcon
        : this.descendingIcon;
    },
    /**
     * Determines the sort order giben a sort key
     */
    sortBy: function(key) {
      this.sortKey = key;
      this.sortOrders[key] =
        this.sortOrders[key] === 0 ? 1 : this.sortOrders[key] === 1 ? -1 : 0;
    },
    /**
     * Updates the paginated list
     */
    updatePage(data) {
      if(!this.serverSide) {
        let {items} = data;
        this.paginatedList = items;
      }
      this.$emit(UPDATE_PAGE_EVENT, { ...data });
    }
  }
};
