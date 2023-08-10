// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
  Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
  Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
  Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
  Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
  Expect<Equal<CapitalizeWords<''>, ''>>,
]


// ============= Your Code Here =============
// your answers
type IsAlphabet<T extends string> = Lowercase<T> extends Uppercase<T> ? false : true;
type GetUpper<T extends string, IsFirst extends boolean> = IsFirst | IsAlphabet<T> extends true ? Uppercase<T> : T;
type TT<Pre extends string> = Lowercase<Pre> extends Uppercase<Pre> ? true : false;

//平铺式
type CapitalizeWords<S extends string, _IsFirst extends boolean = true> = S extends `${infer F}${infer Sec/*Too Deep Solution*/}${infer R}` ?
  (`${GetUpper<F, _IsFirst>}${GetUpper<Sec, TT<F>>}${CapitalizeWords<R, TT<Sec>>}`) :
 S;

let d:CapitalizeWords<'foo bar'>
// type CamelCase<S extends string, T = Lowercase<S>> = T extends `${infer A}_${infer B}` ?
//   `${B}` extends `${infer C}${infer D}` ? isLetter<C> extends true ? `${A}${CamelCase<Capitalize<B>, Capitalize<B>>}` : `${A}_${CamelCase<B,B>}` : `${T}`
//   : T

let a: (false | true) extends true ?1:2
