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

  type Combs<T = ModifierKeys> =
   T extends [infer F extends string,...infer Res extends string[]] ? `${F} ${Res[number]}`|Combs<Res> : never 
