export default interface DispatchMessages {
  success(message: string): void

  warning(message: string): void

  error(message: string): void
}
