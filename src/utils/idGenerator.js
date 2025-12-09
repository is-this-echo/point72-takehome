let counter = 1;

exports.generateId = () => {
  const id = counter;
  counter += 1;
  return String(id);
};
