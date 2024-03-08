export const removeUndefined = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (newObj[key] === undefined) {
      delete newObj[key];
    }
  });
  return newObj;
};
