import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiButton from './UiButton.vue';

describe('ui_button', () => {
  it('should render correctly', () => {
    const wrapper = mount(UiButton);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const wrapper = mount(UiButton, {
      props: {
        size: 'small',
        template: 'secondary',
        disabled: true,
        isLoading: true,
        rounded: true,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render correctly with slots', () => {
    const wrapper = mount(UiButton, {
      slots: {
        default: 'Button',
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
