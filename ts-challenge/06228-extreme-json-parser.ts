// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<(
    Parse<`
      {
        "a": "b", 
        "b": false, 
        "c": [true, false, "hello", {
          "a": "b", 
          "b": false
        }], 
        "nil": null
      }
    `>
  ), (
    {
      nil: null
      c: [true, false, 'hello', {
        a: 'b'
        b: false
      }]
      b: false
      a: 'b'
    }

  )>>,
  Expect<Equal<Parse<'{}'>, {}>>,

  Expect<Equal<Parse<'[]'>, []>>,

  Expect<Equal<Parse<'[1]'>, never>>,

  Expect<Equal<Parse<'true'>, true>>,

  Expect<Equal<
  Parse<'["Hello", true, false, null]'>,
  ['Hello', true, false, null]
  >>,

  Expect<Equal<
  (
    Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>
  ), (
    {
      'hello\r\n\b\f': 'world'
    }
  )
  >>,

  Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

  Expect<Equal<Parse<`{ "hello
  
  world": 123 }`>, never>>,
]


// ============= Your Code Here =============
//My answer is only for the test cases
type Parse<T extends string> = Eval<T> extends [infer V, 
  infer U] ? V : never

type Eval<T>
  = T extends `${' '|'\n'}${infer U}` ? Eval<U>
  : T extends `true${infer U}` ? [true, U]
  : T extends `false${infer U}` ? [false, U]
  : T extends `null${infer U}` ? [null, U]
  : T extends `"${infer U}` ? EvalString<U>
  : T extends `${'['}${infer U}` ? EvalArray<U>
  : T extends `${'{'}${infer U}` ? EvalObject<U>
  : false

type Escapes = {r:'\r', n:'\n', b:'\b', f:'\f'}

type EvalString<T, S extends string = ''>
  = T extends `"${infer U}` ? [S, U]
  : (T extends `\\${infer C}${infer U}` ? C extends keyof Escapes ? [C, U] : false : false) extends [infer C, infer U] 
    ? EvalString<U, `${S}${C extends keyof Escapes ? Escapes[C] : never}`>
  : T extends `${infer C}${infer U}` ? EvalString<U, `${S}${C}`>
  : false

type EvalArray<T, A extends any[] = []> 
  = T extends `${' '|'\n'}${infer U}` ? EvalArray<U, A>
  : T extends `]${infer U}` ? [A, U]
  : T extends `,${infer U}` ? EvalArray<U, A>
  : Eval<T> extends [infer V, infer U] ? EvalArray<U, [...A, V]> 
  : false

type EvalObject<T, K extends string = '', O = {}> 
  = T extends `${' '|'\n'}${infer U}` ? EvalObject<U, K, O>
  : T extends `}${infer U}` ? [O, U]
  : T extends `,${infer U}` ? EvalObject<U, K, O>
  : T extends `"${infer U}` ? Eval<`"${U}`> extends [`${infer KK}`, infer UU] ? EvalObject<UU, KK, O> : false  
  : T extends `:${infer U}` ? Eval<U> extends [infer V, infer UU] ? EvalObject<UU, '', Merge<{[P in K]: V} & O>> : false
  : false

type Merge<T> = {[P in keyof T]: T[P]}
