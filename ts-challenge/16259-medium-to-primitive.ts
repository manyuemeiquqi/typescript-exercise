// ============= Test Cases =============
import type { Equal, Expect,ExpandRecursively } from './test-utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]


// ============= Your Code Here =============
type ToPrimitive<T> = T extends object ? T extends Function ? Function : {
  [Key in keyof T]: ToPrimitive<T[Key]>
} : T extends { valueOf(): infer P } ? P : never
// 意思是类型都有个prototype 属性返回 属性


type D = ExpandRecursively<ToPrimitive<PersonInfo>>
type B<C> = C extends { valueOf: () => infer P } ? P : 1


let a: B<string>
