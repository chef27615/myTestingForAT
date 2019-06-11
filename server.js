const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const UssdMenu = require('ussd-menu-builder');


let menu = new UssdMenu();
const Countries = require('./countries-model')
const Markets = require('./markets-model')


const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get('*', async (req, res) => {
//    try{
//      names = await Countries.get();
//      res.status(200).json(names)
//     }catch(err){res.status(500).json({message:'no'})}
//   })

menu.startState({
  run: () => {
    menu.con(`welcome, your option \n1. kenya \n2. rwanda \n3. uganda`);
  },
  next: {
    '1':'kenya',
    '2':'rewanda',
    '3':'uganda'
  }
});
// menu.on('error', err => {
//   console.log(err);
// })

// menu.state('1', {
//   run: () => {
//     menu.con('markets')
//   },
//   next: {
//     '1':'1st market',
//     '2':'2nd market'
//   }
// })

// menu.state('1', {
//   run : ()=> {
//     menu.end(`nothing here today, thanks for looking sucker!`)
//   }
// })


app.post('/ussd', (req, res) => {
  menu.run(req.body, ussdResult => {
    res.send(ussdResult);
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})