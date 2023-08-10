// ============= Test Cases =============
import type { Debug, Equal, Expect, IsAny } from './test-utils'

class ClassA {}

VueBasicProps({
  props: {
    propA: {},
    propB: { type: String },
    propC: { type: Boolean },
    propD: { type: ClassA },
    propE: { type: [String, Number] },
    propF: RegExp,
  },
  data(this) {
    type PropsType = Debug<typeof this>
    type cases = [
      Expect<IsAny<PropsType['propA']>>,
      Expect<Equal<PropsType['propB'], string>>,
      Expect<Equal<PropsType['propC'], boolean>>,
      Expect<Equal<PropsType['propD'], ClassA>>,
      Expect<Equal<PropsType['propE'], string | number>>,
      Expect<Equal<PropsType['propF'], RegExp>>,
    ]

    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const propE = this.propE
      type cases = [
        Expect<Equal<typeof fullname, string>>,
        Expect<Equal<typeof propE, string | number>>,
      ]
    },
  },
})


// ============= Your Code Here =============
// your answers
// type PropConstructor<T> = 
// |{new (...args:any[]): T&object} 
// | {():T}

// type PropType<T> = PropConstructor<T> | PropConstructor<T>[]

// type Props<T> = PropType<T> | {type?:PropType<T>}

// type inferPropType<T> = T extends Props<infer P> 
// ? unknown extends P
//   ? any
//   : P
// :any

// type inferPropsType<T> = {
//   [K in keyof T]:inferPropType<T[K]>
// }


// type inferComputed<T  extends Record<string,any>> = {
//   [K in keyof T]:ReturnType<T[K]>
// }

// declare function VueBasicProps<
// P,
// D,
// C extends Record<string,any>,
// M,
// Props=inferPropsType<P>
// >(options: {
//  props:P,
//  data:(this:Props)=>D
//  computed:C&ThisType<Props&D&inferComputed<C>&M>
//  methods:M&ThisType<Props&D&inferComputed<C>&M>
// }): any


type Computed<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : T[K]
}

type GetPropType<T> =
  T extends unknown[]
    ? GetPropType<T[number]>
    : T extends (...args: any) => any
      ? ReturnType<T>
      : T extends new (...args: any) => any
        ? InstanceType<T>
        : T

type Props<T> = {
  [K in keyof T]: T[K] extends Record<string, never>
    ? any
    : T[K] extends { type: infer R }
      ? GetPropType<R>
      : GetPropType<T[K]>
}

interface Options<D, C, M, P> {
  props: P
  data?: (this: Props<P>) => D
  computed?: C & ThisType<D & Computed<C> & M & Props<P>>
  methods?: M & ThisType<D & Computed<C> & M & Props<P>>
}

declare function VueBasicProps<D, C, M, P> (options: Options<D, C, M, P>): any
