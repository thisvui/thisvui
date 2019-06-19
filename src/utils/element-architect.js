/**
 * Helper class for building elements dynamically
 */
import { TButton } from "../components/TButton";
import { TIcon } from "../components/TIcon";

export default class ElementArchitect {
  constructor(createFunction, type, classes) {
    this.createFunction = createFunction;
    this.type = type;
    this.classes = classes;
    this.styles = [];
    this.children = [];
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

  addClass(clazz) {
    if(!this.classes){
      this.classes = ""
    }
    let classes = [this.classes, clazz]
    this.setClasses(classes.join(" "))
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

  setRef(ref) {
    if (ref) {
      this.ref = ref;
    }
    return this;
  }

  setAttrs(attrs) {
    if (attrs) {
      this.attrs = attrs;
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
    if (props) {
      this.props = props;
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
    if (domProps) {
      this.domProps = domProps;
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

  setEvents(events) {
    if (events) {
      this.events = events;
    }
    return this;
  }

  addEvent(name, value, conditionStatement = true, native = false) {
    if (!native && !this.events) {
      this.events = {};
    }
    if (native && !this.native) {
      this.native = {};
    }
    if (name !== undefined && value !== undefined && conditionStatement) {
      if (native) {
        this.native[name] = value;
      } else {
        this.events[name] = value;
      }
    }
    return this;
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

  addChild(child, conditionStatement = true) {
    if (child && conditionStatement) {
      this.children.push(child.create());
    }
    return this;
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
}
