const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')
const UssdMenu = require('ussd-menu-builder');
const db = require('./data/dbConfig')

let menu = new UssdMenu();
const Countries = require('./countries-model')


const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const countries = (phoneNumber, session, text) => {
  const name = 'kenya';
  
  return db('countries').where({name})
}


menu.startState({
  
  run: () => {
    menu.con(`\n1. Go To Market \n2. goodbye`)
  }, 
  next: {
    '1': 'position',
    '2': 'goodbye'
  }
})

menu.state('goodbye', {
  run: () => {
    menu.end(`goodbye`)
  }
})

menu.state('position', {
  run: () => {
    menu.con(`\n1. buyer \n2. seller`)
  },
  next: {
    '1': 'buyer',
    '2': 'seller'
  }
})


menu.state('buyer', {
  run: () => {
    const {phoneNumber, sessionId, text} = menu.args;
    countries(phoneNumber, sessionId, text)
    .then(res => {
      if(res.length>0){
        let ops ='';
        for(let i= 0; i< res.length; i++) {
          ops +=`{res[i].id} : ${res[i].name}`
        }
        menu.con(`${res.length} ${ops}`)
      }else{
        menu.con('nope')
      }
    })
  }, 
  defaultNext: 'goodbye'
});


menu.on('error', err => {
  console.log(err);
})


menu.state('kenya', {
  run: () => {
    menu.con('markets, \n1. 1st market \n2. 2nd market')
  },
  next: {
    '1':'1st market',
    '2':'2nd market'
  }
})


menu.state('1st market', {
  run : ()=> {
    menu.end(`nothing here today, thanks for looking sucker!`)
  }
})


app.post('*', (req, res) => {
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    text: req.body.text
  }
  menu.run(args, ussdResult => {
    // console.log("PHONE: ", args.phoneNumber);
    // console.log("SESSION: ", args.sessionId);
    // console.log("SERVICE CODE: ", args.serviceCode);
    // console.log("TEXT: ", args.text);
    console.log('args', args);
    db('sessions').insert(args.toString()).then(res => {
      
      res.status(201).json(args)
    })
    res.send(ussdResult);
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})