import {
  formatCurrency2DecimalPlaces,
  formatCurrency0DecimalPlaces,
  formatCurrencyDynamicDecimalPlaces,
  formatNumber0DecimalPlaces,
  formatNumber2DecimalPlaces,
  formatPercent0DecimalPlaces,
} from '@app/helpers/stringHelpers';

it('should format currency with 2 decimal places', async () => {
  const result = formatCurrency2DecimalPlaces(1234.567);
  expect(result).toBe('$1,234.57');
});

it('should format currency with 0 decimal places', async () => {
  const result = formatCurrency0DecimalPlaces(1234.5);
  expect(result).toBe('$1,235');
});

it('should format currency with small values', async () => {
  const result = formatCurrencyDynamicDecimalPlaces(123.456);
  expect(result).toBe('$123.46');
});

it('should format currency with large values', async () => {
  const result = formatCurrencyDynamicDecimalPlaces(12345.678);
  expect(result).toBe('$12,346');
});

it('should format number with 2 decimal places', async () => {
  const result = formatNumber2DecimalPlaces(1234.567);
  expect(result).toBe('1,234.57');
});

it('should format number with 0 decimal places', async () => {
  const result = formatNumber0DecimalPlaces(1234.5);
  expect(result).toBe('1,235');
});

it('should format percent with 0 decimal places', async () => {
  const result = formatPercent0DecimalPlaces(0.523);
  expect(result).toBe('52%');
});
