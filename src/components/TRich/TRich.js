import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import themes from "../../mixins/themes";
import validation from "../../mixins/validation";
import {ComponentNames} from "../../utils/constants";
import { TSelect } from "../TSelect";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";


export default {
  name: ComponentNames.TRich,
  mixins: [common, themes, icons, validation, helpers],
  props: {
    label: {
      type: String
    },
    value: {
      type: String
    },
    labelIcon: String,
    labelClass: String,
    disabled: Boolean,
    defaultFontFamily: {
      type: String,
      default: "Arial"
    },
    toolbarClass: {
      type: String
    },
    boldIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richBold;
      }
    },
    italicIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richItalic;
      }
    },
    underlineIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richUnderline;
      }
    },
    strikethroughIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richStrikethrough;
      }
    },
    orderedlistIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richOrderedList;
      }
    },
    unorderedlistIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richUnorderedList;
      }
    },
    alignLeftIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richAlignLeft;
      }
    },
    alignRightIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richAlignRight;
      }
    },
    alignCenterIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richAlignCenter;
      }
    },
    alignJustifyIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richAlignJustify;
      }
    },
    removeFormatIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.richRemoveFormat;
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect(ComponentNames.TRich);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addStyles([this.getAlphaModifiers]);
      this.setupThemeModifier(css, true);
      return css;
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const css = new CssArchitect(`${ComponentNames.TRich}__label`);
      css.addClass(this.labelClass, this.isNotNull(this.labelClass));
      css.addClass("is-inline-flex", this.isNotNull(this.labelIcon));
      this.isColored(css, { shade: 25 });
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the rich toolbar
     * @returns { A String with the chained css classes }
     */
    getToolbarClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TRich}__toolbar`);
      css.addClass(this.toolbarClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the rich body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TRich}__body`);
      return css.getClasses();
    }
  },
  watch: {
    disabled: function(newVal, oldVal) {
      this.configEditable(this.editor);
    }
  },
  data() {
    return {
      focused: false,
      editor: null,
      formId: null,
      commands: [
        {
          name: "Bold",
          icon: this.boldIcon,
          command: "Bold",
          active: true,
          pressed: false
        },
        {
          name: "Italic",
          icon: this.italicIcon,
          command: "Italic",
          active: true,
          pressed: false
        },
        {
          name: "Underline",
          icon: this.underlineIcon,
          command: "Underline",
          active: true,
          pressed: false
        },
        {
          name: "StrikethroughIcon",
          icon: this.strikethroughIcon,
          command: "Strikethrough",
          active: true,
          pressed: false
        },
        {
          name: "RemoveFormat",
          icon: this.removeFormatIcon,
          command: "RemoveFormat",
          active: true,
          pressed: false
        },
        {
          name: "InsertOrderedList",
          icon: this.orderedlistIcon,
          command: "InsertOrderedList",
          arg: `ol-${Math.round(Math.random() * 1000)}`,
          active: true,
          pressed: false
        },
        {
          name: "InsertUnorderedList",
          icon: this.unorderedlistIcon,
          command: "InsertUnorderedList",
          arg: `ul-${Math.round(Math.random() * 1000)}`,
          active: true,
          pressed: false
        },
        {
          name: "Heading",
          command: "FormatBlock",
          active: true,
          select: true,
          values: ["H1", "H2", "H3", "H4", "H5", "H6"],
          pressed: false
        },
        {
          name: "FontSize",
          command: "FontSize",
          active: true,
          select: true,
          values: [1, 2, 3, 4, 5, 6, 7],
          pressed: false
        },
        {
          name: "justifyLeft",
          icon: this.alignLeftIcon,
          command: "justifyLeft",
          active: true,
          pressed: false
        },
        {
          name: "justifyCenter",
          icon: this.alignCenterIcon,
          command: "justifyCenter",
          active: true,
          pressed: false
        },
        {
          name: "justifyRight",
          icon: this.alignRightIcon,
          command: "justifyRight",
          active: true,
          pressed: false
        },
        {
          name: "justifyFull",
          icon: this.alignJustifyIcon,
          command: "justifyFull",
          active: true,
          pressed: false
        }
      ]
    };
  },
  methods: {
    onChange(code) {
      this.$emit(this.$thisvui.events.common.input, code);
    },
    onFocus() {
      this.focused = true;
    },
    onBlur() {
      this.$emit(this.$thisvui.events.common.blur);
      this.focused = false;
    },
    onKeyup(event) {
      let result = this.validateOnEvent("enter");
      if (result && result.valid) {
        this.$emit(this.$thisvui.events.common.onEnter);
      }
    },
    execCommand({ command, arg = null }) {
      if (this.editor) {
        this.editor.execCommand(command, false, arg);
      }
    },
    configEditable(editor){
      let editorBody = editor.body;
      if ("contentEditable" in editorBody) {
        // allow contentEditable
        editorBody.contentEditable = !this.disabled;
      } else {
        // Firefox earlier than version 3
        if ("designMode" in editor) {
          // turn on designMode
          editor.designMode = !this.disabled ? "on": "off";
        }
      }
    },
    configBody(editor) {
      if (editor) {
        if (this.isNotEmpty(this.value)) {
          editor.write(this.value);
        }
        let editorBody = editor.body;
        if (!this.disabled) {
          editorBody.style.fontFamily = this.defaultFontFamily;

          // Turn off spellcheck
          if ("spellcheck" in editorBody) {
            // For Firefox
            editorBody.spellcheck = false;
          }

          this.configEditable(editor);
          editorBody.oninput = e => {
            this.onChange(editorBody.innerHTML);
          };
          editorBody.onblur = e => {
            this.onBlur();
          };
        }
      }
    },
    loadEditor() {
      let iframe = this.$refs[`${this.id}_iframe`];
      if (!iframe) {
        console.warn(`${this.id}_iframe not found`);
      } else {
        iframe.onload = e => {
          iframe.width = "100%";
          let editor = iframe.contentWindow.document;
          this.configBody(editor);
          this.editor = editor;
        };
      }
    },
    /**
     * Creates command buttons
     */
    createCommands(architect) {
      for (let command of this.commands) {
        if (command.active) {
          let commandWrapper = architect.createSpan();
          if (command.select) {
            let selectValue = null;
            let commandSelect = architect.createElement(TSelect);
            let commandSelectProps = {
              items: command.values,
              removeLabel: true,
              allowEmptyValue: false,
              compact: true,
              small: true,
              shadowless: true,
              value: selectValue
            };
            commandSelect.setProps(commandSelectProps);
            commandSelect.addProp(
              "inputClass",
              this.themeModifier,
              this.hasThemeModifier
            );
            commandSelect.addInput(value => {
              selectValue = value;
              command.arg = selectValue;
              this.execCommand(command);
            }); // Emulates v-model
            commandWrapper.addChild(commandSelect);
          } else {
            let commandButton = architect.createButton(this.getOpenIconClass);
            commandButton.setProps({
              icon: command.icon,
              compact: true,
              text: true
            });
            commandButton.addProp("preserveDefaults", !this.overrideDefaults);
            commandButton.addProp(
              "targetClass",
              this.themeModifier,
              this.hasThemeModifier
            );
            commandWrapper.addClick(() => {
              this.execCommand(command);
            });
            commandWrapper.addChild(commandButton);
          }
          architect.addChild(commandWrapper);
        }
      }
    },
    createToolbar(architect) {
      let toolbar = architect.createDiv(this.getToolbarClasses);
      toolbar.setStyles(this.getAlphaModifiers);
      this.createCommands(toolbar);
      architect.addChild(toolbar);
    },
    /**
     * Creates the field label section
     */
    createLabel(architect, cssClasses) {
      let label = architect.createLabel(this.getLabelClass);
      label.addClass(cssClasses);
      label.addAttr("for", this.id);
      label.addDomProp("innerHTML", this.label);
      architect.addChild(label, this.isNotEmpty(this.label));
    },
    createIframe(architect) {
      let iframe = architect.createElement("iframe", `${ComponentNames.TRich}__input`);
      let id = `${this.id}_iframe`;
      iframe.setId(id);
      iframe.setRef(id);
      iframe.setAttrs({
        name: id,
        frameborder: 0,
        validationScope: this.validationScope
      });
      architect.addChild(iframe);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getCss.getClasses());
    root.setId(this.id);
    this.createLabel(root);
    this.createToolbar(root);

    let body = root.createDiv(this.getBodyClasses);
    let content = root.createDiv(`${ComponentNames.TRich}__content`);
    this.createIframe(content);
    body.addChild(content);
    root.addChild(body);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
    this.loadEditor();
  }
};
