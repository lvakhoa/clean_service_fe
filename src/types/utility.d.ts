/**
 * Same as Partial<T> but goes deeper and makes Partial<T> all its properties and sub-properties.
 */
type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer M>
      ? Set<DeepPartial<M>>
      : T extends object
      ? {
          [K in keyof T]?: DeepPartial<T[K]>;
        }
      : T);

/**
 * List of T-s passed as an array or object map.
 *
 * Example usage: entities as an array of imported using import * as syntax.
 */
type MixedList<T> =
  | T[]
  | {
      [key: string]: T;
    };

/**
 * Remove keys with `never` value from object type
 * */
type NonNever<T extends {}> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends never ? never : K;
  }[keyof T]
>;

/**
 * Pick only the keys that match the Type `U`
 */
type PickKeysByType<T, U> = string &
  keyof {
    [P in keyof T as T[P] extends U ? P : never]: T[P];
  };
