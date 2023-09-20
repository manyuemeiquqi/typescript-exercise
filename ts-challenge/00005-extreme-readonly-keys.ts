// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}


// ============= Your Code Here =============
// 一个是要Equal 另一个是要用 X in P
type GetReadonlyKeys<T> =  keyof {
  // [k in keyof T as Equal<{[x in k]:T[x]},{readonly [x in k]:T[k]}> extends true ? k : never] : T[k]
  [P in keyof T as Equal<{[X in P]:T[P]},{readonly [X in P]:T[P]}> extends true ? P : never] : T[P]
}
let a: GetReadonlyKeys<Todo1>
/**
 * Expand a type recusively. Makes types much nicer on hover ooooft
 */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T

/** Expand a type */
export type a= ExpandRecursively<GetReadonlyKeys<Todo1>> 
 
/** Expand a type using Omit */
export type Expand<T> = Omit<T, never>
 