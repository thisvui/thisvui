<template>
  <li :id="id" ref="container" :class="getClasses">
    <t-icon
      v-if="model.icon"
      :icon="model.icon"
      :class="`${model.iconClass ? model.iconClass : iconClass}`"
    >
    </t-icon>
    <router-link
      v-if="hasView"
      :to="{ name: model.view }"
      :class="getLinkClasses"
      @click="toggle"
    >
      {{ model.name }}
      <t-tag
        v-if="hasTag"
        :class="`${model.tagClass ? model.tagClass : getTagClasses}`"
        >{{ model.tag }}</t-tag
      >
    </router-link>
    <a v-if="!hasView" :class="getLinkClasses" @click="toggle">
      {{ model.name }}
      <t-tag
        v-if="hasTag"
        :class="`${model.tagClass ? model.tagClass : getTagClasses}`"
        >{{ model.tag }}</t-tag
      >
      <span v-if="isFolder">
        <div v-show="!open" class="icon">
          <t-icon
            :preserve-defaults="!overrideDefaults"
            :icon="closedIcon"
            :container-class="controlIconClass"
          />
        </div>
        <div v-show="open" class="icon">
          <t-icon
            :preserve-defaults="!overrideDefaults"
            :icon="openedIcon"
            :container-class="controlIconClass"
          />
        </div>
      </span>
    </a>
    <t-expand>
      <div ref="children" v-if="isFolder && open" :class="getChildrenClasses">
        <ul>
          <t-tree-nav
            v-for="(child, index) in model.children"
            :key="index"
            :model="child"
            class="item"
            :tag-class="tagClass"
            :icon-class="iconClass"
            :link-class="linkClass"
            :link-opened-class="linkOpenedClass"
            :control-icon-class="controlIconClass"
          />
        </ul>
      </div>
    </t-expand>
  </li>
</template>

<script>
import helpers from "../../mixins/helpers";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TIcon from "../TIcon/TIcon";
import CssArchitect from "../../utils/css-architect";
import TTag from "../TTag/TTag";
import TExpand from "../TAnimation/TExpand";

export default {
  name: "t-tree-nav",
  mixins: [common, tree, icons, helpers],
  components: {
    TExpand,
    TTag,
    TIcon
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
      const cssArchitect = new CssArchitect("t-tree-nav");
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
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-active", this.open);
      cssArchitect.addClass("tree-nav-link", !this.open);
      cssArchitect.addClass(this.linkClass, this.linkClass);
      cssArchitect.addClass(this.linkOpenedClass, this.open);
      return cssArchitect.getClasses();
    }
  },
  created() {
    this.$parent.$on("close-children", id => {
      if (this.id !== id) {
        this.open = false;
      }
    });
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
        if (this.open && this.exclusive) {
          this.$parent.$emit("close-siblings", this.id);
        }
      }
      if (this.model.action) {
        this.model.action();
      }
    }
  }
};
</script>
