// ============= Test Cases =============
import type { Equal, Expect, ExpectExtends } from './test-utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}
let a:ObjectKeyPaths<typeof ref>
type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string; age: number }>, 'name' | 'age'>>,
  Expect<
  Equal<
  ObjectKeyPaths<{
    refCount: number
    person: { name: string; age: number }
  }>,
  'refCount' | 'person' | 'person.name' | 'person.age'
  >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>, false>>,
]


// ============= Your Code Here =============
// 一个标志位用来判断是否用来加分割符号.
type GenNode<K extends string | number,IsRoot extends boolean> = IsRoot extends true? `${K}`: `.${K}` | (K extends number? `[${K}]` | `.[${K}]`:never)

// type ObjectKeyPaths<
//   T extends object,
//   IsRoot extends boolean = true,
//   K extends keyof T = keyof T
// > = 
// K extends string | number ?
//   GenNode<K,IsRoot> | (T[K] extends object? `${GenNode<K,IsRoot>}${ObjectKeyPaths<T[K],false>}`:never)
//   :never;

// union 分布式
type ObjectKeyPaths<T, K extends keyof T = keyof T, IsRoot extends boolean =true> = K extends string | number ?
  GenNode<K, IsRoot> | (T[K] extends object ? `${GenNode<K, IsRoot>}${ObjectKeyPaths<T[K], keyof T[K], false>}` : never) : never 