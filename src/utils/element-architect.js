/**
 * Helper class for building elements dynamically in render functions
 */
import { TButton } from "../components/TButton";
import { TIcon } from "../components/TIcon";
import keycodes from "./keycodes";

export default class ElementArchitect {
  constructor(createFunction, type, classes) {
    this.createFunction = createFunction;
    this.type = type;
    this.classes = classes;
    this.styles = [];
    this.children = [];
    this.keycode = keycodes;
  }

  /**
   * Add class value to the array
   * @param cssClass
   * @param conditionStatement
   * @param unlessClass
   */
  setClasses(classes) {
    this.classes = classes;
    return this;
  }

  addClass(clazz, condition = true) {
    if (condition) {
      if (!this.classes) {
        this.classes = "";
      }
      let classes = [this.classes, clazz];
      this.setClasses(classes.join(" "));
    }
    return this;
  }

  setStyles(styles) {
    this.styles = styles;
    return this;
  }

  setId(id) {
    if (id) {
      this.addAttr("id", id);
    }
    return this;
  }

  setKey(key) {
    if (key) {
      this.key = key;
    }
    return this;
  }

  setRef(ref, refInFor = false) {
    if (ref) {
      this.ref = ref;
    }
    this.refInFor = refInFor;
    return this;
  }

  setAttrs(attrs) {
    if (!this.attrs) {
      this.attrs = {};
    }
    if (attrs) {
      this.attrs = { ...attrs, ...this.attrs };
    }
    return this;
  }

  addAttr(name, value, conditionStatement = true) {
    if (!this.attrs) {
      this.attrs = {};
    }
    if (name !== undefined && value !== undefined && conditionStatement) {
      this.attrs[name] = value;
    }
    return this;
  }

  setProps(props) {
    if (!this.props) {
      this.props = {};
    }
    if (props) {
      this.props = { ...props, ...this.props };
    }
    return this;
  }

  addProp(name, value, conditionStatement = true) {
    if (!this.props) {
      this.props = {};
    }
    if (name !== undefined && value !== undefined && conditionStatement) {
      this.props[name] = value;
    }
    return this;
  }

  setDomProps(domProps) {
    if (!this.domProps) {
      this.domProps = {};
    }
    if (domProps) {
      this.domProps = { ...domProps, ...this.domProps };
    }
    return this;
  }

  addDomProp(name, value, conditionStatement = true) {
    if (!this.domProps) {
      this.domProps = {};
    }
    if (name !== undefined && value !== undefined && conditionStatement) {
      this.domProps[name] = value;
    }
    return this;
  }

  innerHtml(value, conditionStatement = true) {
    return this.addDomProp("innerHTML", value, conditionStatement);
  }

  value(value, conditionStatement = true) {
    return this.addDomProp("value", value, conditionStatement);
  }

  setEvents(events) {
    if (!this.events) {
      this.events = {};
    }
    if (events) {
      this.events = { ...events, ...this.events };
    }
    return this;
  }

  addEvent(name, handler, conditionStatement = true, native = false) {
    if (!native && !this.events) {
      this.events = {};
    }
    if (native && !this.native) {
      this.native = {};
    }
    if (name !== undefined && handler !== undefined && conditionStatement) {
      if (native) {
        this.native[name] = handler;
      } else {
        this.events[name] = handler;
      }
    }
    return this;
  }

  addKeyup(config, conditionStatement = true) {
    if (!config || !config.key || !config.handler) {
      console.error(`Config error: `, config);
      throw new Error(
        "keyup event needs a key code and a handler in order to work!"
      );
    }
    if (!this.keyup) {
      this.keyup = [];
    }
    if (conditionStatement) {
      this.keyup.push(config);
    }
    return this;
  }

  addKeydown(config, conditionStatement = true) {
    if (!config || !config.key || !config.handler) {
      console.error(`Config error: `, config);
      throw new Error(
        "keydown event needs a key code and a handler in order to work!"
      );
    }
    if (!this.keydown) {
      this.keydown = [];
    }
    if (conditionStatement) {
      this.keydown.push(config);
    }
    return this;
  }

  addClick(handler, conditionStatement = true, native = false) {
    return this.addEvent("click", handler, conditionStatement, native);
  }

  addChange(handler, conditionStatement = true, native = false) {
    return this.addEvent("change", handler, conditionStatement, native);
  }

  addBlur(handler, conditionStatement = true, native = false) {
    return this.addEvent("blur", handler, conditionStatement, native);
  }

  addInput(handler, conditionStatement = true) {
    return this.addEvent("input", handler, conditionStatement);
  }

  setSlot(slot) {
    this.slot = slot;
    return this;
  }

  setChildren(children) {
    if (children) {
      this.children = children;
    }
    return this;
  }

  addChild(child, conditionStatement = true, raw = false) {
    if (child && conditionStatement) {
      let childEl = raw ? child : child.create();
      this.children.push(childEl);
    }
    return this;
  }

  addChildren(children, conditionStatement = true){
    Array.prototype.push.apply(this.children, children);
  }

  setDirectives(directives) {
    if (directives) {
      this.directives = directives;
    }
    return this;
  }

  addDirective(directive, conditionStatement = true) {
    if (!this.directives) {
      this.directives = [];
    }
    if (directive && conditionStatement) {
      this.directives.push(directive);
    }
    return this;
  }

  /**
   * Returns a String of the chained css classes
   * @returns {string}
   */
  create() {
    let element = {};
    if (this.key) {
      element.key = this.key;
    }
    if (this.ref) {
      element.ref = this.ref;
    }
    if (this.refInFor) {
      element.refInFor = true;
    }
    if (this.classes) {
      element.class = this.classes;
    }
    if (this.attrs) {
      element.attrs = this.attrs;
    }
    if (this.props) {
      element.props = this.props;
    }
    if (this.domProps) {
      element.domProps = this.domProps;
    }
    if (this.styles) {
      element.style = this.styles;
    }
    if (this.slot) {
      element.slot = this.slot;
    }
    if (this.events) {
      element.on = this.events;
    }
    if (this.native) {
      element.nativeOn = this.native;
    }
    if (this.directives) {
      element.directives = this.directives;
    }
    if (this.keyup) {
      let keyup = event => {
        // Abort if the element emitting the event is not
        // the element the event is bound to
        if (event.target !== event.currentTarget) return;

        for (let config of this.keyup) {
          let shiftKey =
            config.shiftKey && config.shiftKey === true ? event.shiftKey : true;
          let ctrlKey =
            config.ctrlKey && config.ctrlKey === true ? event.ctrlKey : true;
          if (shiftKey && ctrlKey && event.keyCode === config.key) {
            // Prevent the default keyup handler for this element
            event.preventDefault();
            config.handler();
          }
        }
      };
      if (!element.on) {
        element.on = {};
      }
      element.on.keyup = keyup;
    }
    if (this.keydown) {
      let keydown = event => {
        // Abort if the element emitting the event is not
        // the element the event is bound to
        if (event.target !== event.currentTarget) return;

        for (let config of this.keydown) {
          let shiftKey =
            config.shiftKey && config.shiftKey === true ? event.shiftKey : true;
          let ctrlKey =
            config.ctrlKey && config.ctrlKey === true ? event.ctrlKey : true;
          if (shiftKey && ctrlKey && event.keyCode === config.key) {
            // Prevent the default keyup handler for this element
            event.preventDefault();
            config.handler();
          }
        }
      };
      if (!element.on) {
        element.on = {};
      }
      element.on.keydown = keydown;
    }
    return this.createFunction(this.type, element, this.children);
  }

  createElement(element, classes) {
    return new ElementArchitect(this.createFunction, element, classes);
  }

  createDiv(classes) {
    return this.createElement("div", classes);
  }

  createSpan(classes) {
    return this.createElement("span", classes);
  }

  createH(level = 1, classes) {
    return this.createElement(`h${level}`, classes);
  }

  createA(classes) {
    return this.createElement("a", classes);
  }

  createImg(classes) {
    return this.createElement("img", classes);
  }

  createNav(classes) {
    return this.createElement("nav", classes);
  }

  createUl(classes) {
    return this.createElement("ul", classes);
  }

  createLi(classes) {
    return this.createElement("li", classes);
  }

  createLabel(classes) {
    return this.createElement("label", classes);
  }

  createInput(classes) {
    return this.createElement("input", classes);
  }

  createSelect(classes) {
    return this.createElement("select", classes);
  }

  createP(classes) {
    return this.createElement("p", classes);
  }

  createButton(classes) {
    return this.createElement(TButton, classes);
  }

  createIcon(classes) {
    return this.createElement(TIcon, classes);
  }

  createTransition(name) {
    let transition = this.createElement("transition");
    transition.setProps({ name: name });
    return transition;
  }
}
