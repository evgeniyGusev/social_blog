export interface IUiButtonProps {
  size?: 'small' | 'medium' | 'large';
  template?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'link';
  disabled?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
}
