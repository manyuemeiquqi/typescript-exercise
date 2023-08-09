// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]


// ============= Your Code Here =============
// M => minuend, S => subtrahend
// type Subtract<M extends number, S extends number> = any

type Tuple<T, Res extends 1[] = []> =  Res['length'] extends T ? Res : Tuple<T, [...Res, 1]>;

type Subtract<M extends number, S extends number> = Tuple<M> extends [...Tuple<S>, ...infer Rest] ? Rest['length'] : never
