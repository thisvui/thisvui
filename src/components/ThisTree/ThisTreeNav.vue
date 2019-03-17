<template>
  <li :id="id" ref="container" :class="getClasses">
    <this-icon
      v-if="model.icon"
      :icon="model.icon"
      :class="`${model.iconClass ? model.iconClass : iconClass}`"
    >
    </this-icon>
    <router-link
      v-if="hasView"
      :to="{ name: model.view }"
      :class="getLinkClasses"
      @click="toggle"
    >
      {{ model.name }}
      <this-tag
        v-if="hasTag"
        :class="`${model.tagClass ? model.tagClass : getTagClasses}`"
        >{{ model.tag }}</this-tag
      >
    </router-link>
    <a v-if="!hasView" :class="getLinkClasses" @click="toggle">
      {{ model.name }}
      <this-tag
        v-if="hasTag"
        :class="`${model.tagClass ? model.tagClass : getTagClasses}`"
        >{{ model.tag }}</this-tag
      >
      <span v-if="isFolder">
        <div v-show="!open" class="icon"><i :class="closedIcon" /></div>
        <div v-show="open" class="icon"><i :class="openedIcon" /></div>
      </span>
    </a>
    <this-expand>
      <div ref="children" v-if="isFolder && open" :class="getChildrenClasses">
        <ul>
          <this-tree-nav
            v-for="(child, index) in model.children"
            :key="index"
            :model="child"
            class="item"
            :tag-class="tagClass"
            :icon-class="iconClass"
            :link-class="linkClass"
          />
        </ul>
      </div>
    </this-expand>
  </li>
</template>

<script>
import helpers from "../../mixins/helpers";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import ThisIcon from "../ThisIcon/ThisIcon";
import Vue from "vue";
import CssArchitect from "../../utils/css-architect";
import ThisTag from "../ThisTag/ThisTag";
import ThisExpand from "../ThisAnimation/ThisExpand";

export default {
  name: "ThisTreeNav",
  mixins: [common, helpers, tree],
  components: {
    ThisExpand,
    ThisTag,
    ThisIcon
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length;
    },
    hasView: function() {
      return this.model.view && this.model.view.length;
    },
    hasTag: function() {
      return this.model.tag && this.model.tag.length;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("this-tree-nav");
      cssArchitect.addClass("list-style-none", this.removeListStyle);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the children container
     * @returns { A String with the chained css classes }
     */
    getChildrenClasses: function() {
      const cssArchitect = new CssArchitect("tree-children");
      cssArchitect.addClass("is-collapsed", !this.open);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the tag elements
     * @returns { A String with the chained css classes }
     */
    getTagClasses: function() {
      const cssArchitect = new CssArchitect("tag");
      cssArchitect.addClass(this.tagClass, this.tagClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the link elements
     * @returns { A String with the chained css classes }
     */
    getLinkClasses: function() {
      let className = this.open ? "is-active" : "link";
      const cssArchitect = new CssArchitect(className);
      cssArchitect.addClass(this.linkClass, this.linkClass);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
      }
      if (this.model.action) {
        this.model.action();
      }
    }
  }
};
</script>
