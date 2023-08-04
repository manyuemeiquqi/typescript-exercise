// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]


// ============= Your Code Here =============


type CheckPrefix<T> = T extends '+' | '-' ? T : never

type CheckSuffix<T> = T extends `${infer Num}%` ? [Num, '%'] : [T, '']
// 看了题解，知道怎么做，但是写不出来，主要问题是，要明白 字符串如何如何infer 的，如果是'' ，是infer不出来第一个字符的，所以 extends 判断
type PercentageParser<A> = A extends `${CheckPrefix<infer F>}${infer R}` ?
 [F, ...CheckSuffix<R>] : ['', ...CheckSuffix<A>]

 let a:PercentageParser<'100%'>


