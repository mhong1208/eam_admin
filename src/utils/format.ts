/**
 * Format a Date object or date string to a localized string (vi-VN).
 * @param date - Date object or date string
 * @param includeTime - Whether to include time in the output
 * @returns Formatted date string, e.g. "03/04/2026", or "03/04/2026 15:30"
 */
export const formatDate = (date?: string | Date | null, includeTime: boolean = false): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check for invalid date
  if (isNaN(dateObj.getTime())) return '';

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  return new Intl.DateTimeFormat('vi-VN', options).format(dateObj);
};

/**
 * Format numeric quantity with thousand separators. E.g., 1000000 -> 1.000.000
 * @param quantity - The quantity to format
 * @returns Formatted number string
 */
export const formatQuantity = (quantity?: number | null): string => {
  if (quantity === null || quantity === undefined) return '0';
  
  return new Intl.NumberFormat('vi-VN').format(quantity);
};

/**
 * Format currency in VND. E.g., 1000000 -> 1.000.000 ₫
 * @param amount - The currency amount to format
 * @returns Formatted Vietnamese Dong string
 */
export const formatCurrency = (amount?: number | null): string => {
  if (amount === null || amount === undefined) return '0 ₫';
  
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
