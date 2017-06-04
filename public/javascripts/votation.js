var nomeUt;
$(document).ready(function () {
  $.get("/getNome",function(data){
    if(data==""){
      alert("Effettua nuovamente il login");
      $(location).attr("href","/login");
    }
    $("#utente").text(data);
    //alert(data);
    nomeUt=data;
    //alert(nomeUt);
  });
  // alert(nomeUt);
  $("#logout").click(logout);
  $("#vota").click(vota);
  $("#risultati").click(aggiorna);
});

function vota(){
  //var voto = $("input:checked").val();
  //alert($("input:checked").val());
  $.post("/sendVoto",{
    voto: $("input:checked").val(),
    nickname: nomeUt//$("#utente").val()//questo è sbagliato; passa al server una stringa vuota
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
    $("#rosso").text((data.votoR*100)/data.votiTot+"%");
    $("#blu").text((data.votoB*100)/data.votiTot+"%");
    $("#verde").text((data.votoG*100)/data.votiTot+"%");
    $("#croix").text((data.votoAstenuto*100)/data.votiTot+"%");
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
