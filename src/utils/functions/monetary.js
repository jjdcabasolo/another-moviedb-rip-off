// money format for millions and billions credit: https://stackoverflow.com/q/36734201
export const toMillionsOrBillions = num => {
  return Math.abs(Number(num)) >= 1.0e+9
    ? `$${(Math.abs(Number(num)) / 1.0e+9).toFixed(2)}B`
    : `$${Math.floor(Math.abs(Number(num)) / 1.0e+6)}M`;
};
