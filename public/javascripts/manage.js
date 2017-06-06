$(document).ready(function () {
  $.get("/manage",function(data){
    var content = "<tbody>";
    for(i=1; i<data.utenti.length; i++){
        content += '<tr><td>' + data.utenti[i].nickname +'</td>'+'<td>'+data.utenti[i].password+'</td>'+'<td>'+data.utenti[i].voto+'</td></tr>';
    }
    content += "</tbody>"
    $('#tabUtenti').append(content);
  })
  $("#rimuovi").click(rimuovi);
});


function rimuovi(){
  $.post("rimuovi",{
    nick: $("#rUser").val()
  },function(data){
    if(data.rim){
      $(location).attr("href","/adminControl"+data.aId);
    }
    if(data.rim==false){
      Materialize.toast('Utente non presente', 4000,'rounded');
    }
  })
}
