const config = require("./config");
const {
  normalizeText,
  formatItemName,
  isValidItemName,
  groupItemsByCategory
} = require("./utils");

const items = [
  { id: 1, name: "Buy milk", category: "home" },
  { id: 2, name: "Read book", category: "study" },
  { id: 3, name: "Call mom", category: "social" },
  { id: 4, name: "Clean room", category: "home" }
];

function addItem(name, category) {
  const finalCategory = category || config.defaultCategory;

  if (!config.allowEmptyItems && !isValidItemName(name)) {
    console.log("Invalid item name");
    return;
  }

  if (items.length >= config.maxItems) {
    console.log("Too many items");
    return;
  }

  const newItem = {
    id: items.length + 1,
    name: formatItemName(name),
    category: finalCategory
  };

  items.push(newItem);
}

function renderItems(list) {
  console.log("== " + config.appName + " ==");
  for (const item of list) {
    console.log(`[${item.id}] ${item.name} (${item.category})`);
  }
}

function findItemsByKeyword(keyword) {
  const normalizedKeyword = normalizeText(keyword);
  const result = [];

  for (const item of items) {
    const normalizedName = normalizeText(item.name);
    if (normalizedName.includes(normalizedKeyword)) {
      result.push(item);
    }
  }

  return result;
}

function printGroupedItems() {
  const grouped = groupItemsByCategory(items);
  const categories = Object.keys(grouped);

  for (const category of categories) {
    console.log("");
    console.log("Category: " + category);
    for (const item of grouped[category]) {
      console.log("- " + item.name);
    }
  }
}

renderItems(items);
console.log("");
console.log("Search result for 'book':");
renderItems(findItemsByKeyword("book"));
console.log("");
console.log("Grouped view:");
printGroupedItems();
console.log("");
console.log("Adding item...");
addItem("Go running", "health");
console.log("");
console.log("After add:");
renderItems(items);