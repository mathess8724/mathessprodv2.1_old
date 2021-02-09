// imports
var express =require('express');
var axios = require('axios');
var bodyParser = require('body-parser');

const { json } = require('body-parser');
var moment = require('moment');
var cors = require('cors');

// Instantiate seerver
var server = express();
server.use(cors());

// visits counter
let startTime = moment().format('MMMM Do YYYY, h:mm:ss a');
let counter = 0;
let latestGet;
let captchaRequests = 0;

// bodyparser config
server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());

//recaptcha
secret = '6LddZUwaAAAAAHalk47EjHvTBtLNuWA6t8pOCnWu';
captchaCheck = {
    checked: undefined,
    response: null
}

// Configure routes
server.get('/', function(req, res) {
    counter ++;
    latestGet = moment().format('MMMM Do YYYY, h:mm:ss a');
    current = moment().format('MMMM Do YYYY, h:mm:ss a');
    console.log('new get at ' + latestGet);
    captcha = checking();
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`<h4>Server is running . . .</h4><br>
    <p>Latest get ${latestGet}<p><br>
    <p>Start running at  ${startTime}</p><p>visits: ${counter}<p/>
    <br><br><div>captcha requests : ${captchaRequests}</div>`);
});

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

server.route('/api/captcha')
  .get(function (req, res) {
      error = {msg: 'for check a captcha, please, use post method',
                err: 'method error'};
      res.status(400).json(error);
      
  })
  .post(function (req, res) {
     tok = req.body.token;
      secret = '6LddZUwaAAAAAHalk47EjHvTBtLNuWA6t8pOCnWu';
      error = {err: '', msg:'', token :'null'};
      captchaResponse = null;
      console.log('tooooken is ' , tok);
      req.body.token === null ? error.token = 'is null' : error.token = '';
        req.body.token === undefined ? error.token = 'is undefined' : error.token = '';
      if(req.body.token === null || req.body.token === undefined){
        error.err = 'bad request *token';
        error.msg = 'missing token, please add the token in params';
        
          res.status(400).json(error);

      }else{
        
        console.log('got data : ', req.body.token);
        checking(req.body.token).then( result => {
          //console.log(result);
          res.status(200).json(result);
          //res.sendStatus(201).json({result: 'result'});         
          ///res.send(200).json({checked: 'passed'})
        }).catch( function(error) {
          
        });
        

        //res.status(200).json(req.body.token);
      }
      
      

       //checking(req.body.token);
       //captchaRequests ++;
       //res.send(captchaCheck);
       //res.send(captchaResponse);
       //console.log('clg of checking : ',checking(token));
  })
  .put(function (req, res) {
    res.send('Update the book')
  })


  // Functions

   checking = async (token) => {
    /* await axios.post(`https://www.google.com/recaptcha/api/siteverify`,
    {data : {secret: 'secret'}}) */
    
    return captchaCheck;
  }


/* server.post('api/', (req, res) => {
    console.log('new connection ..')
    token = req.body.token;

    rres.json(
        {data: undefined}
    )
});
server.use('/api/', apiRouter);
 */

// Launch server
server.listen(8080, function() {
    console.log('Server is listenning on port 8080 . . .');
})
