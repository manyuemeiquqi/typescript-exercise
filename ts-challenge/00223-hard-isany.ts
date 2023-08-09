// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,
]


// ============= Your Code Here =============
// type IsAny<T> = Equal<any,T>


// any 拥有的 特性  作为top type  
// any是包含每种类型的一组类型。因此，如果将类型添加1到all the types，它仍然是all the types。
// 您可以将其视为any数学Infinity。Infinity + 1依然是Infinity。

type IsAny<T> = 0 extends ([1,2] & T) ? true : false; 