// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs, CaseTypeOne>>,
]


// ============= Your Code Here =============
type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']

// 实现 Combs
// type Combs = any

// type Combs<T extends string[] = ModifierKeys> =
//   T extends [infer F extends string, ...infer R extends string[]] ?
//   `${F} ${R[number]}` | Combs<R> : never;


// 看了题解，比较难想的一点是这里直接可通过`${F} ${Res[number]}` 结合构造出union
  type Combs<T = ModifierKeys> =
   T extends [infer F extends string,...infer Res extends string[]] ? `${F} ${Res[number]}`|Combs<Res> : never 
