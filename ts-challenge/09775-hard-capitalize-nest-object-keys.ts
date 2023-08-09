// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'
import { ExpectFalse, NotEqual } from './test-utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]


// ============= Your Code Here =============
let a: [1, 2] extends object ? 1 : 2
type CapitalizeNestObjectKeys<T> = T extends any[] ? T extends [infer A, ...infer B] ? [CapitalizeNestObjectKeys<A>, ...CapitalizeNestObjectKeys<B>] : T : T extends object ? {
  [P in keyof T as Capitalize<P & string>]: CapitalizeNestObjectKeys<T[P]>
} : T
