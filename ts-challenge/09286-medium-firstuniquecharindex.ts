// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]


// ============= Your Code Here =============
// 前面的记录下来， 如何判断唯一，前面acc中找不到，后面也找不到
type FirstUniqueCharIndex<
  T extends string,
  _Acc extends string[] = []
> = T extends ''
  ? -1
  : T extends `${infer Head}${infer Rest}`
  ? Head extends _Acc[number]
    ? FirstUniqueCharIndex<Rest, [..._Acc, Head]>
    : Rest extends `${string}${Head}${string}`
    ? FirstUniqueCharIndex<Rest, [..._Acc, Head]>
    : _Acc['length']
  : never