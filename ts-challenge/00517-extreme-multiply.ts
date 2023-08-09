// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>,
]


// ============= Your Code Here =============
// your answers
/**
 * 4->[0,0,0,0]
 */
type numToTupl<
  T extends string,
  R extends any[] = []
> = `${R["length"]}` extends T ? R : numToTupl<T, [...R, 0]>;

type TenRes<base extends string, N extends string> = `${base}${N}`;

/**
 * 9 + 1 = 10
 * 8 + 8 = 16
 */
type SumTen<L extends string, R extends string> = [
  ...numToTupl<L>,
  ...numToTupl<R>
]["length"] extends NumberInferType<infer SumRes>
  ? `${SumRes}`
  : never;

/**
 * 个位数 * 个位数
 * 2     * 9
 */
type MulTen<
  L extends string,
  R extends string,
  Res extends string = "0"
> = numToTupl<L> extends [infer _, ...infer LN]
  ? MulTen<`${LN["length"]}`, R, SumTen<Res, R>>
  : Res;

/**
 * n位数   * 个位数
 * 123    * 4
 * 3      * 2
 * 121021 * 5
 */
type Mul_N_AND_ONE<
  L extends string,
  R extends string,
  Res extends string = "0"
> = L extends `${infer A}${infer B}`
  ? Mul_N_AND_ONE<B, R, Sum<`${Res}0`, MulTen<A, R>>>
  : Res;

type NumberInferType<T extends number> = T;
type StringArrInferType<T extends string[], S extends string> = [...T, S];
type StringInferType<L extends string, R extends string> = `${L}${R}`;

/**
 * "1234"->["1","2","3","4"]
 */
type ToStringArr<T extends string | number | bigint> =
  `${T}` extends StringInferType<infer L, infer R>
    ? [L, ...ToStringArr<R>]
    : [];

/**
 * ["1","2","3","4"]->"1234"
 * ["0","2"]->"02"
 */
type StringArrToString<T extends string[]> = T extends StringArrInferType<
  infer L,
  infer R
>
  ? `${StringArrToString<L>}${R}`
  : "";

/**
 * 012 -> 12
 * 0 -> 0
 * 101 -> 101
 */
type RemoveZero<T> = T extends `0${infer R}`
  ? RemoveZero<R>
  : T extends ""
  ? "0"
  : T;

/**
 * ['1','2'] ['1'] long -> ['1','2']
 * ['1','2'] ['1'] short -> ['1']
 */
type findArr<
  T extends string[],
  R extends string[],
  type extends "long" | "short"
> = numToTupl<`${T["length"]}`> extends [
  ...numToTupl<`${R["length"]}`>,
  ...infer _
]
  ? type extends "long"
    ? T
    : R
  : type extends "long"
  ? R
  : T;

type _Sum<
  L extends string[],
  R extends string[],
  base extends string = "0",
  Res extends string[] = []
> = L extends StringArrInferType<infer LL, infer LC>
  ? R extends StringArrInferType<infer RR, infer RC>
    ? SumTen<SumTen<LC, RC>, base> extends TenRes<infer A, infer B>
      ? B extends ""
        ? _Sum<LL, RR, "0", [A, ...Res]>
        : _Sum<LL, RR, A, [B, ...Res]>
      : never
    : SumTen<SumTen<LC, "0">, base> extends TenRes<infer A, infer B>
    ? B extends ""
      ? _Sum<LL, [], "0", [A, ...Res]>
      : _Sum<LL, [], A, [B, ...Res]>
    : never
  : base extends "1"
  ? ["1", ...Res]
  : Res;

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> = RemoveZero<
  StringArrToString<
    _Sum<
      findArr<ToStringArr<A>, ToStringArr<B>, "long">,
      findArr<ToStringArr<A>, ToStringArr<B>, "short">
    >
  >
>;

type _Multiply<
  L extends string,
  R extends string,
  Res extends string = "0"
> = R extends `${infer A}${infer B}`
  ? _Multiply<L, B, Sum<`${Res}0`, Mul_N_AND_ONE<L, A>>>
  : Res;

type Multiply<
  L extends string | number | bigint,
  R extends string | number | bigint
> = _Multiply<`${L}`, `${R}`>;