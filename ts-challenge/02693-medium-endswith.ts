// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<EndsWith<'abc', 'bc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'abc'>, true>>,
  Expect<Equal<EndsWith<'abc', 'd'>, false>>,
  Expect<Equal<EndsWith<'abc', 'ac'>, false>>,
  Expect<Equal<EndsWith<'abc', ''>, true>>,
  Expect<Equal<EndsWith<'abc', ' '>, false>>,
]


// ============= Your Code Here =============
// 找字符串中出现包含什么，一般需要``里面去拼接+ 三元运算
type EndsWith<T extends string, U extends string> = T extends `${infer R}${U}` ? true :false
