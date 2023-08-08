// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'>, false>>,
]


// ============= Your Code Here =============
// 简单却没想到，直接使用工具类型构造出 对象类型结构
type IsRequiredKey<T, K extends keyof T> =Pick<T, K> extends Required<Pick<T, K>>
? true
: false