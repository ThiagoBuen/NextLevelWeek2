const Database = require('./database/db')

const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')

function pageLanding(req, ans){
    return ans.render("index.html")
}

async function pageStudy(req, ans){
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time){
        return ans.render("study.html", { filters, subjects, weekdays })
    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    //caso haja erro na execução da consulta do db

    try{
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        } )

        return ans.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }
}

function pageGiveClass(req, ans){
    
    return ans.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req,ans){

    const createProffy = require('./database/createProffy')
    const data = req.body;

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
 
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map(
        (weekday, index) => {
            return {
                weekday: weekday,
                time_from: convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index])
            }
    })

    try{

        const db = await Database
    
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
    
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]


        return ans.redirect("/study" + queryString)

    } catch (error){
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClass,
    saveClasses  
}