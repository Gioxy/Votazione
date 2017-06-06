//var saponetta=true;
$(document).ready(function () {

    $(".modal").modal({
      dismissible:false
    });
    $("#c").click(prova);
    $("#btnRegistra").click(registra);
    $("#btnAccedi").click(accedi);
    $("#btnAdmin").click(adminLog);
});

function adminLog(){
  $.post("/adminLog",{
    nickname: $("#Anick").val(),
    password: $("#Apasswd").val()
  },function(data){
    if(data==false)
      Materialize.toast('Nome admin o password errato', 4000,'rounded');
      else{
        var id=Math.random().toString();
        $.post("/admin", {
          ok: true,
          idUser: id,
          nickname: $("#Anick").val()
        },function(data){
          if(data){
            $(location).attr("href","/adminControl"+id);
          }
        })
      }
  })
}

function accedi(){
  $.post("/getLogin",{
    nickname: $("#Lnick").val(),
    password: $("#Lpasswd").val()
  },function(data){
    if(data===false)
    Materialize.toast('Nome utente o password errato', 4000,'rounded');
      else {
        var id=Math.random().toString();
        $.post("/votazione", {
          ok: true,
          idUser: id,
          nickname: $("#Lnick").val()
        },function(data){
          if(data){
            $(location).attr("href","/votazione"+id);
          }
        })
      }
  })
}

function registra(){
  if($("#Rnick").val()==="" || $("#Rpasswd").val()==="")
    Materialize.toast('Nickname e password devono contenere almeno un carattere', 4000,'rounded');
    //alert("Il nickname e la password devono contenere almeno un carattere")
    else{
  if($("#Rpasswd").val().charAt(0)===" " || $("#Rnick").val().charAt(0)===" ")
    Materialize.toast('il primo carattere non può essere uno spazio', 4000,'rounded')
  else{
    $.post("/getRegistration",{
      nickname: $("#Rnick").val(),
      password: $("#Rpasswd").val()
    },
    function(data){
      if(data===false)
        Materialize.toast('Nickname già in uso. Inserisci un altro nickname', 4000,'rounded')
        else {
          setTimeout(function(){
              Materialize.toast('Utente '+data+' registrato con successo', 4000,'rounded')
          }, 500);
        }
    });
  }
}
}


function prova(){
    setTimeout(function () {
      $.get("/getLogged",function(data){
        $("#feccia").text(data);
      })
      prova();
    }, 1000);
};
