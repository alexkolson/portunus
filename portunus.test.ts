import { portunus } from "./portunus";

describe('portunus', () => {
  const numeralToDecimalIOMap = {
    'CCLIV': 254,
    'CCLV': 255,
    'MMCDXXI': 2421,
    'XXXIX': 39,
    'CCXLVI': 246,
    'CLX': 160,
    'CCVII': 207,
    'MLXVI': 1066,
    'MDCCLXXVI': 1776,
    'MCMLIV': 1954,
    'MCMXC': 1990,
    'MMXIV': 2014,
    'MMXIX': 2019,
  };

  const decimalToNumeralIOMap = Object.keys(numeralToDecimalIOMap)
    .reduce((acc, currentValue) => {
      return {
        [numeralToDecimalIOMap[currentValue]]: currentValue,
        ...acc,
      };
    }, {});

  for (const [numeral, decimal] of Object.entries(numeralToDecimalIOMap)) {
    it(`should return ${decimal} when given ${numeral}`, () => {
      expect(portunus(numeral).convertedValue).toBe(decimal);
    });
  }

  for (const [decimal, numeral] of Object.entries(decimalToNumeralIOMap)) {
    it(`should return ${numeral} when given ${decimal}`, () => {
      expect(portunus(parseInt(decimal, 10)).convertedValue).toBe(numeral);
    });
  }
});