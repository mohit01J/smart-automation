/**
 * Calculates the tax amount for a given price and tax rate.
 * @param {number} price - The price amount to calculate tax on
 * @param {number} taxRate - The tax rate as a percentage (0-100)
 * @returns {number} The calculated tax amount
 */
function calculateTax(price, taxRate) {
  return price * (taxRate / 100);
}

/**
 * Formats a monetary amount as a currency string with the specified currency symbol.
 * @param {number} amount - The monetary amount to format
 * @param {string} currency - The currency symbol to prepend (e.g., '$', '€', '£')
 * @returns {string} The formatted currency string with fixed 2 decimal places
 */
function formatCurrency(amount, currency) {
  return `${currency}${amount.toFixed(2)}`;
}

/**
 * Applies a discount percentage to a price and returns the discounted amount.
 * @param {number} price - The original price
 * @param {number} discountPercent - The discount percentage to apply (0-100)
 * @returns {number} The price after discount
 */
function applyDiscount(price, discountPercent) {
  const discount = price * (discountPercent / 100);
  return price - discount;
}

/**
 * Calculates the total price of all items in an array.
 * @param {Array<{price: number}>} items - An array of items with a price property
 * @returns {number} The sum of all item prices
 */
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
