const menuRouter = require('./menu')

function route(app){
    app.get('/', (req, res) => {
        res.render('home')
    })
    
    app.get('/bookdesk', (req, res) => {
        res.render('deskbook')
    })
    
    app.use('/menu', menuRouter)
    
    app.get('/search', (req, res) => {
        res.render('search')
    })
    
    app.get('/register',(req,res) => {
        res.render('register')
    })
    
    app.post('/register',(req,res) => {
        console.log(req.body)
        res.send('registered')
    })
}

module.exports = route