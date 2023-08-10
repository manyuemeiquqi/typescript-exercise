// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]


// ============= Your Code Here =============
// type UnionToIntersection<U,T=U> = U extends T ? U & UnionToIntersection<Exclude<T,U>> :1

// 你的答案


// 为什么要利用逆变
// 唯一解释是 联合转交叉不好做
// 唯一可以利用的是发生逆变的时候
// 在逆变位置的同一类型变量中的多个候选会被推断成交叉类型。
// 什么时候会发生逆变
// 1 赋值 2extends

// 首先 交叉类型 是联合类型的 子类型 
type AA =  1&2 extends 1|2 ? 1 :2
// 函数逆变的性质是 子类型 => 父类型 extends 父类型 =>子类型
// 返回结果是协变 
type Father ={name:string}
type Son = {name:string,age:1}
let a:Father ={
  name:'12',
  // age:12
}
let b:Son={
  name:'12',
  age:1
}
// 赋值发生协变 
a=b 
type BB = Son extends Father ?1 :2
// extends 接受的规则 函数参数发生逆变，结果协变
type CC = ((arg:Father)=>Son) extends ((arg:Son)=>Father) ? 1 :2

// 因此 根据 交叉类型是联合类型的子类型，所以可以 参数集中在函数参数内部，得出一个子类型

// T remap 成函数形式

type UnionToIntersection<T> = (T extends  T ? (arg:T)=>unknown :never) extends (arg:infer Res)=> unknown ? Res :never