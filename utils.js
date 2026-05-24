function calculateTax(price, taxRate) {
  return price * (taxRate / 100);
}

function formatCurrency(amount, currency) {
  return `${currency}${amount.toFixed(2)}`;
}

function applyDiscount(price, discountPercent) {
  const discount = price * (discountPercent / 100);
  return price - discount;
}

function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}