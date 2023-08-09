// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,
]


// ============= Your Code Here =============
type BinaryToDecimal<
  S extends string,
  R extends any[] = []
> = 
  S extends `${infer F}${infer L}`?
    F extends '0'? BinaryToDecimal<L,[...R,...R]>:BinaryToDecimal<L,[...R,...R,1]>
    :R['length']
// <<1 类似于 以为*2