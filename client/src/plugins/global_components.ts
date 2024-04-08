import { App } from 'vue';

import UiComponents from '@/components/ui';

const globalComponents = [...UiComponents];

export default function registerGlobalComponents(app: App): void {
  globalComponents.forEach((element) => {
    app.component(element.name, element.component);
  });
}
