import { App, DirectiveBinding } from 'vue';

const vInputFocus = {
  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    if (binding?.arg === 'with-ui') {
      const uiInput = el.children?.namedItem('ui-input') as HTMLInputElement;

      if (uiInput) {
        uiInput.focus();
      }
    } else {
      el.focus();
    }
  },
};

const directives = [{ name: 'inputFocus', settings: vInputFocus }];

export default function registerGlobalDirectives(app: App): void {
  directives.forEach((dir) => {
    app.directive(dir.name, dir.settings);
  });
}
