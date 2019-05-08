# Portunus

Converts between roman numerals and decimal numbers.

[Portunus](https://en.wikipedia.org/wiki/Portunus_(mythology)) was the ancient Roman god of keys, doors, livestock, and ports. He is now a typescript roman numeral translator. My how the mighty have fallen...but then I guess we all need a day job right?

## Usage

Portunus is smart. Sort of. I mean, he can't do much but he tries. Just call him with a string to have that string be interpreted as roman numerals and converted to a decimal number. Likewise, call him with a number to have that number converted to a roman numeral.

Please note, Portunus doesn't care about the capitalization of the roman numerals you pass in. He uppercases your entire roman numeral string before converting it to a number for you. This means that you can pass in stuff like `ìV` or `Vi` or `iIIIIiiiIIIIiiIIiIiIiI` and it will just work.

Portunus is a benevolant and wonderful former guardian of goats, no? Bet you didn't plan on your day including a mild reminder of the greatness of Portunus now did you? Anyway...

This code:

```typescript
import { portunus } from 'portunus',

const { convertedValue: decimalNumber } = portunus('IV');
const { convertedValue: romanNumeral } = portunus(5);

console.log({
    decimalNumber,
    romanNumeral,
});
```

Logs the following:

```bash
{
    decimalNumber: 4,
    romanNumberal: 'V'
}
```

## A Word On The Implementation

Since portunus was mostly just a fun little brain teaser for me, I wanted to implement it in a way such that I only stored the base roman numerals in a lookup object, as opposed to storing the base roman numerals and their subtractive notation counterparts. Storing the subtractive notation counterparts greatly reduces code complexity.
