import { describe, expect, it, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';

import UiConfirmDialog from './UiConfirmDialog.vue';
import UiButton from '../ui_button/UiButton.vue';
import UiDialog from '../ui_dialog/UiDialog.vue';

let wrapper: any;

beforeEach(() => {
  wrapper = shallowMount(UiConfirmDialog, {
    global: {
      stubs: {
        UiButton,
        UiDialog,
      },
    },
  });
});

describe('ui_confirm_dialog', () => {
  it('should render correctly', () => {
    expect(wrapper.findComponent(UiConfirmDialog)).toBeTruthy();
  });

  it('should render correctly with content', async () => {
    await wrapper.trigger();

    expect(wrapper.find('[data-test="ui-confirm-dialog-header"]'));
  });
});
