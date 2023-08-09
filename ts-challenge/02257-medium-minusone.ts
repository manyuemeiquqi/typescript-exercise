// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
  Expect<Equal<MinusOne<9_007_199_254_740_000>, 9_007_199_254_739_999>>,
]


// ============= Your Code Here =============
type RemoveLeadingZeros<T extends string> = T extends `0${infer V}`
	? V extends ''
		? '0'
		: RemoveLeadingZeros<V>
	: T;
type ParseInt<T extends string> =
	RemoveLeadingZeros<T> extends `${infer U extends number}` ? U : never;
type ReverseString<T extends string> = T extends `${infer L}${infer R}`
	? `${ReverseString<R>}${L}`
	: '';

type PositiveMinusOne<T extends string> =
	T extends `${infer D extends number}${infer R}`
		? D extends 0
			? `9${PositiveMinusOne<R>}`
			: `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][D]}${R}`
		: never;
    // 123 - 1
    //=> `321` 
    // 首位置 - 如果是0 借1
    // 然后再reverse 获取 

let a : PositiveMinusOne<'321'>
type NegativeMinusOne<T extends string> =
	T extends `${infer D extends number}${infer R}`
		? D extends 9
			? `0${NegativeMinusOne<R>}`
			: `${[1, 2, 3, 4, 5, 6, 7, 8, 9][D]}${R}`
		: never;
let b:ReverseString<`9_007_199_254_739_999`>
type MinusOne<T extends number> =  T extends 0
? -1
: `${T}` extends `-${infer U extends number}`
? ParseInt<`-${ReverseString<NegativeMinusOne<ReverseString<`${U}`>>>}`>
: ParseInt<ReverseString<PositiveMinusOne<ReverseString<`${T}`>>>>;