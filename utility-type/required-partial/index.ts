// Partial and Required
// partial 部分的 required 必须的
interface People {
    age: number
    name?: string
}

let man:People={
    name:'jinp',
    age:18
}

let man1:Partial<People>={
    // name:'jinp'
}


let man2:Required<People>={
    name:'jinp',
    age:12
}