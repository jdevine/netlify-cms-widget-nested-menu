export const addMissingFields = section => {
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

export const findSection = (id, list) => {
  for (const section of list) {
    if (section.id === id) return section;
    if (!section.children) continue;
    const found = findSection(id, section.children);
    if (found) return found;
  }
  return undefined;
};

export const findSubList = (parentId, list) =>
  parentId == "root" ? list : findSection(parentId, list).children;
