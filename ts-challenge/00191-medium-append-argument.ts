// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]

// 这题有意思的点在于如何定义参数的类型
// ============= Your Code Here =============
type AppendArgument<Fn extends Function, A> = Fn extends (...args: infer Arg) => 
  infer Res ? (...arg:[...Arg,A]) => Res : Fn  
