// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2, 3], 2, 3]>, never>>,
]


// ============= Your Code Here =============
type Intersection<T> = T extends [infer A,...infer B] ? (A extends unknown[]? A[number] :A) & Intersection<B> :unknown

// unknown可以再交叉类型中省略
let a:C =2

type C = 1|unknown
type D = 1& unknown
type a= Intersection<[[1, 2], [2, 3], [2, 2]]>

// type Intersection<T> =
//   T extends [infer First, ...infer Rest] ? (
//     (First extends unknown[] ? First[number] : First) & Intersection<Rest>
//   ) : unknown