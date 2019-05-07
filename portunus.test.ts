import { portunus } from "./portunus";

describe('portunus', () => {
  it('should return 5', () => {
    const { convertedValue } = portunus('tacos');
    expect(portunus('tacos').convertedValue).toBe('TACOS');
  });
});