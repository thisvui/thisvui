import {ComponentNames} from "../../utils/constants";
import {createDiv} from "../../utils/element-architect";

export default {
  name: ComponentNames.TThumbnail,
  render: function(h) {
    let root = createDiv(h, ComponentNames.TThumbnail);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
