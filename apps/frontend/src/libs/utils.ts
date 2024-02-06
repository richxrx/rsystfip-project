const objEquals = (obj1: {}, obj2: {}) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  if (keysObj1.length !== keysObj2.length) return false;

  for (let i = 0; i < keysObj1.length; i++) {
    const key = keysObj1[i];
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
};

const createColumn = (field: string, headerName: string, width: number) => ({
  field,
  headerName,
  width,
});

export { createColumn, objEquals };
