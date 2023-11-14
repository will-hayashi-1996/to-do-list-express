const express= require('express');
const path = require('path')
const app = express();
const methodOverride = require('method-override')
app.use(methodOverride('_method', {methods: ['POST','GET']}))

const checkListRouter = require('./src/routes/checklist')
const taskRouter = require('./src/routes/task')

const rootRouter = require('./src/routes/index')



require('./config/database')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

app.use('/',rootRouter)
app.use('/checklists',checkListRouter)
app.use('/checklists',taskRouter.checklistDependent)
app.use('/tasks',taskRouter.simple)

app.listen(3000, () => {
    console.log('Servidor foi iniciado');
})