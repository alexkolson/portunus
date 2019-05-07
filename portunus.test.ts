import { portunus } from "./portunus";

describe('portunus', () => {
  it('should return 254 when given CCLIV', () => {
    expect(portunus('CCLIV').convertedValue).toBe(254);
  });

  it('should return 255 when given CCLV', () => {
    expect(portunus('CCLV').convertedValue).toBe(255);
  });

  it('should return 2421 when given MMCDXXI', () => {
    expect(portunus('MMCDXXI').convertedValue).toBe(2421);
  });

  it('should return an empty string when given a number', () => {
    portunus(200);
    portunus(5293);
    expect(portunus(0).convertedValue).toBe('');
  });
});