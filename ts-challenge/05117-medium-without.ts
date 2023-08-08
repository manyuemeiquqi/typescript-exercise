// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============

type ToUnion<A> = A extends any[] ? A[number] : A
// 还需要一个工具函数转换下，好传入不同类型的泛型
type Without<T, U> = T extends [infer A,...infer B] ? A extends ToUnion<U> ? Without<B,U> : [A,...Without<B,U>] :[]
