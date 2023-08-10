// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]


// ============= Your Code Here =============
// your answers
type TypeGet<T, Path extends string> = Path extends `${infer A}.${infer B}`
  ? A extends keyof T ? { [K in A]: TypeGet<T[A], B> } : never
  : Path extends keyof T ? { [K in Path]: T[Path] } : never

type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => any) ? I : never

type DeepPick<T, PathUnion extends string> =
  UnionToIntersection<PathUnion extends infer Keys ? TypeGet<T, Keys&string> : never>


let a:{ a: number } & { obj: { e: string } } ={
  a:1,
  obj:{
    e:'1'
  }
}
