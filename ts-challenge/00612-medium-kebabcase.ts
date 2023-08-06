// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]


// ============= Your Code Here =============
// 看了题解，主要不知道如何确定开始位置跟结束位置，其实也就可以根据工具类型 upcapitalize
type KebabCase<S> = S extends `${infer A}${infer B}`? B extends Uncapitalize<B> ? `${Uncapitalize<A>}${KebabCase<B>}`:`${Uncapitalize<A>}-${KebabCase<B>}`:S

