type TimeUnit = 's' | 'm' | 'h' | 'd';

export function generateJWTTokenExpiryTime(amount: number, unit: TimeUnit): string {
  return `${amount}${unit}`;
}
