// money format for millions and billions credit: https://stackoverflow.com/q/36734201
export const toMillionsOrBillions = num => {
  return Math.abs(Number(num)) >= 1.0e+9
    ? `$${(Math.abs(Number(num)) / 1.0e+9).toFixed(2)}B`
    // Six Zeroes for Millions 
    : Math.abs(Number(num)) >= 1.0e+6
    ? `$${Math.floor(Math.abs(Number(num)) / 1.0e+6)}M`
    // Three Zeroes for Thousands
    : Math.abs(Number(num)) >= 1.0e+3
    ? `$${Math.floor(Math.abs(Number(num)) / 1.0e+3)}K`
    // Under thousands
    : Math.abs(Number(num));
};
