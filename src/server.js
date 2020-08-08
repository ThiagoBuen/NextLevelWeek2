const { pageLanding, pageStudy, pageGiveClass, saveClasses } = require('./pages')

const express = require('express')
const server = express()


const nunjucks = require('nunjucks')

server.use(express.urlencoded({ extended:true }))

server.use(express.static('public'))


nunjucks.configure('src/views', {
    express: server,
    noCache: true,
});

server.get("/", pageLanding);

server.get("/study", pageStudy);

server.get("/give-classes", pageGiveClass);

server.post("/save-classes", saveClasses);



server.listen(5000);
