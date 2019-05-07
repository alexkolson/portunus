import { portunus } from "./portunus";

describe('portunus', () => {
  it('should return 0 when given a string', () => {
    expect(portunus('tacos').convertedValue).toBe(0);
  });

  it('should return an empty string when given a number', () => {
    portunus(200);
    portunus(5293);
    expect(portunus(0).convertedValue).toBe('');
  });
});