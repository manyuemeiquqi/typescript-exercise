// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]


// ============= Your Code Here =============
type Split<S extends string, SEP extends string> = S extends `${infer K}${SEP}${infer R}`
  ? [K, ...Split<R, SEP>]
  : S extends `${infer X}` ? SEP extends '' ? [] : [S] : string[]
// S extends `${infer X}` 用来处理 '字符串的case'

let a: Split<'Hi! How are you?', ''>
let b: Split<'Hi! How are you?', 'z'>

let c: string extends string ?true :false
let d: '' extends `${infer A}` ?true :false