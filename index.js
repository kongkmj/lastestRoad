var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var querystring = require('querystring');

require('events').EventEmitter.prototype._maxListeners = 0;


//http server
var http = require('http').Server(app);
var io = require('socket.io')(http);


var data_001,data_002,data_003,data_004,data_005;
var noti001,noti002,noti003,noti004,noti005;
var rule_001,rule_002,rule_003,rule_004,rule_005;



var parse;  //???
var alaram=""; // 알람을 담을 그릇

var intervalmessage; // 클라이언트 주기버튼 메시지를 담을 변수
var standardData;

var rangedata = new Array(5);



var rcrule = new Array(5); // 디바이스로부터 받은 기준치
var rcinterval ; // 디바이스로 부터 받은 주기

var reccount=0;
/*
  reccount+=1;
  console.log("카운틐ㄴ튼 "+reccount);
*/


var dbprevData = new Array(20); //역순으로 데이터를 찾기에 순서를 바꿔줄 그릇


// TCP
var net = require('net');
var server = net.createServer(function (socket2) {



  

    //웹에서 주기버튼 눌렀을시
  io.on('connection',function (socket) {
    socket.on('intervalEV',function (message) {
      intervalmessage=message;
      
      socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+message+"b");
    });
   

  });


   

   io.on('connection',function (socket) {
    socket.on('standardData',function (std) {

      
      socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+intervalmessage+"b");
    })
   

  });


  //client와 접속이 끊겻을때
  socket2.on('close',function () {
    //io.close()
    console.log('client disconnected');

    //socket2.end("good bye");
  });
  socket2.on('error',function (err) {

    //console.log(err);
  });

  console.log(socket2.address().address+"connected");

  //client로 부터 오는 data 출력
  socket2.on('data',function (data) {


  //문자열로 변환
  var recieveData   = ""+data;
  var recieveArray  = recieveData.split(','); //데이터를 ','로 split

  console.log(recieveArray);
  //time
  var now = new Date();
  var hour = now.getHours();
  var min = now.getMinutes();
  var second = now.getSeconds();


  //beacon1
  var d001 =(recieveArray[0]); // 부호
  var d002 =(recieveArray[1]); // roll
  var d003 =(recieveArray[2]); // 부호
  var d004 =(recieveArray[3]); // pitch
  var d005 =(recieveArray[4]); // 민감도

  //beacon2
  var d006 =(recieveArray[5]); // 부호
  var d007 =(recieveArray[6]); // roll
  var d008 =(recieveArray[7]); // 부호
  var d009 =(recieveArray[8]); // pitch
  var d010 =(recieveArray[9]); //민감도

  //beacon3
  var d011 =(recieveArray[10]); // 부호
  var d012 =(recieveArray[11]); // roll
  var d013 =(recieveArray[12]); // 부호
  var d014 =(recieveArray[13]); // pitch
  var d015 =(recieveArray[14]); // 민감도

  //beacon4
  var d016 =(recieveArray[15]); // 부호
  var d017 =(recieveArray[16]); // roll
  var d018 =(recieveArray[17]); // 부호
  var d019 =(recieveArray[18]); // pitch
  var d020 =(recieveArray[19]); // 민감도

  var d021 =(recieveArray[20]); // 부호
  var d022 =(recieveArray[21]); // roll
  var d023 =(recieveArray[22]); // 부호
  var d024 =(recieveArray[23]); // pitch
  var d025 =(recieveArray[24]); // 민감도
  var d026 =(recieveArray[25]); // 주기

// roll+pitch 값계산 
  var parsingdata = new Array(5);
  parsingdata[0] =  parseInt(d002) + parseInt(d004);
  parsingdata[1] =  parseInt(d007) + parseInt(d009);
  parsingdata[2] =  parseInt(d012) + parseInt(d014);
  parsingdata[3] =  parseInt(d017) + parseInt(d019);
  parsingdata[4] =  parseInt(d022) + parseInt(d024);

//기준치 계산

rcrule[0] = d005;
rcrule[1] = d010;
rcrule[2] = d015;
rcrule[3] = d020;
rcrule[4] = d025;

//주기
rcinterval = d026;

// 수신 데이터 최대치 조정

  data_001=parsingdata[0];
  data_002=parsingdata[1];
  data_003=parsingdata[2];
  data_004=parsingdata[3];
  data_005=parsingdata[4];

 var beacon_Data = new beaconData({
  beacon001:parsingdata[0],
  beacon002:parsingdata[1],
  beacon003:parsingdata[2],
  beacon004:parsingdata[3],
  beacon005:parsingdata[4],
  rectime:(hour+":"+min+":"+second)
    });
  beacon_Data.save(function (err,beacon_Data) {
    console.log("성공");
  });



if(data){

//디바이스에서 보낸 민감도와 다를경우
if(rcrule[0]!=rangedata[0]){
  socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+intervalmessage+"b");
}
if(rcrule[1]!=rangedata[1]){
  socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+intervalmessage+"b");
}
if(rcrule[2]!=rangedata[2]){
  socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+intervalmessage+"b");
}
if(rcrule[3]!=rangedata[3]){
  socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+intervalmessage+"b");
}
if(rcrule[4]!=rangedata[4]){
  socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+intervalmessage+"b");
}

//디바이스에서 보낸 주기와 다를 경우
if(rcinterval!=intervalmessage){
  socket2.write("a"+rangedata[0]+","+rangedata[1]+","+rangedata[2]+","+rangedata[3]+","+rangedata[4]+","+intervalmessage+"b");
}

}



/** 데이터 확인 로그 **/




//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 기준 관련 START @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// 기준 설정

var parse1,parse2,parse3,parse4,parse5;



// (1)
if(rule_001.range001!=undefined){
  parse1=rule_001.range001;
}
// (2)
if(rule_002.range002!=undefined){
  parse2=rule_002.range002;
}
// (3)
if(rule_003.range003!=undefined){
  parse3=rule_003.range003;
}
// (4)
if(rule_004.range004!=undefined){
  parse4=rule_004.range004;
}
// (5)
if(rule_005.range005!=undefined){
  parse5=rule_005.range005;
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 기준 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 알람 관련 start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// (1) 알람 연산
var plus001 =parseInt(rule_001.rule001)+parseInt(parse1);
var minus001 =parseInt(rule_001.rule001)-parse1;

console.log(plus001);
console.log(minus001);
if((parsingdata[0]>plus001)||(parsingdata[0]<minus001)){
  noti001=1;
}
if((parsingdata[0]<=plus001)&&(parsingdata[0]>=minus001)){
  noti001=0;
}


// (2) 알람 연산
var plus002 =parseInt(rule_002.rule002)+parseInt(parse2);
var minus002 =parseInt(rule_002.rule002)-parse2;

if((parsingdata[1]>plus002)||(parsingdata[1]<minus002)){
  noti002=1;
}
if((parsingdata[1]<=plus002)&&(parsingdata[1]>=minus002)){
  noti002=0;
}


// (3) 알람 연산
var plus003 =parseInt(rule_003.rule003)+parseInt(parse3);
var minus003 =parseInt(rule_003.rule003)-parse3;

if((parsingdata[2]>plus003)||(parsingdata[2]<minus003)){
  noti003=1;
}
if((parsingdata[2]<=plus003)&&(parsingdata[2]>=minus003)){
  noti003=0;
}


// (4) 알람 연산
var plus004 =parseInt(rule_004.rule004)+parseInt(parse4);
var minus004 =parseInt(rule_004.rule004)-parse4;

if((parsingdata[3]>plus004)||(parsingdata[3]<minus004)){
  noti004=1;
}
if((parsingdata[3]<=plus004)&&(parsingdata[3]>=minus004)){
  noti004=0;
}


// (5) 알람 연산
var plus005 =parseInt(rule_005.rule005)+parseInt(parse5);
var minus005 =parseInt(rule_005.rule005)-parse5;

if((parsingdata[4]>plus005)||(parsingdata[4]<minus005)){
  noti005=1;
}
if((parsingdata[4]<=plus005)&&(parsingdata[4]>=minus005)){
  noti005=0;
}





//알람 배열
var notiarr=[noti001,noti002,noti003,noti004,noti005];
//console.log("notiarr: "+notiarr);
  alaram="";
  for(var i=0;i<10;i++){
    if(notiarr[i]==1){
      alaram+=1+i+"번 ";
    }
  }
  console.log("알람: "+alaram);




//alaram DB저장
if(alaram!=""){
  var alaramsave = new alaram1({
        id:1,
        alaram:alaram
      });
    //  console.log("알람저장");
    alaramsave.save(function (err,alaramsave) {
      //  console.log(alaramsave);
  });
}



// (1) 알림
if(noti001==1){
  var log1 = new beacon001({
      bnum:1,
      gnum:1,
      status:"경고",
      beacon:parsingdata[0]
    });
    console.log("1번 비콘 경고 받음");
  log1.save(function (err,log1) {
  });
}

// (2) 알림
if(noti002==1){
  var log2 = new beacon002({
      bnum:2,
      gnum:1,
      status:"경고",
      beacon:parsingdata[1]
    });
    console.log("2번 비콘 경고 받음");
  log2.save(function (err,log2) {
      console.log(log2);
  });
}

// (3) 알림
if(noti003==1){
  var log3 = new beacon003({
      bnum:3,
      gnum:1,
      status:"경고",
      beacon:parsingdata[2]
    });
    console.log("3번 비콘 경고 받음");
  log3.save(function (err,log3) {
  });
}

// (4) 알림
if(noti004==1){
  var log4 = new beacon004({
      bnum:4,
      gnum:1,
      status:"경고",
      beacon:parsingdata[3]
    });
    console.log("4번 비콘 경고 받음");
  log4.save(function (err,log4) {
  });
}

// (5) 알림
if(noti005==1){
  var log5 = new beacon005({
      bnum:5,
      gnum:1,
      status:"경고",
      beacon:parsingdata[4]
    });
    console.log("5번 비콘 경고 받음");
  log5.save(function (err,log5) {
  });
}




  // 서버 -> 클라이언트 이벤트 (수신데이터,알람데이터)

io.emit('chat message',parsingdata,alaram);
  });
  
//test
/*
io.emit('chat message',recieveArray,parsingdata,alaram);
  });
*/


  rule001.find({}).sort('-createdAt').exec(function (err, r001) {

      rule_001=r001[0];
      if(rule_001==undefined){
      rule_001={rule001:"10",range001:"10"};
      }
      rule002.find({}).sort('-createdAt').exec(function (err, r002) {

          rule_002=r002[0];
          if(rule_002==undefined){
          rule_002={rule002:"10",range002:"10"};
          }
          rule003.find({}).sort('-createdAt').exec(function (err, r003) {

              rule_003=r003[0];
              if(rule_003==undefined){
              rule_003={rule003:"10",range003:"10"};
              }
              rule004.find({}).sort('-createdAt').exec(function (err, r004) {

                  rule_004=r004[0];
                  if(rule_004==undefined){
                  rule_004={rule004:"10",range004:"10"};
                  }
                  rule005.find({}).sort('-createdAt').exec(function (err, r005) {

                      rule_005=r005[0];
                      if(rule_005==undefined){
                      rule_005={rule005:"10",range005:"10"};
                      }
                });
            });
        });
    });
});





//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 알람 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

});


// 에러처리
server.on('error',function (err) {
  console.log('err'+err);
});

//port 11111로 연결 대기
server.listen(11111,function () {
  console.log('TCP listening on 11111');
});


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ DB 관련 start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//##################### DB 연결 ########################
mongoose.connect("mongodb://test:test@ds023664.mlab.com:23664/roadtest");
var db = mongoose.connection;
db.once("open",function () {
  console.log("DB connected");
});
db.on("error",function (err) {
  console.log("DB ERROR: ",err);
});


//##################### model setting ##################

//##################### recieveData ####################
var beaconDataSchema = require('./model/beacons/beaconData');
var beaconData = mongoose.model('rcdata',beaconDataSchema);


//##################### beacons ########################
var beacon001Schema =require('./model/beacons/beacon001');
var beacon001 = mongoose.model('bc001',beacon001Schema);

var beacon002Schema =require('./model/beacons/beacon002');
var beacon002 = mongoose.model('bc002',beacon002Schema);

var beacon003Schema =require('./model/beacons/beacon003');
var beacon003 = mongoose.model('bc003',beacon003Schema);

var beacon004Schema =require('./model/beacons/beacon004');
var beacon004 = mongoose.model('bc004',beacon004Schema);

var beacon005Schema =require('./model/beacons/beacon005');
var beacon005 = mongoose.model('bc005',beacon005Schema);




//###################### rules #########################
var rule001Schema = require('./model/rules/rule001');
var rule001 = mongoose.model('r001',rule001Schema);

var rule002Schema = require('./model/rules/rule002');
var rule002 = mongoose.model('r002',rule002Schema);

var rule003Schema = require('./model/rules/rule003');
var rule003 = mongoose.model('r003',rule003Schema);

var rule004Schema = require('./model/rules/rule004');
var rule004 = mongoose.model('r004',rule004Schema);

var rule005Schema = require('./model/rules/rule005');
var rule005 = mongoose.model('r005',rule005Schema);



//##################### alaram ########################
var alaramSchema = require('./model/alaram');
var alaram1 = mongoose.model('a',alaramSchema);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ DB 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs'); // view engine 설정

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));// 정적폴더 세팅




//@@@@@@@@@@@@@@@@@@@@@@@@@@@ mapping 관련 START @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//##################### 접속 첫 페이지 ########################
app.get('/',function (req,res) {
  res.render('index');

});


app.get('/input',function (req,res) {



  rule001.find({}).sort('-createdAt').exec(function (err, r001) {

      rule002.find({}).sort('-createdAt').exec(function (err, r002) {

          rule003.find({}).sort('-createdAt').exec(function (err, r003) {

              rule004.find({}).sort('-createdAt').exec(function (err, r004) {

                  rule005.find({}).sort('-createdAt').exec(function (err, r005) {


                              rule_001=r001[0];
                              rule_002=r002[0];
                              rule_003=r003[0];
                              rule_004=r004[0];
                              rule_005=r005[0];

                              if(rule_001==undefined){
                                rule_001={rule001:"10",range001:"10"};
                              }
                              if(rule_002==undefined){
                                rule_002={rule002:"10",range002:"10"};
                              }
                              if(rule_003==undefined){
                                rule_003={rule003:"10",range003:"10"};
                              }
                              if(rule_004==undefined){
                                rule_004={rule004:"10",range004:"10"};
                              }
                              if(rule_005==undefined){
                                rule_005={rule005:"10",range005:"10"};
                              }


                              res.render("input",{data_1:rule_001,data_2:rule_002,data_3:rule_003,data_4:rule_004,data_5:rule_005});

          });
        });
      });
    });
  });
});




//################# 기준치 설정 POST START #######################

// (1)
app.post('/input1',function (req,res) {
  var ruledata;
  
  if(req.body.ruleid1=="on"){
    ruledata = data_001;
  }
  else{
    ruledata=rule_001.rule001;
  }
  if(req.body.range1==undefined){
    rangedata[0]= rule_001.range001;
  }
  else{
    rangedata[0]=req.body.range1;
  }
  var log1 = new rule001({
    rule001:ruledata,
    range001:rangedata[0]
  });
  log1.save(function (err,log1) {
    console.log(log1);
  });

 

   io.emit('email1');
    
  
   console.log(rangedata[0]);
  res.redirect('/input');
});

// (2)
app.post('/input2',function (req,res) {
  var ruledata;

  if(req.body.ruleid2=="on"){
    ruledata = data_002;
  }
  else{
    ruledata=rule_002.rule002;
  }
  if(req.body.range2==undefined){
    rangedata[1]= rule_002.range002;
  }
  else{
    rangedata[1]=req.body.range2;
  }
  var log2 = new rule002({
    rule002:ruledata,
    range002:rangedata[1]
  });
  log2.save(function (err,log2) {

  });
   io.emit('email2');
  res.redirect('/input');
});

// (3)
app.post('/input3',function (req,res) {
  var ruledata;

  if(req.body.ruleid3=="on"){
    ruledata = data_003;
  }
  else{
    ruledata=rule_003.rule003;
  }
  if(req.body.range3==undefined){
    rangedata[2]= rule_003.range003;
  }
  else{
    rangedata[2]=req.body.range3;
  }
  var log3 = new rule003({
    rule003:ruledata,
    range003:rangedata[2]
  });
  log3.save(function (err,log3) {
  });
   io.emit('email3');
  res.redirect('/input');
});
// (4)
app.post('/input4',function (req,res) {
  var ruledata;

  if(req.body.ruleid4=="on"){
    ruledata = data_004;
  }
  else{
    ruledata=rule_004.rule004;
  }
  if(req.body.range4==undefined){
    rangedata[3]= rule_004.range004;
  }
  else{
    rangedata[3]=req.body.range4;
  }
  var log4 = new rule004({
    rule004:ruledata,
    range004:rangedata[3]
  });
  log4.save(function (err,log4) {
  });
   io.emit('email4');
  res.redirect('/input');
});

// (5)
app.post('/input5',function (req,res) {
  var ruledata;
  if(req.body.ruleid5=="on"){
    ruledata = data_005;
  }
  else{
    ruledata=rule_005.rule005;
  }
  if(req.body.range5==undefined){
    rangedata[4]= rule_005.range005;
  }
  else{
    rangedata[4]=req.body.range5;
  }
  var log5 = new rule005({
    rule005:ruledata,
    range005:rangedata[4]
  });
  log5.save(function (err,log5) {
  });
   io.emit('email5');
  res.redirect('/input');
});


//################# 기준치 설정 POST END #########################




//######################### 알람 EVENT ##########################
io.on('connection',function (socket) {

  socket.emit('news',alaram,dbprevData);
  //console.log("이것 봐라: "+dbprevData[0]);
  //console.log("2");
  //console.log("성공");
});


//################# 그래프 page mapping START ###################

// (total)
app.get('/realtimechart-0',function (req,res) {

//################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {
    //console.log(rcdata[16].rectime);

    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];

    //console.log(rcdata[1].beacon001);
    //console.log(dbprevData[1].beacon001);

  alaram1.findOne({id:1}).sort('-createdAt').exec(function (err,a) {
      rule001.find({}).sort('-createdAt').exec(function (err, r001) {
        rule002.find({}).sort('-createdAt').exec(function (err, r002) {
          rule003.find({}).sort('-createdAt').exec(function (err, r003) {
            rule004.find({}).sort('-createdAt').exec(function (err, r004) {
              rule005.find({}).sort('-createdAt').exec(function (err, r005) {
                  rule_001=r001[0];
                  rule_002=r002[0];
                  rule_003=r003[0];
                  rule_004=r004[0];
                  rule_005=r005[0];

                  res.render("realtimechart-0", {data1:rule_001,data2:rule_002,data3:rule_003,data4:rule_004,data5:rule_005,data6:a});
             });
            });
          });
        });
      });
    });
  });
});

// (1)
app.get('/realtimechart-1',function (req,res) {
  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {
    //console.log(rcdata[16].rectime);

    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];
  //console.log(r11);
  alaram1.findOne({id:1}).sort('-createdAt').exec(function (err,a) {

      rule001.find({}).sort('-createdAt').exec(function (err, r001) {
          rule_001=r001[0];
          if(rule_001==undefined){
            rule_001={rule001:"10",range001:"10"};
          }
          beacon001.find({}).sort('-createdAt').exec(function (err, bc001) {
                if (err) return res.json({success: false, message: err});
                  res.render("realtimechart-1", {data:bc001,data2:rule_001,data3:a});
              });
        });
    });
    });
});


// (2)
app.get('/realtimechart-2',function (req,res) {
  //console.log(r21);
  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {
    //console.log(rcdata[16].rectime);

    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];

  rule002.find({}).sort('-createdAt').exec(function (err, r002) {
      rule_002=r002[0];
      if(rule_002==undefined){
        rule_002={rule002:"10",range002:"10"};
      }
      beacon002.find({}).sort('-createdAt').exec(function (err, bc002) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-2", {data:bc002,data2:rule_002});
          });
      });
});
});

// (3)
app.get('/realtimechart-3',function (req,res) {
  //console.log(r31);
  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {
    //console.log(rcdata[16].rectime);

    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];
  rule003.find({}).sort('-createdAt').exec(function (err, r003) {
      rule_003=r003[0];
      if(rule_003==undefined){
        rule_003={rule003:"10",range003:"10"};
      }
      beacon003.find({}).sort('-createdAt').exec(function (err, bc003) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-3", {data:bc003,data2:rule_003});
          });
      });
});
});

// (4)
app.get('/realtimechart-4',function (req,res) {
  //console.log(r41);
  //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {
    //console.log(rcdata[16].rectime);

    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];
  rule004.find({}).sort('-createdAt').exec(function (err, r004) {
      rule_004=r004[0];
      if(rule_004==undefined){
        rule_004={rule004:"10",range004:"10"};
      }
      beacon004.find({}).sort('-createdAt').exec(function (err, bc004) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-4", {data:bc004,data2:rule_004});
          });
      });
});
});

// (5)
app.get('/realtimechart-5',function (req,res) {
  //console.log(r51);
    //################# 그래프 이전 데이터  #########################

//var nowtime = new Array(20);

// DB에서 최근 20개의 데이터를 역순 끝에서부터 20개를 받아오고있다.
beaconData.find({}).limit(20).sort({$natural:-1}).exec(function (err,rcdata) {
    //console.log(rcdata[16].rectime);

    //역순이라 다시 순서를 바꿔주고 있다.
    dbprevData[0]=rcdata[19];
    dbprevData[1]=rcdata[18];
    dbprevData[2]=rcdata[17];
    dbprevData[3]=rcdata[16];
    dbprevData[4]=rcdata[15];
    dbprevData[5]=rcdata[14];
    dbprevData[6]=rcdata[13];
    dbprevData[7]=rcdata[12];
    dbprevData[8]=rcdata[11];
    dbprevData[9]=rcdata[10];
    dbprevData[10]=rcdata[9];
    dbprevData[11]=rcdata[8];
    dbprevData[12]=rcdata[7];
    dbprevData[13]=rcdata[6];
    dbprevData[14]=rcdata[5];
    dbprevData[15]=rcdata[4];
    dbprevData[16]=rcdata[3];
    dbprevData[17]=rcdata[2];
    dbprevData[18]=rcdata[1];
    dbprevData[19]=rcdata[0];

  rule005.find({}).sort('-createdAt').exec(function (err, r005) {
      rule_005=r005[0];
      if(rule_005==undefined){
        rule_005={rule005:"10",range005:"10"};
      }
      beacon005.find({}).sort('-createdAt').exec(function (err, bc005) {
            if (err) return res.json({success: false, message: err});
              res.render("realtimechart-5", {data:bc005,data2:rule_005});
          });
      });
});
});



//################# 그래프 page mapping EMD #####################


//@@@@@@@@@@@@@@@@@@@@@@@@@@@ mapping 관련 END @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



http.listen(3000,function(){
    console.log('listening at 3000');

});
