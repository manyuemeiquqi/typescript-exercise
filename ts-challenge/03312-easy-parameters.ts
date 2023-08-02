// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const foo = (arg1: string, arg2: number): void => {}
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {}
const baz = (): void => {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
]


// ============= Your Code Here =============

// 编译错误，记住，infer 是类型变量，并不能直接用在参数里面
// type MyParameters<T extends (...args: any[]) => any> = T extends ((infer Args) => any)? typeof Args : never
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer A) => any? A : never
