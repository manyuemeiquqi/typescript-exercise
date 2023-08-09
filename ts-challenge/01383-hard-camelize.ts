// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]


// ============= Your Code Here =============
type Camelize<T> = T extends object ? T extends any[] ? {
  [P in keyof T]: Camelize<T[P]>
}:{
  [P in keyof T as Camelize<P>]: Camelize<T[P]>
}:T extends `${infer A}_${infer B}` ? `${A}${Camelize<Capitalize<B>>}` :T

