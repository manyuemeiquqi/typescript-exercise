// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]


// ============= Your Code Here =============
// type FindEles<T extends any[]> = any
// O是前面的元素
//  U是最后返回
type FindEles<T extends any[], U extends any[] = [], O extends any[] = []> = T extends [infer F, ...infer Rest]
  ? F extends [...Rest, ...O][number]
    ? FindEles<Rest, U, [...O, F]>
    : FindEles<Rest, [...U, F], [...O, F]>
  : U