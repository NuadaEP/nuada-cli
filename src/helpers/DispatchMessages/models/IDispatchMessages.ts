export interface IDispatchMessages {
  success: (message: string) => void;

  warning: (message: string) => void;

  error: (message: string) => void;
}
