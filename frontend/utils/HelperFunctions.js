// CRUD helper functions
export const addItemToArray = (state, newItem) => [...state, newItem];

export const updateItemFromArray = (state, newItem) => {
  return state.map((item) => (item.id === newItem.id ? newItem : item));
};

export const removeItemFromArrayById = (state, idToDelete) => {
  return state.filter(item => item.id !== idToDelete);
};

// Poultry Calculations
export const calculateAgeDays = (birthday) => {
  const today = new Date();
  const birth = new Date(birthday);
  const diff = today.getTime() - birth.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const calculateInactive = (chicken) => {
  return chicken.initialQuantity - chicken.active;
};

export const calculateCountdown = (chicken) => {
  if (!chicken.cullingDate) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cullDate = new Date(chicken.cullingDate);
  cullDate.setHours(0, 0, 0, 0);

  const diff = cullDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};