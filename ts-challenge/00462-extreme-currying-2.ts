// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal< typeof curried1Return1, boolean>>,
  Expect<Equal< typeof curried1Return2, boolean>>,
  Expect<Equal< typeof curried1Return3, boolean>>,

  Expect<Equal< typeof curried2Return1, boolean>>,
  Expect<Equal< typeof curried2Return2, boolean>>,
  Expect<Equal< typeof curried2Return3, boolean>>,
  Expect<Equal< typeof curried2Return4, boolean>>,
  Expect<Equal< typeof curried2Return5, boolean>>,
  Expect<Equal< typeof curried2Return6, boolean>>,
  Expect<Equal< typeof curried2Return7, boolean>>,
  Expect<Equal< typeof curried2Return8, boolean>>,
  Expect<Equal< typeof curried2Return9, boolean>>,
  Expect<Equal< typeof curried2Return10, boolean>>,
]


// ============= Your Code Here =============
// declare function DynamicParamsCurrying<F>(fn: F): Curry<F>

// type Curry<T> = T extends (...arg:infer Arg)=>infer Res? Arg extends [infer A,...infer B] ? 

declare function DynamicParamsCurrying<T extends any[], R>(fn: (...args: T) => R): Curry<T,R> 
  // T extends [] ? R : // returns R if no params is needed  
  // // 当前 arg 为空数组，至直接返回R 不为空，构造一个函数，根据传入的函数类型，推断，传入的数组在   T  如何可以分解为 P 跟Rest
  //   <P extends any[]>(...args: P) => 
  //     T extends [...P, ...infer Rest] ? // check does P & K3 extends T, basically checking is P fully T
  //       ReturnType<typeof DynamicParamsCurrying<Rest, R>> : // Pass in K3 and T to check is K3 = T
  //     R

  type Curry<T,R> = T extends [] ? R : <A extends any[]>(...arg:A)=> T extends [...A,...infer C] ? Curry<C,R> : never