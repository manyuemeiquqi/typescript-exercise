// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]


// ============= Your Code Here =============
type ParseInt<S extends string> = S extends `${infer N extends number}` ? N : 0

// 不同长度
type GreaterThanBySmallNumber<
  T extends number,
  U extends number,
  Arr extends any[] = [],
> = T extends Arr['length']
  ? false
  : U extends Arr['length']
  ? true
  : GreaterThanBySmallNumber<T, U, [...Arr, any]>

type StringToArray<S extends string> = S extends `${infer First}${infer Rest}`
  ? [First, ...StringToArray<Rest>]
  : []

type UnShift<T extends string[]> = T extends [string, ...infer Rest] ? Rest : []
// 相同长度
type GreaterThanByArray<T extends string[], U extends string[]> = T[0] extends U[0]
  ? T['length'] extends 1
    ? false
    : GreaterThanByArray<UnShift<T>, UnShift<U>>
  : GreaterThanBySmallNumber<ParseInt<T[0]>, ParseInt<U[0]>>

type GreaterThan<
  T extends number,
  U extends number,
  TArr extends string[] = StringToArray<`${T}`>,
  UArr extends string[] = StringToArray<`${U}`>,
> = TArr['length'] extends UArr['length']
  ? GreaterThanByArray<TArr, UArr>
  : GreaterThanBySmallNumber<TArr['length'], UArr['length']>