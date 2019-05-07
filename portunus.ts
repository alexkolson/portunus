import { stringLiteral } from "@babel/types";

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
  .reduce((acc, currentValue) => {
    return {
      [romanNumeralToDecimalValueMap[currentValue]]: currentValue,
      ...acc,
    };
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
    return { convertedValue: portunusPeonNumeralToDecimal(input.toUpperCase()) };
  }

  if (typeof input === 'number') {
    return { convertedValue: portunusPeonDecimalToNumeral(input) };
  }

  return {
    error: `Something went wrong, perhaps input type check failed? I expect a number or string as input and got: ${typeof input}`,
  };
}

function portunusPeonNumeralToDecimal(numeral: string): number {
  const numeralCollection: string[] = [].slice.call(numeral);
  return numeralCollection.reduce((acc, currentValue, currentIndex) => {
    const decimalValueForCurrentNumeral: number = romanNumeralToDecimalValueMap[currentValue];
    const previousNumeral: string = numeralCollection[currentIndex - 1];
    const decimalValueForPreviousNumeral: number = romanNumeralToDecimalValueMap[previousNumeral];
    const subtractiveNotationPresent: boolean = decimalValueForPreviousNumeral && (decimalValueForPreviousNumeral < decimalValueForCurrentNumeral);

    let runningTally: number = acc + decimalValueForCurrentNumeral;

    if (subtractiveNotationPresent) {
      console.log('here');
      runningTally -= decimalValueForPreviousNumeral;
    }

    return runningTally;
  }, 0);
}

function portunusPeonDecimalToNumeral(integer: number): string {
  return '';
}