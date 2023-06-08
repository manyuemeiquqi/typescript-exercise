let a:Promise<string> = new Promise((resolve,reject)=>{
    resolve('1')
    // reject(true)
})



type B = Awaited<typeof a>
