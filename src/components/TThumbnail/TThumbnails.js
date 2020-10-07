import common from "../../mixins/common";
import {ComponentNames} from "../../utils/constants";
import {createDiv} from "../../utils/element-architect";

export default {
  name: ComponentNames.TThumbnails,
  mixins: [common],
  render: function(h) {
    let root = createDiv(h, ComponentNames.TThumbnails);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
