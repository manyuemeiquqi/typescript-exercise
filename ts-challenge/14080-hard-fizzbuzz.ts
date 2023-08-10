// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FizzBuzz<1>, ['1']>>,
  Expect<Equal<FizzBuzz<5>, ['1', '2', 'Fizz', '4', 'Buzz']>>,
  Expect<Equal<FizzBuzz<20>, [
    '1',
    '2',
    'Fizz',
    '4',
    'Buzz',
    'Fizz',
    '7',
    '8',
    'Fizz',
    'Buzz',
    '11',
    'Fizz',
    '13',
    '14',
    'FizzBuzz',
    '16',
    '17',
    'Fizz',
    '19',
    'Buzz',
  ]>>,
  Expect<Equal<FizzBuzz<100>, [
    '1',
    '2',
    'Fizz',
    '4',
    'Buzz',
    'Fizz',
    '7',
    '8',
    'Fizz',
    'Buzz',
    '11',
    'Fizz',
    '13',
    '14',
    'FizzBuzz',
    '16',
    '17',
    'Fizz',
    '19',
    'Buzz',
    'Fizz',
    '22',
    '23',
    'Fizz',
    'Buzz',
    '26',
    'Fizz',
    '28',
    '29',
    'FizzBuzz',
    '31',
    '32',
    'Fizz',
    '34',
    'Buzz',
    'Fizz',
    '37',
    '38',
    'Fizz',
    'Buzz',
    '41',
    'Fizz',
    '43',
    '44',
    'FizzBuzz',
    '46',
    '47',
    'Fizz',
    '49',
    'Buzz',
    'Fizz',
    '52',
    '53',
    'Fizz',
    'Buzz',
    '56',
    'Fizz',
    '58',
    '59',
    'FizzBuzz',
    '61',
    '62',
    'Fizz',
    '64',
    'Buzz',
    'Fizz',
    '67',
    '68',
    'Fizz',
    'Buzz',
    '71',
    'Fizz',
    '73',
    '74',
    'FizzBuzz',
    '76',
    '77',
    'Fizz',
    '79',
    'Buzz',
    'Fizz',
    '82',
    '83',
    'Fizz',
    'Buzz',
    '86',
    'Fizz',
    '88',
    '89',
    'FizzBuzz',
    '91',
    '92',
    'Fizz',
    '94',
    'Buzz',
    'Fizz',
    '97',
    '98',
    'Fizz',
    'Buzz',
  ]>>,
]


// ============= Your Code Here =============
type Build<
  T extends number,
  Result extends Array<never> = []
> = Result["length"] extends T ? Result : Build<T, [...Result, never]>;

type Division<
  T extends number,
  D extends number,
  V extends Array<any> = [],
  Count extends Array<any> = []
> = Build<T> extends [...Build<D>, ...V, ...infer C]
  ? C["length"] extends 0
    ? [...Count,never]["length"]
    : Division<T, D, [...Build<D>, ...V], [...Count, never]>
  : never;

type FizzBuzz_<G extends number> = [Division<G, 5>] extends [never]
  ? [Division<G, 3>] extends [never]
    ? `${G}`
    : "Fizz"
  : [Division<G, 3>] extends [never]
  ? "Buzz"
  : "FizzBuzz";

type FizzBuzz<
  N extends number,
  G extends Array<never> = [never],
  Result extends Array<any> = []
> = N extends G["length"]
  ? [...Result,FizzBuzz_<G["length"]>]
  : FizzBuzz<N, [never, ...G], [...Result, FizzBuzz_<G["length"]>]>;