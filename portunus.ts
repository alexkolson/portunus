type PortunusInput = string | number;
type PortunusConvertedValue = string | number;

interface PortunusOutput {
  error?: string;
  convertedValue?: PortunusConvertedValue;
}

const romanNumeralToDecimalValueMap: { [numeral: string]: number } = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000,
};

const decimalValueToRomanNumeralMap: { [decimal: number]: string } = Object.keys(romanNumeralToDecimalValueMap)
  .reduce((acc, currentValue) => {
    return {
      [romanNumeralToDecimalValueMap[currentValue]]: currentValue,
      ...acc,
    };
  }, {});

const sortedNumeralCollection: string[] = Object.keys(romanNumeralToDecimalValueMap)
  .sort((a, b) => romanNumeralToDecimalValueMap[b] - romanNumeralToDecimalValueMap[a]);

const sortedDecimalCollection: number[] = Object.keys(decimalValueToRomanNumeralMap)
  .map(d => parseInt(d, 10))
  .sort((a, b) => b - a);

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
    const subtractiveNotationPresent: boolean = !!decimalValueForPreviousNumeral && (decimalValueForPreviousNumeral < decimalValueForCurrentNumeral);

    let runningTally: number = acc + decimalValueForCurrentNumeral;

    if (subtractiveNotationPresent) {
      runningTally -= (decimalValueForPreviousNumeral * 2);
    }

    return runningTally;
  }, 0);
}

function portunusPeonDecimalToNumeral(integer: number): string {
  const numeralWithoutSubtractiveNotation: string = sortedDecimalCollection
    .reduce((acc, currentDecimal) => {
      let numeral: string = decimalValueToRomanNumeralMap[currentDecimal];
      let occurencesOfNumeral: number = Math.floor(integer / currentDecimal);
      integer -= (currentDecimal * occurencesOfNumeral);
      return `${acc}${numeral.repeat(occurencesOfNumeral)}`;
    }, '');

  const numeralWithoutSubtractiveNotationCollection: string[] = [].slice.call(numeralWithoutSubtractiveNotation);

  let numeralWithSubtractiveNotationCollection: string[] = [];

  for (let i: number = 0; i < numeralWithoutSubtractiveNotationCollection.length; ++i) {
    const numeral: string = numeralWithoutSubtractiveNotationCollection[i];
    const numeralRankIndex: number = sortedNumeralCollection.indexOf(numeral);

    const nextLowestRankingNumeralIndex: number = numeralRankIndex + 1;
    const nextLowestRankingNumeral: string = sortedNumeralCollection[nextLowestRankingNumeralIndex];

    const nextHighestRankingNumeralIndex: number = numeralRankIndex - 1;
    const nextHighestRankingNumeral: string = sortedNumeralCollection[nextHighestRankingNumeralIndex];

    const nextFourNumerals: string[] = [1, 2, 3, 4].map(indexOffset => numeralWithoutSubtractiveNotationCollection[i + indexOffset]);
    const nextThreeNumerals: string[] = nextFourNumerals.slice(0, 3);

    /*console.log({
      numeralWithSubtractiveNotationCollection,
      numeral,
      numeralRankIndex,
      nextLowestRankingNumeral,
      nextLowestRankingNumeralIndex,
      nextHighestRankingNumeral,
      nextHighestRankingNumeralIndex,
      nextFourNumerals,
      nextThreeNumerals,
    });*/

    if (!!nextHighestRankingNumeral) {
      if (nextThreeNumerals.every(n => sortedNumeralCollection.indexOf(n) === numeralRankIndex)) {
        console.log({
          msg: 'here in next three',
          nextThreeNumerals,
          numeralWithoutSubtractiveNotation,
        });
        numeralWithSubtractiveNotationCollection.push(`${numeral}${nextHighestRankingNumeral}`)
        i += 3;
        continue;
      }

      if (nextFourNumerals.every(n => sortedNumeralCollection.indexOf(n) === nextLowestRankingNumeralIndex)) {
        console.log({
          msg: 'here in next four',
          nextFourNumerals,
          numeralWithoutSubtractiveNotation,
        });
        numeralWithSubtractiveNotationCollection.push(`${nextLowestRankingNumeral}${nextHighestRankingNumeral}`);
        i += 4;
        continue;
      }
    }

    numeralWithSubtractiveNotationCollection.push(numeral);
  };

  return numeralWithSubtractiveNotationCollection.join('');
}