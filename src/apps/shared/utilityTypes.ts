export type PartialAllButSelected<T, K extends keyof T> = Omit<Partial<T>, K> & { [P in K]: T[P] };

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// For best looking of a type
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
