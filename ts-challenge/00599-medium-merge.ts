// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
// 原来以为 Key in (keyof F | keyof S) 就能能让 ts 认为 Key 一定属于 F S的key，但是不是这样， 还是需要extends判断
 type Merge<F, S> = {
  [Key in (keyof F | keyof S)]:Key extends keyof S? S[Key]: Key extends keyof F ? F[Key] : never
}
