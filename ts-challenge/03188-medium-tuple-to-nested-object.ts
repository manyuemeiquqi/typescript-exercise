// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]


// ============= Your Code Here =============
// 这里 A 并不能单纯放在 key 里面 ，否则会提示类型不能当做值使用 ，需要使用in
type TupleToNestedObject<T, U> = T extends [infer A extends string,...infer Rest] ? {
  [P in A]:TupleToNestedObject<Rest,U>
} : U
