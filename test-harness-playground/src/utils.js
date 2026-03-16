function normalizeText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim().toLowerCase();
}

function formatItemName(name) {
  if (!name) {
    return "";
  }

  return String(name).trim();
}

function isValidItemName(name) {
  if (name === null || name === undefined) {
    return false;
  }

  if (String(name).trim() === "") {
    return false;
  }

  return true;
}

function groupItemsByCategory(items) {
  const grouped = {};

  for (const item of items) {
    const category = item.category || "general";

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(item);
  }

  return grouped;
}

module.exports = {
  normalizeText,
  formatItemName,
  isValidItemName,
  groupItemsByCategory
};