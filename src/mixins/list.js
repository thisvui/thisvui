import pagination from "./pagination";

import { TInput } from "../components/TInput";
import { TPaginator } from "../components/TPaginator";
import { TProgress } from "../components/TProgress";
import { TCheckbox } from "../components/TCheckbox";

import CssArchitect from "../utils/css-architect";

export default {
  mixins: [pagination],
  components: { TProgress, TPaginator, TCheckbox, TInput },
  props: {
    items: {
      type: Array,
      required: true
    },
    emptyText: {
      type: String,
      default: function() {
        return this.$thisvui.emptyListText;
      }
    },
    checkedRows: {
      type: Array,
      default: () => []
    },
    paginated: {
      type: Boolean
    },
    paginatorAtTop: {
      type: Boolean
    },
    filtered: {
      type: Boolean
    },
    checkable: {
      type: Boolean
    },
    sortable: {
      type: Boolean
    },
    isLoading: {
      type: Boolean
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
     * Retrieves the list items. If paginated retrieves the paginated list
     * @returns { A String value }
     */
    getItems() {
      return this.paginated ? this.paginatedList : this.getFilteredItems;
    },
    /**
     * Filters and sorts the items
     * @returns { A String value }
     */
    getFilteredItems: function() {
      let sortKey = this.sortKey;
      let filterKey = this.searchKey && this.searchKey.toLowerCase();
      let order = this.sortOrders[sortKey];
      let data = this.items;
      if (this.filtered && filterKey) {
        if (!this.serverSide) {
          data = data.filter(row => {
            return this.searchItem(row, filterKey);
          });
        }
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
      const cssArchitect = new CssArchitect("t-search");
      return cssArchitect.getClasses();
    },
    isEmpty() {
      return this.$_utils.check.empty(this.items);
    }
  },
  watch: {
    items: function(newVal, oldVal) {
      if (this.serverSide) {
        this.paginatedList = newVal;
      }
    },
    searchKey: function(newVal, oldVal) {
      this.$emit("filter", newVal);
    }
  },
  data: function() {
    return {
      sortKey: "",
      sortOrders: {},
      searchKey: "",
      paginationData: null,
      paginatedList: [],
      checkAllItems: false,
      updatedCheckedRows: [...this.checkedRows]
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
    },
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
      this.$emit(
        this.$thisvui.events.list.checkRow,
        this.updatedCheckedRows,
        item
      );
      this.$emit(
        this.$thisvui.events.list.updateCheckedRows,
        this.updatedCheckedRows
      );
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
      this.$emit(
        this.$thisvui.events.list.updateCheckedRows,
        this.updatedCheckedRows
      );
    },
    isCheckable(item) {
      return (
        (item && item.checkable) ||
        (item.checkable === undefined && this.checkable)
      );
    },
    /**
     * Determines and returns the sort icon
     * @returns { A css icon class }
     */
    getSortIcon(key) {
      let icon = this.sortIcon;
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
     * Determines the sort order given a sort key
     */
    sortBy: function(column) {
      if (column.sortable) {
        this.sortKey = column.name;
        let sortOrders = { ...this.sortOrders };
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
        this.$emit(this.$thisvui.events.list.sort);
      }
    },
    /**
     * Updates the paginated list
     */
    updatePage(data) {
      this.paginationData = data || {};
      if (!this.serverSide) {
        let { items } = this.paginationData;
        this.paginatedList = items;
      }
      this.paginationData.sortKey = this.sortKey;
      this.paginationData.sortOrder = this.sortOrders[this.sortKey];
      this.$emit(this.$thisvui.events.paginator.updatePage, {
        ...this.paginationData
      });
    },
    createSearch(architect, condition = true) {
      if (this.filtered && condition) {
        let self = this;
        let input = architect.createElement(TInput);
        input.value(this.searchKey);
        let inputHandler = function(event) {
          let resultValue = event.target ? event.target.value : event;
          self.searchKey = resultValue;
        };
        input.addInput(inputHandler);
        input.setProps({
          containerClass: this.getSearchClasses,
          overrideDefaults: this.overrideDefaults,
          icon: this.$thisvui.icons.search,
          shadowless: true,
          isOpaque: true
        });
        architect.addChild(input);
      }
    },
    createPaginator(architect, condition = false, search = false) {
      if (condition) {
        let paginator = architect.createElement(TPaginator);
        let pProps = this.getPaginationProps();
        paginator.setProps({
          items: this.getFilteredItems,
          isRight: true,
          isLeft: true,
          rounded: true,
          shadowless: true,
          paddingless: true,
          transparent: true,
          end: true,
          isSmall: true,
          iconLib: this.iconLib,
          overrideDefaults: this.overrideDefaults
        });
        paginator.setProps(pProps);
        paginator.addEvent(this.$thisvui.events.paginator.updatePage, data => {
          this.updatePage(data);
        });
        if (search) {
          this.createSearch(paginator);
        }
        architect.addChild(paginator);
      }
    },
    createLoading(architect, classes) {
      let transition = architect.createTransition("fade");
      if (this.isLoading) {
        let loading = architect.createDiv("t-loading-block is-absolute");
        let progress = architect.createElement(TProgress).setProps({
          indeterminate: true,
          compact: true,
          height: 3,
          marginless: true
        });
        progress.addProp("target-class", classes, this.isNotNull(classes));
        let block = architect.createDiv("t-loading-block-ui is-absolute");
        loading.addChild(progress);
        loading.addChild(block);
        transition.addChild(loading);
      }
      architect.addChild(transition);
    },
    createCheckAll(architect, inputClass) {
      let self = this;
      let checkContainer = architect.createDiv("table__column--checkable");
      let checkbox = architect.createElement(TCheckbox, "table__row--checker");
      checkbox.value(this.checkAllItems);
      let inputHandler = function(event) {
        let resultValue = event.target ? event.target.value : event;
        self.checkAllItems = resultValue;
      };
      checkbox.addInput(inputHandler);
      checkbox.addProp("input-class", inputClass, inputClass !== undefined);

      checkbox.addChange(this.checkAllRows, true, true);
      checkbox.addClick(
        event => {
          event.stopPropagation();
        },
        true,
        true
      );
      checkContainer.addChild(checkbox);
      architect.addChild(checkContainer);
    },
    createRowChecker(
      architect,
      item,
      { inputClass, container, hasBackgroundColor }
    ) {
      let checkContainer =
        container || architect.createDiv("table__column--checkable");
      let checkbox = architect.createElement(TCheckbox, "table__row--checker");
      checkbox.addAttr("value", this.isRowChecked(item));
      checkbox.addProp("input-class", inputClass, inputClass !== undefined);
      checkbox.setProps({
        hasBackgroundColor: hasBackgroundColor
      });
      checkbox.addChange(
        () => {
          this.checkRow(item);
        },
        true,
        true
      );
      checkbox.addClick(
        event => {
          event.stopPropagation();
        },
        true,
        true
      );
      checkContainer.addChild(checkbox);
      architect.addChild(checkContainer);
    }
  }
};
