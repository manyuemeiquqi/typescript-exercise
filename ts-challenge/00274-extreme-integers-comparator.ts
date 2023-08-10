// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
]


// ============= Your Code Here =============
enum Comparison {
  Greater,
  Equal,
  Lower,
}
// 还是类似greater than
// type Comparator<A extends number, B extends number> = any
type Comparator<A extends number | string, B extends number | string>
  = `${A}` extends `-${infer AbsA}`
    ? `${B}` extends `-${infer AbsB}`
    // 绝对值比较
      ? ComparePositives<AbsB, AbsA>
      : Comparison.Lower
    : `${B}` extends `-${number}`
      ? Comparison.Greater
      : ComparePositives<`${A}`, `${B}`>

// Compares two positive long numbers
type ComparePositives<A extends string, B extends string, ByLength = CompareByLength<A, B>>
  = ByLength extends Comparison.Equal
    ? CompareByDigits<A, B>
    : ByLength

// Compares two strings by length
type CompareByLength<A extends string, B extends string>
  = A extends `${infer AF}${infer AR}`
    ? B extends `${infer BF}${infer BR}`
      ? CompareByLength<AR, BR>
      : Comparison.Greater
    : B extends `${infer BF}${infer BR}`
      ? Comparison.Lower
      : Comparison.Equal

// Compares two positive long numbers of the same length
type CompareByDigits<A extends string, B extends string>
  = `${A}|${B}` extends `${infer AF}${infer AR}|${infer BF}${infer BR}`
    ? CompareDigits<AF, BF> extends Comparison.Equal
      ? CompareByDigits<AR, BR>
      : CompareDigits<AF, BF>
    : Comparison.Equal

// Compares two digits
type CompareDigits<A extends string, B extends string>
  = A extends B
    ? Comparison.Equal
    : '0123456789' extends `${string}${A}${string}${B}${string}`
      ? Comparison.Lower
      : Comparison.Greater