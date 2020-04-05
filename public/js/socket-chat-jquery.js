var socket = io();

// Functions to renders users

var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var room = params.get('room');

// Use to JQuery

var divUsers = $('#divUsers');
var divChatbox = $('#divChatbox');
var formSend = $('#formSend');
var txtMsg = $('#txtMsg');



function rendersUsers (people) {

    console.log('Dentro de socket-chat-jquery.rendersUsers');
    console.log(people);
    var html = '';

    html +='<li>';
    html +='   <a href="javascript:void(0)" class="active"> Chat de <span> ' + room + '</span></a>';
    html +='</li>';

    for (var i=0; i < people.length; i++){
        html +='<li>';
        html +='    <a data-id="'+ people[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ' + people[i].name + '<small class="text-success">online</small></span></a>';
        html +='</li>';
    }

    divUsers.html(html);
    
}

function renderMsg (msg, owner) {
    var html ='';
    var date = new Date(msg.dateMsg);
    var time = date.getHours() + ":" + date.getMinutes();
    var admin = false;
    var adminClass ='info';

    if (msg.name === "Administrator"){
        admin = true;
        var adminClass ='danger';
    }

    if (!owner){
        html +='<li class="animated fadeIn">';
        if (!admin) {
            html +='<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html +='<div class="chat-content">';
        html +='    <h5>' + msg.name + '</h5>';
        html +='    <div class="box bg-light-'+ adminClass +'">' + msg.msg +'</div>';
        html +='</div>';
        html +='<div class="chat-time">'+ time +'</div>';
        html +='</li>';
    }
    else{
        html +='<li class="reverse">';
        html +='    <div class="chat-content">';
        html +='        <h5>' + msg.name + '</h5>';
        html +='        <div class="box bg-light-inverse">' + msg.msg +'</div>';
        html +='    </div>';
        html +='    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html +='    <div class="chat-time">'+ time +'</div>';
        html +='</li>';
    }

    divChatbox.append(html);
    scrollBottom();
}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Listener

// Con la "a" se indica para la gestión de los eventos de los objetos de tipo "a" (anchor)
divUsers.on('click','a', function(){

    // Con la sentencia $(this).data('id') estamos referenciando al objeto que se le ha hecho el click (this)
    // y el atributo que hemos marcado como "data-id". Si le hubiesemos puesto "data-otracosa", tendríamos que 
    // poner $(this).data('otracosa')
    var id = $(this).data('id');
    
    // Para controlar que solo se haga algo si existe el ID
    if (id){
       console.log(id);
    }
})


formSend.on('submit', function(evt){
    evt.preventDefault();

    if (txtMsg.val().trim().length === 0) {
        return;
    }
  
    let msg = txtMsg.val();
    
    // Enviar información
     socket.emit('sendMessage', {
         name,
         msg
     }, function(msg) {
        txtMsg.val("").focus();
        renderMsg(msg, true);

     });

})