export type TRecursivePartial<T> = {
  [P in keyof T]?: TRecursivePartial<T[P]>;
};
