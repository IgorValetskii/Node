const http = require('http');
const fs = require('fs');
const url = require('url');


const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req, res) => {

    res.writeHead(200,{'Content-Type' : 'text/plain'});

    const myUrl = new URL (`http://${hostname}:${port}/show/?name=Vasya`);

    if(req.url === '/'){
        res.end('Hello World!');
    }

    if(req.url === '/hello') {
        res.writeHead(200,{'Content-Type' : 'text/html; charset=utf-8' });
        fs.createReadStream(__dirname + '/hello.html').pipe(res);
    }

    if(req.url === '/text') {
        fs.readFile('./text.txt', "utf8",
            function(error,data){
                console.log("Асинхронное чтение файла");
                if(error) throw error; // если возникла ошибка
                res.end(data);  // выводим считанные данные
            });
    }

    if(req.url === '/show?name=Vasya'){

        const paramsUrl = myUrl.searchParams;

        const name = paramsUrl.get('name');
        res.end(`Hello ${name}`);
    }
});


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
