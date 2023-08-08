// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]


// ============= Your Code Here =============
// type FlattenDepth = any


type FlattenOnce<T> = T extends [infer A, ...infer B] ? A extends any[] ? [...A, ...FlattenOnce<B>] : [A, ...FlattenOnce<B>] : T
//  FlattenOnce<T> extends T ? T  避免不必要的额递归，定义一个计数器
type FlattenDepth<T, D = 1, U extends any[] = []> = FlattenOnce<T> extends T 
  ? T 
  : U['length'] extends D ? T : FlattenDepth<FlattenOnce<T>, D, [...U, unknown]>