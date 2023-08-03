// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]


// ============= Your Code Here =============
// 挺有意思
// 利用了 联合类型 extends 后具备分布式的特点，
// 关键是如何访问这个类型，该题解是新构造了一个对象，然后 通过key 访问
type LookUp<U, T extends string> =U extends {type : T}?U :never