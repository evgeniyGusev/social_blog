export interface IUiConfirmDialogProps {
  disabled?: boolean;
  loading?: boolean;
}

export interface IUiConfirmDialogContent {
  head: string;
  body: string;
  confirm: string;
  cancel: string;
}
