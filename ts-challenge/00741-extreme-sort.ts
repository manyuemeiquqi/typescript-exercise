// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>,
]


// ============= Your Code Here =============
type Iterator<n, iterator extends any[] = []> = 
  iterator['length'] extends n 
    ? iterator
    : Iterator<n, [any, ...iterator]>

type Drop1<xs extends any[]> =
  xs extends [any, ...infer tail] ? tail : []

type LessThanOrEqual<a extends any[], b extends any[]> = 
  [a, b] extends [[], [any, ...any]] 
    ? true
    : [a, b] extends [[any,...any], []] 
    ? false
    : [a, b] extends [[], []] 
    ? true
    : LessThanOrEqual<Drop1<a>, Drop1<b>>

type GreaterThan<a extends any[], b extends any[]> = 
  [a, b] extends [[], [any, ...any]] 
    ? false
    : [a, b] extends [[any,...any], []] 
    ? true
    : [a, b] extends [[], []] 
    ? false
    : GreaterThan<Drop1<a>, Drop1<b>>


type FilterLessThanOrEqual<value, xs extends any[], output extends any[] = []> = 
  xs extends [infer head, ...infer tail]
    ? LessThanOrEqual<Iterator<value>, Iterator<head>> extends true
      ? [...output, head, ...FilterLessThanOrEqual<value, tail, output>]
      : [...output, ...FilterLessThanOrEqual<value, tail, output>]
    : []

type FilterGreaterThan<value, xs extends any[], output extends any[] = []> = 
  xs extends [infer head, ...infer tail]
    ? GreaterThan<Iterator<value>, Iterator<head>> extends true
      ? [...output, head, ...FilterGreaterThan<value, tail, output>]
      : [...output, ...FilterGreaterThan<value, tail, output>]
    : []

type Sort<xs extends any[], reversed extends boolean = false> = 
    xs extends [infer head, ...infer tail]
      ? reversed extends true
        ? [...Sort<FilterLessThanOrEqual<head, tail>, reversed>, head, ...Sort<FilterGreaterThan<head, tail>, reversed>]
        : [...Sort<FilterGreaterThan<head, tail>, reversed>, head, ...Sort<FilterLessThanOrEqual<head, tail>, reversed>]
      : []


export {}