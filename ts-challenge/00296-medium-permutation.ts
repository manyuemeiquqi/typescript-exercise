// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]


// ============= Your Code Here =============
// [T1] extends [never] 设置递归终止条件
type Permutation<T,T1=T> =[T1] extends [never] ? []: T1 extends any ? [T1,...Permutation<Exclude<T,T1>>] : never

type A = Permutation<'A' | 'B' | 'C'> 

let b:Exclude<'A','A'>
let d:Exclude<never,never>
let c:never extends any ? 1:2

namespace t00296 {
  type Uni = 'A' | 'B' | 'C'
  // STEP1: 利用 Distributive Conditional Types 特性,把 Union 转换成 Array, 至于这里 extends 什么并不太重要, 只要条件为真,先用 any 好了
  // 要注意, 这里产生分支的条件是 extends 表达式, 表达式中的 U 是联合类型的每一个分支, 相当于被map
  type S1<U> = U extends any? [U]: never
  type P1 = S1<Uni> // ['A']|['B']|['C']
  // STEP2: 观察一下,只是拿到了首个字母, 如果要继续拿后面的两个, 很显然需要loop, Type Space里的loop通常通过循环调用. 或者想一下如果是 function 该怎么写, 见
  // 然后上面的式子里U被map拆掉了,那么我们还需要一份完整的copy,用于之后继续传递, 所以增加一个C=U, 之后我们填上 S2<Exclude<C,U>>, 看第一项等于把[B, C]传入下一次循环
 
 
  type S2<U, C=U> =  U extends any? [U, S2<Exclude<C, U>>]: never
  type P2 = S2<Uni> //["A", ["B", ["C", never]] | ["C", ["B", never]]] | ["B", ["A", ["C", never]] | ["C", ["A", never]]] | ["C", ["A", ["B", never]] | ["B", ["A", never]]]
  // STEP3: 观察一下结果, 是拓成了 6 项, 但每项的内容不对, 而且里面有 never, 试着想办法把 never 拿掉, 怎么拿掉呢? 试着再加一级 extends, 
  //注意, 如果这里还是用 Union extends xxx 的形式就又 Distribute 分支了, 所以这里把传入[U] 整体进条件
  type S3<U, C = U> = [U] extends [never] ? [] : U extends C  ? [U, ...S3<Exclude<C, U>>]:never
  // 这里同样, 用 [U]/[C]判断无关紧要, 因为这两个相等, U extends any也可以改成 U extends C, 但注意, 这里的意义跟前面完全不同, U 已经是map后的子元素了, 不可以反过来
  type P3 = S3<Uni> 

  type Permutation<T> = S3<T>
  type perm = Permutation<Uni>; 
}

