const http = require("http")
const port = 3000
const hostname = "localhost"

const server = http.createServer((req,res)=>{
    res.setHeader('content-tpe','text/html')
    res.write('<body class="app"></body>')
    res.write('<h1>Successfully working code</h1>')
    res.write('<p> this is paragraph </p>')
    res.end()
})

server.listen(port,()=>{
    console.log(`server listen on port ${port}`)
})
