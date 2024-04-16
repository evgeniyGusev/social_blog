<template>
  <ui-dialog :model-value="isDialogVisible" class="ui-confirm-dialog" :closable="false">
    <slot name="header">
      {{ content.head }}
    </slot>

    <slot>
      {{ content.body }}
    </slot>

    <nav class="ui-confirm-dialog-buttons">
      <slot name="buttons">
        <ui-button :disabled="disabled" :loading="loading" size="large" type="button" @click="confirm">
          {{ content.confirm }}
        </ui-button>

        <ui-button template="secondary" size="large" type="button" @click="cancel">
          {{ content.cancel }}
        </ui-button>
      </slot>
    </nav>
  </ui-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

import { IUiConfirmDialogProps, IUiConfirmDialogContent } from '@/components/ui/ui_dialog/interfaces.ts';

defineProps<IUiConfirmDialogProps>();

const emit = defineEmits(['confirm', 'cancel', 'open']);

const DEFAULT_CONTENT: IUiConfirmDialogContent = {
  body: 'Вы действительно хотите выполнить это действие?',
  cancel: 'Нет',
  confirm: 'Да',
  head: 'Подтверждение действия',
};

const isDialogVisible = ref(false);

const content = reactive(DEFAULT_CONTENT);

const callbacks = reactive({ resolve: (value: any) => value, reject: () => {} });

function resetCallbacks(resolve: (value: any) => void = () => {}, reject: () => void = () => {}): void {
  callbacks.resolve = resolve;
  callbacks.reject = reject;
}

function applyIncomingContent(incomingContent: IUiConfirmDialogContent = DEFAULT_CONTENT): void {
  Object.keys(DEFAULT_CONTENT).forEach((key) => {
    content[key as keyof IUiConfirmDialogContent] = incomingContent[key as keyof IUiConfirmDialogContent];
  });
}

const open = (incomingContent: IUiConfirmDialogContent = DEFAULT_CONTENT) =>
  new Promise((resolve, reject) => {
    applyIncomingContent(incomingContent);

    resetCallbacks(resolve, reject);

    isDialogVisible.value = true;

    emit('open');
  });

const confirm = () => {
  callbacks.resolve?.(true);

  resetCallbacks();

  isDialogVisible.value = false;

  emit('confirm');
};

const cancel = () => {
  callbacks.reject?.();

  resetCallbacks();

  isDialogVisible.value = false;

  emit('cancel');
};

defineExpose({
  cancel,
  confirm,
  open,
});
</script>

<style scoped lang="scss">
.ui-confirm-dialog-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
