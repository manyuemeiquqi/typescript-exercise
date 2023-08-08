// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

SimpleVue({
  data() {
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
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})


// ============= Your Code Here =============
declare function SimpleVue<D, C, M>(options: Options<D, C, M>): any
type RemapComputed<C> = { [P in keyof C]: C[P] extends () => infer R ? R : never }
type Options<D, C, M> = {
  data: (this: void) => D,
  computed: C & ThisType<D>
  
  methods: M & ThisType<D & RemapComputed<C> & M>
}
// 用 & 通过交叉获取到所有类型的属性 ThisType 作用是可以通过 this 访问到属性的类型
