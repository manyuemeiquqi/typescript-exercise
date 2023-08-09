// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>,
]


// ============= Your Code Here =============
// Make a tuple of a given size
// your answers
type NeedingCarryBit = `${1 | 2}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
// 20 => [0, 2]
type TransForm = {
  [P in NeedingCarryBit]: P extends `${infer F extends number}${infer R extends number}`
    ? [R, F]
    : never;
};
// ADD 较小的两个数相加
type Add<
  A extends number,
  B extends number,
  CountA extends 0[] = [],
  CountB extends 0[] = []
> = CountA["length"] extends A
  ? CountB["length"] extends B
    ? [...CountA, ...CountB]["length"]
    : Add<A, B, CountA, [0, ...CountB]>
  : CountB["length"] extends B
  ? Add<A, B, [0, ...CountA], CountB>
  : Add<A, B, [0, ...CountA], [0, ...CountB]>;
// 判断两个数字的大小
type GreaterThan<
  A extends number,
  B extends number,
  I extends 0[] = []
> = A extends B
  ? false
  : I["length"] extends A
  ? I["length"] extends B
    ? false
    : false
  : I["length"] extends B
  ? true
  : GreaterThan<A, B, [0, ...I]>;
// 反转字符串
type ReverseString<S extends string> = S extends `${infer F}${infer R}`
  ? `${ReverseString<R>}${F}`
  : "";
// 获取字符串长度
type GetStringLength<
  S extends string,
  I extends 0[] = []
> = S extends `${string}${infer R}`
  ? GetStringLength<R, [0, ...I]>
  : I["length"];
type StringNumberAdd<
  A extends string,
  B extends string,
  Jw extends number = 0
> = A extends `${infer AF extends number}${infer AR}`
  ? B extends `${infer BF extends number}${infer BR}`
    ? Add<AF, Add<BF, Jw>> extends infer AFBF extends number
      ? `${AFBF}` extends keyof TransForm
        ? `${TransForm[`${AFBF}`][0]}${StringNumberAdd<
            AR,
            BR,
            TransForm[`${AFBF}`][1]
          >}`
        : `${AFBF}${StringNumberAdd<AR, BR, 0>}`
      : never
    : Jw extends 0
    ? A
    : Add<Jw, AF> extends infer AFJW extends number
    ? `${AFJW}` extends keyof TransForm
      ? `${TransForm[`${AFJW}`][0]}${StringNumberAdd<
          AR,
          "",
          TransForm[`${AFJW}`][1]
        >}`
      : `${AFJW}${StringNumberAdd<AR, "", 0>}`
    : never
  : Jw extends 0
  ? ""
  : `${Jw}`;
type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> = ReverseString<
  GreaterThan<GetStringLength<`${A}`>, GetStringLength<`${B}`>> extends true
    ? StringNumberAdd<ReverseString<`${A}`>, ReverseString<`${B}`>>
    : StringNumberAdd<ReverseString<`${B}`>, ReverseString<`${A}`>>
>;