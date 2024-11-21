const isObject = (val: any) => {
  return (
    typeof val === 'object' &&
    !Array.isArray(val) &&
    val !== null &&
    val !== 'function'
  );
};

export default isObject;
