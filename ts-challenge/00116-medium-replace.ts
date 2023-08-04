// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]


// ============= Your Code Here =============
type Replace<S extends string, From extends string, To extends string> =From extends ''? S: S extends `${infer F}${From}${infer E}`?
`${F}${To}${E}` : S
// let b:Replace<'foobarbar', '', 'foo'> =
// 这里看到 字符串infer 特性 捕获出的 是第一个字符后的空位置
// 