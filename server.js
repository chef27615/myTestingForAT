const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const UssdMenu = require('ussd-menu-builder');


const menu = new UssdMenu();
const Countries = require('./countries-model')
const Markets = require('./markets-model')


const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let countries = app.get('*', async (req, res) => {
   try{
      names = await Countries.get();
     res.status(200).json(names)
    }catch(err){console.log(err)}
  })


app.get('*', (req, res) => {
  res.send(countries)
})

app.post('/ussd', (req, res) => {
  let { phoneNumber, sessionId, serviceCode, text} = req.body;
  menu.run(text, resMsg => {
    res.send(resMsg)
  });
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})