const validateObject = (
  obj: DeepPartial<Record<string, any>>
): Record<string, any> | undefined => {
  const dict = Object.entries(obj);
  if (dict.every((item) => !!item[1])) {
    // Safe cast Partial<T> to T
    return Object.assign(obj, {
      value1: obj.value1,
      value2: obj.value2,
    });
  }
  return undefined;
};
