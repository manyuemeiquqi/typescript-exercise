// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

let a:Capitalize<'HELLO'>

// ============= Your Code Here =============
type isLetter<T extends string> = Lowercase<T> extends Uppercase<T> ? false : true
type CamelCase<S extends string, T = Lowercase<S>> = T extends `${infer A}_${infer B}` ?
  `${B}` extends `${infer C}${infer D}` ? isLetter<C> extends true ? `${A}${CamelCase<Capitalize<B>, Capitalize<B>>}` : `${A}_${CamelCase<B,B>}` : `${T}`
  : T
let b:CamelCase<'foo_bar_'>
let c:CamelCase<'foo_bar__'>
let d:isLetter<'_'>