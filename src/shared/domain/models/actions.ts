export interface Action {
  template: string;
  target: string;
  props?: any;
}

export type Actions = Action[];
