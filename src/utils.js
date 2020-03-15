export var  addMissingFields = section => {
  section.id =
    section.id ||
    Math.random()
      .toString(36)
      .substr(2, 9);
  section.text = section.text || "";
  section.children = section.children || [];
  if (section.children) section.children.map(addMissingFields);
  return section;
};