const proffys = [
    { 
      name: "Diego Fernandes",
      avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
      whatsapp: "+553599760853", 
      bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
      subject: "Quimica", 
      cost: "20", 
      weekday: [
          0
      ], 
      time_from: [720], 
      time_to: [1220] 
    },
    { 
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
        whatsapp: "+553599760853", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
        subject: "Quimica", 
        cost: "20", 
        weekday: [
            0
        ], 
        time_from: [720], 
        time_to: [1220] 
      },
      { 
        name: "O brabo",
        avatar: "https://avatars1.githubusercontent.com/u/49308697?s=400&u=ae59f06fae377f6a2b4594faf0e494b7f1a50576&v=4", 
        whatsapp: "+553599760853", 
        bio: "Entusiasta das melhores tecnologias de programação e sedução avançada.<br><br>Apaixonado por fazer entrevistas nas empresas, o doido do café e galante das monitorias.", 
        subject: "História", 
        cost: "Imensurável", 
        weekday: [
            0
        ], 
        time_from: [720], 
        time_to: [1220] 
      }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function pageLanding(req, ans){
    return ans.render("index.html")
}

function pageStudy(req, ans){
    const filters = req.query
    return ans.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClass(req, ans){
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0

    if(isNotEmpty){

        data.subject = getSubject(data.subject)
        
        proffys.push(dados)

        return res.redirect("/study")
    }

    return ans.render("give-classes.html", {subjects, weekdays})
}

function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server

.use(express.static('public'))

.get("/", pageLanding)

.get("/study", pageStudy)

.get("/give-classes", pageGiveClass)

.listen(5500)
