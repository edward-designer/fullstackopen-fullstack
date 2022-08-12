export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isDate = (date: string): boolean => {
  if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return Boolean(Date.parse(date));
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};
