// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]


// ============= Your Code Here =============

declare function Currying<T>(fn: T): Curred<T>
type Curred<T> = T extends (...arg: infer Args) => infer Res ? Args extends [infer F, ...infer Rest] ?
  Rest['length'] extends 0 ? (arg: F) => Res : (arg: F) => Curred<(...arg: Rest) => Res> : () => Res : never