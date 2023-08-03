// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
  Expect<Equal<IsTuple<string>, false>>,
]



// ============= Your Code Here =============
// tuple 跟 数组 区别， tuple 的length 属性是数值 不是 number
type IsTuple<T> =[T] extends [never]? false : T extends readonly any[] ?
   number extends T['length'] ? false : Equal<never,T> extends true ? false : true
  : false

  
