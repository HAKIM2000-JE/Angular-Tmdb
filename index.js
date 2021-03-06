const express = require('express')
const app = express()

const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

const path = require('path')

const articleRouter= require('./routes/articles')

const answerRouter = require('./routes/answers')

const filmRouter = require('./routes/films')

const questionRouter = require('./routes/question')


const userRouter = require('./routes/user')

const CommentaireRouter = require('./routes/commentaire')

app.use('/',express.static(path.join("angular-film")))

var cors = require('cors')

const port = process.env.PORT || 5000
const URI = process.env.MONGODBURI 

app.use(cors())

const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost:27017/films', { useNewUrlParser: true , useUnifiedTopology: true })


app.use(methodOverride('_method'))

require('./config/passport')(passport)

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
       
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/articles', articleRouter)
app.use('/answers', answerRouter)

app.use('/films', filmRouter)

app.use('/questions', questionRouter)

app.use('/user', userRouter)


app.use('/commentaire', CommentaireRouter)




app.use('/auth', require('./routes/auth'))



app.set('view engine','ejs')


app.get('/*', async (req,res)=>{
   
    
    res.sendFile(path.join(__dirname,"angular-film","index.html"))
})

app.use('/', require('./routes/index'))
app.use('/public', express.static(__dirname + '/public'));





app.listen(port)