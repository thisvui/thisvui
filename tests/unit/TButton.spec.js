import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import { TButton } from "@/components/TButton";
import utils from "@/utils/utils";

import notification from "@/mixins/notification";
import ThisVuiConfig from "@/components/ThisVui/config";

describe("TButton", () => {
  it("Renders button with default slot", () => {
    const wrapper = shallowMount(TButton, {
      mocks: { $_utils: utils },
      slots: {
        default: ["Button"]
      }
    });
    let button = wrapper.find(".t-button");
    let content = button.find(".t-button__content");
    expect(content.isVisible()).toBe(true);
    expect(content.classes()).not.toContain("icon-left");
    expect(content.text()).toBe("Button");
  });

  it("Renders disabled button", () => {
    const wrapper = shallowMount(TButton, {
      mocks: { $_utils: utils },
      propsData: { disabled: true }
    });
    let button = wrapper.find(".t-button");
    expect(button.element.tagName).toBe("SPAN");
    expect(button.isVisible()).toBe(true);
    expect(button.classes()).toContain("disabled");
  });

  it("Renders button with icon", async () => {
    let config = new ThisVuiConfig({});
    const optionsConfig = config.getOptions();
    const localVue = createLocalVue();
    localVue.prototype.$thisvui = createLocalVue({
      mixins: [notification],
      data: optionsConfig
    });

    localVue.prototype.$_utils = utils;
    const wrapper = mount(TButton, {
      localVue,
      propsData: { icon: "fas fa-home" },
      slots: {
        default: ["Button"]
      }
    });

    let button = wrapper.find(".t-button");
    let icon = button.find(".t-icon");
    let content = button.find(".t-button__content");
    expect(icon.isVisible()).toBe(true);
    expect(content.isVisible()).toBe(true);
    expect(content.classes()).toContain("icon-left");
    expect(content.classes()).not.toContain("icon-right");
    expect(content.text()).toBe("Button");
  });
  it("Renders button with icon to the right", async () => {
    let config = new ThisVuiConfig({});
    const optionsConfig = config.getOptions();
    const localVue = createLocalVue();
    localVue.prototype.$thisvui = createLocalVue({
      mixins: [notification],
      data: optionsConfig
    });

    localVue.prototype.$_utils = utils;
    const wrapper = mount(TButton, {
      localVue,
      propsData: { icon: "fas fa-home", iconRight: true },
      slots: {
        default: ["Button"]
      }
    });

    let button = wrapper.find(".t-button");
    let icon = button.find(".t-icon");
    let content = button.find(".t-button__content");
    expect(icon.isVisible()).toBe(true);
    expect(content.isVisible()).toBe(true);
    expect(content.classes()).toContain("icon-right");
    expect(content.classes()).not.toContain("icon-left");
    expect(content.text()).toBe("Button");
  });
});
