// ============= Test Cases =============
import type { Equal, Expect ,ExpandRecursively} from './test-utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]


// ============= Your Code Here =============
type isKey<T> = string extends T ? never :number extends T ? never :symbol extends T ? never : T
// 就是把索引签名remove掉
type RemoveIndexSignature<T> = {
  [K in keyof T as isKey<K>]: T[K]
}
let a: RemoveIndexSignature<Foo>

type A = ExpandRecursively<RemoveIndexSignature<Foo>>