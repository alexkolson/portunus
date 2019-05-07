type PortunusInput = string | number;
type PortunusConvertedValue = string | number;

interface PortunusOutput {
  error?: string;
  convertedValue?: PortunusConvertedValue;
}

const romanNumeralToDecimalValueMap = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000,
};

const decimalValueToRomanNumeralMap = Object.keys(romanNumeralToDecimalValueMap)
  .reduce((prevValue, acc) => {
    return {};
  }, {});

function isPortunusInput(input: any): input is PortunusInput {
  return typeof input === 'string' || typeof input === 'number';
}

export function portunus(numeral: string): PortunusOutput;
export function portunus(integer: number): PortunusOutput;

export function portunus(input: PortunusInput): PortunusOutput {
  if (!isPortunusInput(input)) {
    return {
      error: `Provided input (${input}) not a valid portunus input.`,
    };
  }

  if (typeof input === 'string') {
    return {
      convertedValue: input.toUpperCase()
    }
  }

  return {
    convertedValue: 5,
  };
}