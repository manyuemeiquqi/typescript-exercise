// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]


// ============= Your Code Here =============
// type PartialByKeys<T, K> = any


// 不加 omit 这里只是将两个类型结合在一起，不用的话， ts会推断出 两个 interface & ，不能继续推断了，比较奇怪


type PartialByKeys<T, U extends keyof T = keyof T> =
  Omit<Partial<Pick<T, U>> & Omit<T, U>, never>