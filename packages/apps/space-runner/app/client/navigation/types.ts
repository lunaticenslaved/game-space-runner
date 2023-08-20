export enum AccessLevel {
  Private,
  Public,
  Common,
}

export type RouteSetting = {
  path: string;
  access: AccessLevel;
};
