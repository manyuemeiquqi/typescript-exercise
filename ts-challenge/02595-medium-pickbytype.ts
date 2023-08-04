// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean; isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]


// ============= Your Code Here =============
// 如何 limit key 
//  as 确实很强大，不要将他理解为 as 的类型是前面的一个子集，而是 函数式包裹的一个类型
type PickByType<T, U> = {
  [Key in  keyof T as T[Key] extends U ? Key : never] : T[Key] 
}
