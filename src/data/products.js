
// Mock products data - 100 grocery items with varied categories, prices, and locations
export const products = [
  // Dairy Products
  { productId: "P001", name: "Whole Milk", category: "Dairy", price: 3.99, stockQuantity: 45, aisle: "Aisle 1", shelf: "Shelf A" },
  { productId: "P002", name: "Greek Yogurt", category: "Dairy", price: 5.49, stockQuantity: 32, aisle: "Aisle 1", shelf: "Shelf A" },
  { productId: "P003", name: "Cheddar Cheese", category: "Dairy", price: 4.99, stockQuantity: 28, aisle: "Aisle 1", shelf: "Shelf B" },
  { productId: "P004", name: "Butter", category: "Dairy", price: 4.29, stockQuantity: 38, aisle: "Aisle 1", shelf: "Shelf B" },
  { productId: "P005", name: "Cream Cheese", category: "Dairy", price: 2.99, stockQuantity: 25, aisle: "Aisle 1", shelf: "Shelf C" },
  
  // Grains & Cereals
  { productId: "P006", name: "White Rice", category: "Grains", price: 2.99, stockQuantity: 65, aisle: "Aisle 2", shelf: "Shelf A" },
  { productId: "P007", name: "Brown Rice", category: "Grains", price: 3.49, stockQuantity: 42, aisle: "Aisle 2", shelf: "Shelf A" },
  { productId: "P008", name: "Quinoa", category: "Grains", price: 6.99, stockQuantity: 18, aisle: "Aisle 2", shelf: "Shelf B" },
  { productId: "P009", name: "Oats", category: "Grains", price: 3.99, stockQuantity: 55, aisle: "Aisle 2", shelf: "Shelf B" },
  { productId: "P010", name: "Pasta", category: "Grains", price: 1.99, stockQuantity: 78, aisle: "Aisle 2", shelf: "Shelf C" },
  
  // Meat & Poultry
  { productId: "P011", name: "Chicken Breast", category: "Meat", price: 8.99, stockQuantity: 22, aisle: "Aisle 3", shelf: "Shelf A" },
  { productId: "P012", name: "Ground Beef", category: "Meat", price: 7.99, stockQuantity: 35, aisle: "Aisle 3", shelf: "Shelf A" },
  { productId: "P013", name: "Salmon Fillet", category: "Meat", price: 12.99, stockQuantity: 15, aisle: "Aisle 3", shelf: "Shelf B" },
  { productId: "P014", name: "Turkey Slices", category: "Meat", price: 5.99, stockQuantity: 28, aisle: "Aisle 3", shelf: "Shelf C" },
  { productId: "P015", name: "Bacon", category: "Meat", price: 6.49, stockQuantity: 33, aisle: "Aisle 3", shelf: "Shelf C" },
  
  // Fruits & Vegetables
  { productId: "P016", name: "Bananas", category: "Produce", price: 1.29, stockQuantity: 85, aisle: "Aisle 4", shelf: "Shelf A" },
  { productId: "P017", name: "Apples", category: "Produce", price: 2.99, stockQuantity: 67, aisle: "Aisle 4", shelf: "Shelf A" },
  { productId: "P018", name: "Carrots", category: "Produce", price: 1.99, stockQuantity: 48, aisle: "Aisle 4", shelf: "Shelf B" },
  { productId: "P019", name: "Spinach", category: "Produce", price: 2.49, stockQuantity: 32, aisle: "Aisle 4", shelf: "Shelf B" },
  { productId: "P020", name: "Tomatoes", category: "Produce", price: 3.49, stockQuantity: 55, aisle: "Aisle 4", shelf: "Shelf C" },
  
  // Baking & Pantry
  { productId: "P021", name: "All-Purpose Flour", category: "Baking", price: 2.49, stockQuantity: 45, aisle: "Aisle 5", shelf: "Shelf A" },
  { productId: "P022", name: "Sugar", category: "Baking", price: 2.99, stockQuantity: 8, aisle: "Aisle 5", shelf: "Shelf A" },
  { productId: "P023", name: "Baking Powder", category: "Baking", price: 1.99, stockQuantity: 35, aisle: "Aisle 5", shelf: "Shelf B" },
  { productId: "P024", name: "Vanilla Extract", category: "Baking", price: 4.99, stockQuantity: 22, aisle: "Aisle 5", shelf: "Shelf B" },
  { productId: "P025", name: "Olive Oil", category: "Cooking", price: 7.99, stockQuantity: 28, aisle: "Aisle 5", shelf: "Shelf C" },
  
  // Continue with more products to reach 100...
  { productId: "P026", name: "Bread", category: "Bakery", price: 2.99, stockQuantity: 42, aisle: "Aisle 6", shelf: "Shelf A" },
  { productId: "P027", name: "Bagels", category: "Bakery", price: 3.49, stockQuantity: 25, aisle: "Aisle 6", shelf: "Shelf A" },
  { productId: "P028", name: "Croissants", category: "Bakery", price: 4.99, stockQuantity: 18, aisle: "Aisle 6", shelf: "Shelf B" },
  { productId: "P029", name: "Muffins", category: "Bakery", price: 5.99, stockQuantity: 15, aisle: "Aisle 6", shelf: "Shelf B" },
  { productId: "P030", name: "Pizza Dough", category: "Bakery", price: 2.49, stockQuantity: 32, aisle: "Aisle 6", shelf: "Shelf C" },
  
  // Beverages
  { productId: "P031", name: "Orange Juice", category: "Beverages", price: 3.99, stockQuantity: 38, aisle: "Aisle 7", shelf: "Shelf A" },
  { productId: "P032", name: "Coffee", category: "Beverages", price: 8.99, stockQuantity: 28, aisle: "Aisle 7", shelf: "Shelf A" },
  { productId: "P033", name: "Tea Bags", category: "Beverages", price: 4.49, stockQuantity: 45, aisle: "Aisle 7", shelf: "Shelf B" },
  { productId: "P034", name: "Soda", category: "Beverages", price: 1.99, stockQuantity: 85, aisle: "Aisle 7", shelf: "Shelf B" },
  { productId: "P035", name: "Energy Drink", category: "Beverages", price: 2.49, stockQuantity: 55, aisle: "Aisle 7", shelf: "Shelf C" },
  
  // Snacks
  { productId: "P036", name: "Potato Chips", category: "Snacks", price: 2.99, stockQuantity: 48, aisle: "Aisle 8", shelf: "Shelf A" },
  { productId: "P037", name: "Pretzels", category: "Snacks", price: 2.49, stockQuantity: 35, aisle: "Aisle 8", shelf: "Shelf A" },
  { productId: "P038", name: "Cookies", category: "Snacks", price: 3.99, stockQuantity: 42, aisle: "Aisle 8", shelf: "Shelf B" },
  { productId: "P039", name: "Crackers", category: "Snacks", price: 2.99, stockQuantity: 38, aisle: "Aisle 8", shelf: "Shelf B" },
  { productId: "P040", name: "Nuts", category: "Snacks", price: 5.99, stockQuantity: 25, aisle: "Aisle 8", shelf: "Shelf C" },
  
  // Additional products to reach 100 total
  { productId: "P041", name: "Cereal", category: "Breakfast", price: 4.99, stockQuantity: 52, aisle: "Aisle 9", shelf: "Shelf A" },
  { productId: "P042", name: "Granola", category: "Breakfast", price: 5.49, stockQuantity: 28, aisle: "Aisle 9", shelf: "Shelf A" },
  { productId: "P043", name: "Pancake Mix", category: "Breakfast", price: 3.49, stockQuantity: 35, aisle: "Aisle 9", shelf: "Shelf B" },
  { productId: "P044", name: "Syrup", category: "Breakfast", price: 4.99, stockQuantity: 22, aisle: "Aisle 9", shelf: "Shelf B" },
  { productId: "P045", name: "Jam", category: "Breakfast", price: 3.99, stockQuantity: 38, aisle: "Aisle 9", shelf: "Shelf C" },
  
  // Cleaning supplies
  { productId: "P046", name: "Dish Soap", category: "Cleaning", price: 2.99, stockQuantity: 45, aisle: "Aisle 10", shelf: "Shelf A" },
  { productId: "P047", name: "Laundry Detergent", category: "Cleaning", price: 8.99, stockQuantity: 25, aisle: "Aisle 10", shelf: "Shelf A" },
  { productId: "P048", name: "Paper Towels", category: "Cleaning", price: 4.99, stockQuantity: 35, aisle: "Aisle 10", shelf: "Shelf B" },
  { productId: "P049", name: "Toilet Paper", category: "Cleaning", price: 6.99, stockQuantity: 42, aisle: "Aisle 10", shelf: "Shelf B" },
  { productId: "P050", name: "All-Purpose Cleaner", category: "Cleaning", price: 3.99, stockQuantity: 28, aisle: "Aisle 10", shelf: "Shelf C" },
  
  // More items to complete 100 products...
  { productId: "P051", name: "Shampoo", category: "Personal Care", price: 5.99, stockQuantity: 32, aisle: "Aisle 1", shelf: "Shelf D" },
  { productId: "P052", name: "Conditioner", category: "Personal Care", price: 5.99, stockQuantity: 28, aisle: "Aisle 1", shelf: "Shelf D" },
  { productId: "P053", name: "Toothpaste", category: "Personal Care", price: 3.49, stockQuantity: 48, aisle: "Aisle 1", shelf: "Shelf E" },
  { productId: "P054", name: "Toothbrush", category: "Personal Care", price: 2.99, stockQuantity: 55, aisle: "Aisle 1", shelf: "Shelf E" },
  { productId: "P055", name: "Deodorant", category: "Personal Care", price: 4.49, stockQuantity: 35, aisle: "Aisle 1", shelf: "Shelf E" },
  
  // Continue adding more diverse products...
  { productId: "P056", name: "Ice Cream", category: "Frozen", price: 4.99, stockQuantity: 22, aisle: "Aisle 2", shelf: "Shelf D" },
  { productId: "P057", name: "Frozen Pizza", category: "Frozen", price: 3.99, stockQuantity: 35, aisle: "Aisle 2", shelf: "Shelf D" },
  { productId: "P058", name: "Frozen Vegetables", category: "Frozen", price: 2.49, stockQuantity: 48, aisle: "Aisle 2", shelf: "Shelf E" },
  { productId: "P059", name: "Frozen Berries", category: "Frozen", price: 4.49, stockQuantity: 32, aisle: "Aisle 2", shelf: "Shelf E" },
  { productId: "P060", name: "TV Dinner", category: "Frozen", price: 3.49, stockQuantity: 28, aisle: "Aisle 2", shelf: "Shelf E" },
  
  // Add remaining products with varied data
  { productId: "P061", name: "Canned Beans", category: "Canned Goods", price: 1.99, stockQuantity: 65, aisle: "Aisle 3", shelf: "Shelf D" },
  { productId: "P062", name: "Canned Tomatoes", category: "Canned Goods", price: 1.49, stockQuantity: 58, aisle: "Aisle 3", shelf: "Shelf D" },
  { productId: "P063", name: "Tuna", category: "Canned Goods", price: 2.99, stockQuantity: 45, aisle: "Aisle 3", shelf: "Shelf E" },
  { productId: "P064", name: "Soup", category: "Canned Goods", price: 2.49, stockQuantity: 52, aisle: "Aisle 3", shelf: "Shelf E" },
  { productId: "P065", name: "Corn", category: "Canned Goods", price: 1.99, stockQuantity: 48, aisle: "Aisle 3", shelf: "Shelf E" },
  
  // Spices & Condiments
  { productId: "P066", name: "Salt", category: "Spices", price: 0.99, stockQuantity: 85, aisle: "Aisle 4", shelf: "Shelf D" },
  { productId: "P067", name: "Black Pepper", category: "Spices", price: 1.99, stockQuantity: 65, aisle: "Aisle 4", shelf: "Shelf D" },
  { productId: "P068", name: "Garlic Powder", category: "Spices", price: 1.49, stockQuantity: 42, aisle: "Aisle 4", shelf: "Shelf E" },
  { productId: "P069", name: "Ketchup", category: "Condiments", price: 2.49, stockQuantity: 55, aisle: "Aisle 4", shelf: "Shelf E" },
  { productId: "P070", name: "Mustard", category: "Condiments", price: 1.99, stockQuantity: 48, aisle: "Aisle 4", shelf: "Shelf E" },
  
  // More variety
  { productId: "P071", name: "Honey", category: "Sweeteners", price: 4.99, stockQuantity: 32, aisle: "Aisle 5", shelf: "Shelf D" },
  { productId: "P072", name: "Maple Syrup", category: "Sweeteners", price: 6.99, stockQuantity: 18, aisle: "Aisle 5", shelf: "Shelf D" },
  { productId: "P073", name: "Brown Sugar", category: "Baking", price: 2.49, stockQuantity: 35, aisle: "Aisle 5", shelf: "Shelf E" },
  { productId: "P074", name: "Baking Soda", category: "Baking", price: 1.49, stockQuantity: 58, aisle: "Aisle 5", shelf: "Shelf E" },
  { productId: "P075", name: "Cocoa Powder", category: "Baking", price: 3.99, stockQuantity: 25, aisle: "Aisle 5", shelf: "Shelf E" },
  
  // Pet supplies
  { productId: "P076", name: "Dog Food", category: "Pet Supplies", price: 12.99, stockQuantity: 22, aisle: "Aisle 6", shelf: "Shelf D" },
  { productId: "P077", name: "Cat Food", category: "Pet Supplies", price: 8.99, stockQuantity: 28, aisle: "Aisle 6", shelf: "Shelf D" },
  { productId: "P078", name: "Bird Seed", category: "Pet Supplies", price: 4.99, stockQuantity: 15, aisle: "Aisle 6", shelf: "Shelf E" },
  { productId: "P079", name: "Dog Treats", category: "Pet Supplies", price: 3.99, stockQuantity: 32, aisle: "Aisle 6", shelf: "Shelf E" },
  { productId: "P080", name: "Cat Litter", category: "Pet Supplies", price: 9.99, stockQuantity: 18, aisle: "Aisle 6", shelf: "Shelf E" },
  
  // Health & wellness
  { productId: "P081", name: "Vitamins", category: "Health", price: 12.99, stockQuantity: 25, aisle: "Aisle 7", shelf: "Shelf D" },
  { productId: "P082", name: "Pain Reliever", category: "Health", price: 6.99, stockQuantity: 35, aisle: "Aisle 7", shelf: "Shelf D" },
  { productId: "P083", name: "Bandages", category: "Health", price: 3.99, stockQuantity: 42, aisle: "Aisle 7", shelf: "Shelf E" },
  { productId: "P084", name: "Sunscreen", category: "Health", price: 7.99, stockQuantity: 28, aisle: "Aisle 7", shelf: "Shelf E" },
  { productId: "P085", name: "Hand Sanitizer", category: "Health", price: 2.99, stockQuantity: 65, aisle: "Aisle 7", shelf: "Shelf E" },
  
  // Baby products
  { productId: "P086", name: "Baby Formula", category: "Baby", price: 18.99, stockQuantity: 12, aisle: "Aisle 8", shelf: "Shelf D" },
  { productId: "P087", name: "Diapers", category: "Baby", price: 14.99, stockQuantity: 22, aisle: "Aisle 8", shelf: "Shelf D" },
  { productId: "P088", name: "Baby Food", category: "Baby", price: 1.99, stockQuantity: 48, aisle: "Aisle 8", shelf: "Shelf E" },
  { productId: "P089", name: "Baby Wipes", category: "Baby", price: 4.99, stockQuantity: 35, aisle: "Aisle 8", shelf: "Shelf E" },
  { productId: "P090", name: "Baby Shampoo", category: "Baby", price: 3.99, stockQuantity: 32, aisle: "Aisle 8", shelf: "Shelf E" },
  
  // Final 10 products
  { productId: "P091", name: "Aluminum Foil", category: "Kitchen", price: 2.99, stockQuantity: 38, aisle: "Aisle 9", shelf: "Shelf D" },
  { productId: "P092", name: "Plastic Wrap", category: "Kitchen", price: 2.49, stockQuantity: 42, aisle: "Aisle 9", shelf: "Shelf D" },
  { productId: "P093", name: "Storage Bags", category: "Kitchen", price: 3.49, stockQuantity: 35, aisle: "Aisle 9", shelf: "Shelf E" },
  { productId: "P094", name: "Napkins", category: "Kitchen", price: 1.99, stockQuantity: 55, aisle: "Aisle 9", shelf: "Shelf E" },
  { productId: "P095", name: "Paper Plates", category: "Kitchen", price: 2.99, stockQuantity: 45, aisle: "Aisle 9", shelf: "Shelf E" },
  { productId: "P096", name: "Plastic Cups", category: "Kitchen", price: 2.49, stockQuantity: 48, aisle: "Aisle 10", shelf: "Shelf D" },
  { productId: "P097", name: "Batteries", category: "Electronics", price: 4.99, stockQuantity: 28, aisle: "Aisle 10", shelf: "Shelf D" },
  { productId: "P098", name: "Light Bulbs", category: "Electronics", price: 3.99, stockQuantity: 25, aisle: "Aisle 10", shelf: "Shelf E" },
  { productId: "P099", name: "Phone Charger", category: "Electronics", price: 12.99, stockQuantity: 15, aisle: "Aisle 10", shelf: "Shelf E" },
  { productId: "P100", name: "Extension Cord", category: "Electronics", price: 8.99, stockQuantity: 18, aisle: "Aisle 10", shelf: "Shelf E" }
];
