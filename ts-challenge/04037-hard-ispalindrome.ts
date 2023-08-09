// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]


// ============= Your Code Here =============
// 这里的o后面竟然还要用到，只为了每次只一处一个元素

type IsPalindrome<T extends string | number> = `${T}` extends `${infer O}${infer P}` ? `${P}` extends '' ?
  true : `${T}` extends `${O}${infer B}${O}` ? IsPalindrome<B> : false : true


  // type IsPalindrome<T extends string | number, K = `${T}`> =
  // K extends `${infer L}${infer R}` ?
  // R extends '' ? true :
  // K extends `${L}${infer S}${L}` ? IsPalindrome<S> : false
  // : true