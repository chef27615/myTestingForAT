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

app.get('*', async (req, res) => {
   try{
     names = await Countries.get();
     res.status(200).json(names)
    }catch(err){res.status(500).json({message:'no'})}
  })

  app.post("*", (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;
    let accountNumber = "ACC1001";
    let prices = "NGN 10,000";
    let response = "";
    let country = "BTI";
    switch (text) {
      case "":
        response =
          "CON Choose your country \n 1. BDI \n 2. DRC \n 3. KEN \n 4. MWI \n 5. RWA \n 6. SSD \n 7. TZA \n 8. UGA";
        break;
      case "1":
        response =
          "CON Choose your marketplace \n 1. Bujumbura \n 2. Gitega \n 3. Ngozi";
        break;
      case "1*1":
        response =
          "CON Choose your commodity \n 1. Animal Products \n 2. Beans \n 3. Cereals";
        break;
      case "1*1*1":
        response =
          "CON Choose your sub-category \n 1. Animal Products \n 2. Livestock \n 3. Poultry";
        break;
      case "1*1*1*1":
        response =
          "CON Choose your product \n 1. Eggs \n 2. Exotic Eggs \n 3. Local Eggs";
        break;
      case "1*1*1*1*1":
        let sql = `
        SELECT price 
        FROM products
        WHERE country = BTI AND market = 'Bujumbaru' AND product = 'beans'`;
        let option = db.raw(sql, (err, res) => {
          if (err) {
            return console.log(err.message);
          } else {
            console.log(res);
          }
        });
  
        response = `END Current prices for \n Eggs ${option}`;
        break;
      default:
        response = "Bad request!";
    }
    res.send(response);
  });

// menu.startState({
//   run: () => {
//     menu.con(`welcome, your option \n1. kenya \n2. rwanda \n3. uganda`);
//   },
//   next: {
//     '1':'kenya',
//     '2':'rwanda',
//     '3':'uganda'
//   }
// });
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


// app.post('/ussd', (req, res) => {
//   menu.run(req.body, ussdResult => {
//     res.send(ussdResult);
//   })
// })

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})