type Obj = {
    [key:string]:string
}
let a={
    name:'wang'
} satisfies Obj
a.name

let b:Obj ={
    name:'xx'
}
