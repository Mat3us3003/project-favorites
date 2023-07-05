const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {

    const file = (req.url === '/') ? 'index.html' : req.url
    const pathFile = path.join(__dirname, 'public', file)

    const extname = path.extname(pathFile)
    const allowedFileTypes = ['.html', '.css', '.js']
    const allowed = allowedFileTypes.find((item) => item == extname)
    if (!allowed) return //Em resumo, um break, não vai execultar mais nada abaixo.

    fs.readFile(pathFile, (err, content) => {
        if (err) throw err

        res.end(content)

    })
    /*
    if (req.url === '/') 

        })
        */
}).listen(5000, () => {
    console.log('Servidor rodando')
})