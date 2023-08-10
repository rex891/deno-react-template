console.log(Deno.args)
console.log(Deno.env.toObject())
console.log(Deno.);



const res = await fetch('https://deno.com')
const body = await res.text()

console.log(body.slice(0, 100))
