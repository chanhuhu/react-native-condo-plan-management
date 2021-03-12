export type PlanParams = {
  id: string;
  floor: string;
  planURL: string;
  create_at?: Date;
  update_at?: Date;
};

export type RootNavigatorParamsList = {
  Home: undefined;
  Plan: PlanParams;
  Project: undefined;
};
