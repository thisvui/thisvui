// recursively search for possible transition defined inside the component root
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode;
}

function enter(el, display, transitionClass) {
  addClass(el, transitionClass);
  setTimeout(() => {
    el.style.display = display;
  });
}

function leave(el, transitionClass) {
  removeClass(el, transitionClass);
  setTimeout(() => {
    el.style.display = "none";
  });
}

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(c => el.classList.add(c));
    } else {
      el.classList.add(cls);
    }
  } else {
    const cur = ` ${el.getAttribute("class") || ""} `;
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(c => el.classList.remove(c));
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    let cur = ` ${el.getAttribute("class") || ""} `;
    const tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}

export default {
  bind(el, { value }, vnode) {
    vnode = locateNode(vnode);
    const transition = vnode.data && vnode.data.transition;
    const originalDisplay = (el.__vOriginalDisplay =
      el.style.display === "none" ? "" : el.style.display);
    let display = value.active ? originalDisplay : "none";
    if (value.active && transition) {
      vnode.data.show = true;
      enter(el, display, value.transitionClass);
    } else {
      el.style.display = display;
    }
  },

  update(el, { value, oldValue }, vnode) {
    /* istanbul ignore if */
    if (!value.active === !oldValue.active) return;
    vnode = locateNode(vnode);
    let display = value.active ? el.__vOriginalDisplay : "none";
    const transition = vnode.data && vnode.data.transition;
    if (transition) {
      vnode.data.show = true;
      if (value.active) {
        enter(el, display, value.transitionClass);
      } else {
        leave(el, value.transitionClass);
      }
    } else {
      el.style.display = display;
    }
  },

  unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
