export type Processor<T = Record<string, unknown>> = {
  success: boolean;
  data: {
    message: string;
    data?: T;
  };
};
