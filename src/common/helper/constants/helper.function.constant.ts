export function seconds(msValue: string): number {
  const milliseconds = customMs(msValue);
  return milliseconds / 1000;
}
export function customMs(timeValue: string): number {
  const units: Record<string, number> = {
    ms: 1,
    s: 1000,
    m: 60000,
    h: 3600000,
    d: 86400000,
    w: 604800000,
  };

  const regex = /^(\d+)(ms|s|m|h|d|w)?$/;
  const matches = timeValue.match(regex);

  if (!matches) {
    throw new Error('Invalid time format');
  }

  const value = parseInt(matches[1], 10);
  const unit = matches[2] || 'ms';

  if (!units[unit]) {
    throw new Error('Invalid unit');
  }

  return value * units[unit];
}
