const STORAGE_KEY = "entries";

export const loadItems = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const deleteItem = (storedItems, itemDel) => {
  const updatedItems = storedItems.filter((item) => item.id !== itemDel.id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  return updatedItems;
};

export const saveItem = (storedItems, newItem) => {
  if (storedItems.length === 0) {
    newItem.id = 1;
  }

  if (!newItem.id) {
    const maxId = storedItems.length > 0 ? Math.max(...storedItems.map((item) => item.id)) : 0;
    newItem.id = maxId + 1;
  }

  const isIdExist = storedItems.findIndex((existingItem) => existingItem.id === newItem.id) >= 0;
  let updatedItems = isIdExist
    ? storedItems.map((existingItem) =>
        existingItem.id === newItem.id ? { ...existingItem, ...newItem } : existingItem
      )
    : [newItem, ...storedItems]; //ensuring the newly added is on the top of the list here

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  return updatedItems;
};
