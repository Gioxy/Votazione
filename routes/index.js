var express = require('express');
var router = express.Router();
var myObj={utenti:[{nickname:"admin",password:"kappa",voto:""}]};
var voti={"votiTot":0, "votoR":0, "votoB":0, "votoG":0, "votoAstenuto":0};
var logged=false;
var register=false;
var nick;
var adminLog=false;
var AdNick;
var rim=false;
var aId;


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login',(req,res,next)=>{
  res.render('LogProgetto');
})
router.get("/adminPage",(req,res)=>{
  res.render("adminPage");
})

router.post("/rimuovi",(req,res)=>{
  var utenteRim=req.body.nick;
  for(i=0;i<myObj.utenti.length;i++){
    if(myObj.utenti[i].nickname==utenteRim){
      if(myObj.utenti[i].voto=="red"){
        voti.votiTot--;
        voti.votoR--;
      }
      if(myObj.utenti[i].voto=="blue"){
        voti.votiTot--;
        voti.votoB--;
      }
      if(myObj.utenti[i].voto=="green"){
        voti.votiTot--;
        voti.votoG--;
      }
      if(myObj.utenti[i].voto=="astenuto"){
        voti.votiTot--;
        voti.votoAstenuto--;
      }
      myObj.utenti.splice(i,1);
      rim=true;
      break;
    }
  }
  res.send({rim,aId});
  rim=false;
})

router.get("/manage",(req,res)=>{
  res.send(myObj);
})

router.post('/admin',(req,res)=>{
  var ok=req.body.ok;
  aId=req.body.idUser;
  Adnick=req.body.nickname;
  if(ok){
    res.send(ok);
    router.get("/adminControl"+aId,(req,res)=>{
      res.render("adminControl");
    })
  }
})

router.post('/votazione',(req,res)=>{
  var ok=req.body.ok;
  var id=req.body.idUser;
  nick=req.body.nickname;
  if(ok){
    res.send(ok);
    router.get('/votazione'+id,(req,res)=>{
      res.render('votazione');
    });
  }
})

router.get('/getNome',(req,res)=>{
  res.send(nick);
  nick="";
})
router.post("/logout",(req,res)=>{
  nick=req.body.nick;
  res.send(nick);
})

router.post('/getRegistration',(req,res)=>{
  var username=req.body.nickname;
  var userpass=req.body.password;
  for(i=0;i < myObj.utenti.length;i++){
    if(myObj.utenti[i].nickname==username){
      register=false;
      res.send(register);
      break;
    }else{
      register=true;
    }
  }
  if(register===true){
    var oj={nickname : username, password : userpass, voto:""};
    myObj.utenti.push(oj);
    res.send(username);
  }
})
router.post('/getLogin',(req,res)=>{
  var username=req.body.nickname;
  var userpass=req.body.password;
  for(i=0;i < myObj.utenti.length;i++){
    if(myObj.utenti[i].nickname== username && myObj.utenti[i].password== userpass){
      logged=true;
      res.send(logged);
      break;
    }else {
      logged=false;
    }
  }
  res.send(logged);
})

router.post("/adminLog",(req,res)=>{
  var adminname=req.body.nickname;
  var adminpass=req.body.password;
  for(i=0;i < myObj.utenti.length;i++){
    if(myObj.utenti[i].nickname== adminname && adminname=="admin" && myObj.utenti[i].password== adminpass){
      adminLog=true;
      res.send(adminLog);
      break;
    }else {
      adminLog=false;
    }
  }
  res.send(adminLog);
})

router.post("/sendVoto",(req,res)=>{
  var voto=req.body.voto;
  if(voto==undefined){
    res.send("votoNull");
    voto="";
  }
  var nick=req.body.nickname;
  for(i=0;i<myObj.utenti.length;i++){
    if(myObj.utenti[i].nickname==nick){
      if(myObj.utenti[i].voto=="" || myObj.utenti[i].voto==null || myObj.utenti[i].voto==undefined){
        myObj.utenti[i].voto=voto;
        if(voto!="")
          voti.votiTot++;
          if(voto=="red")
            voti.votoR++;
          if(voto=="blue")
            voti.votoB++;
          if(voto=="green")
            voti.votoG++;
          if(voto=="astenuto")
            voti.votoAstenuto++;
        res.send("votoOK");
        break;
      }else{
        res.send("votoNotOk");
        break;
      }
    }
  }
})

router.get("/aggiorna",(req,res)=>{
  res.send(voti);
})

module.exports = router;
