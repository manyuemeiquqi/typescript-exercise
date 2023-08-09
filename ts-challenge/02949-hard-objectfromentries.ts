// ============= Test Cases =============
import type { Equal, Expect,ExpandRecursively } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]


// ============= Your Code Here =============

// extends [K,any] 这里确定使用的 union 哪个key
type ObjectFromEntries<T extends [string,any]> = {
  [K in T[0]]:T extends [K,any] ? T[1] : never
}
let b:ObjectFromEntries<ModelEntries>

type A = ExpandRecursively<ObjectFromEntries<ModelEntries>>