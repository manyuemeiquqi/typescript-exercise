
// ============= Your Code Here =============
type Trunc<A extends number | string> = `${A}` extends `${infer Front}.${infer End}` ?
  Front extends '' ? '0' : Front : `${A}`