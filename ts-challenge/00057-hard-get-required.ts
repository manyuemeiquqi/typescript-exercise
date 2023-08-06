// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
  Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


// ============= Your Code Here =============
// 从左侧确定key 是否存在，不要从value侧
//  error [P in keyof T ] :T[P]  extends Required<T>[P] ? T[P] :never
type GetRequired<T> = {
  [P in keyof T as T[P] extends Required<T>[P] ? P :never] :T[P]
}

let a:GetRequired<{ foo: number; bar?: string }>
