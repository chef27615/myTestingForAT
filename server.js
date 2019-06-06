const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const Countries = require('./countries-model')
const Markets = require('./markets-model')


const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('ussg testing ground')
})

app.post('*', async (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  
 const countries = await app.get('/', async (req, res) => {
    try{
      const countries = await Countries.get();
      res.status(200).json(countries)
    }catch(err){res.status(400).json({message:'bad request'})}
  })

  switch(text) {
    case '':
      response= `CON Welcome to Sauti Marketplace, country selection 
      ${countries}
      `;
      break;
    case '1':
      response=`CON choose your market
      1. 1st
      2. 2nd
      3. 3rd
      `;
      break;
    case '2':
      response=`END goodbye`;
      break;
    case '1*1':
      response=`CON what do you want to purchase?
      1. potato
      2. unicorn
      `;
    break;
    case '1*1*1':
      response=`END potato is $200/ea today, pretty expensive`;
      break;
    case '1*1*2':
      response=`END unicorn is out of stock today, please try tomorrow`;
      break;  
    
    default:
      response = 'Please try again'  
  }
  res.send(response)
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})