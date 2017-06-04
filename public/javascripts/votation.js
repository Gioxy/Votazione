var nomeUt;
$(document).ready(function () {
  $.get("/getNome",function(data){
    if(data==""){
      alert("Effettua nuovamente il login");
      $(location).attr("href","/login");
    }
    $("#utente").text(data);
    nomeUt=data;
  });
  $("#logout").click(logout);
  $("#vota").click(vota);
  $("#risultati").click(aggiorna);
});

function vota(){
  $.post("/sendVoto",{
    voto: $("input:checked").val(),
    nickname: nomeUt
  },function(data){
    if(data=="votoOK")
      Materialize.toast('Votazione effetuata con successo', 4000,'rounded');
    if(data=="votoNotOk")
      Materialize.toast('Votazione già effettuata', 4000,'rounded');
    if(data=="votoNull")
      Materialize.toast('Seleziona la tua scelta', 4000,'rounded');
  })
}

function aggiorna(){
  $.get("/aggiorna",function(data){
    $("#rosso").text(Math.round((data.votoR*100)/data.votiTot)+"%");
    $("#blu").text(Math.round((data.votoB*100)/data.votiTot)+"%");
    $("#verde").text(Math.round((data.votoG*100)/data.votiTot)+"%");
    $("#croix").text(Math.round((data.votoAstenuto*100)/data.votiTot)+"%");
  })
}

function logout(){
  $.post("/logout",{
    nick:""
  },
  function(data){
    $(location).attr("href","/login");
  })
}
