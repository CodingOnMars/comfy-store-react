export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // NOTE: we divide number by hundred to get a price in dollars instead of cents
  }).format(number / 100);
};

export const getUniqueValues = () => {};
