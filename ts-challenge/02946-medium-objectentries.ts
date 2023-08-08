// ============= Test Cases =============
import type { Equal, Expect,ExpandRecursively } from './test-utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
]


// ============= Your Code Here =============
type ObjectEntries<T> = {
  [P in keyof T]-?: [P,T[P] extends undefined ? T[P] : Required<T>[P]] 
}[keyof T]


let a:ObjectEntries<{ key?: undefined }>
let b:ObjectEntries<Partial<Model>>
type C = ExpandRecursively<ObjectEntries<Partial<Model>>>


let d :keyof Partial<Model>

type D = ExpandRecursively<ObjectEntries<{ key?: undefined }>>