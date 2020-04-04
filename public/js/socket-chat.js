var socket = io();


var params = new URLSearchParams(window.location.search);

console.log('dentro de socket-chat.js');

if (!params.has('name') || !params.has('room') ){
    window.location='index.html';
    throw new Error('The params NAME and ROOM are mandatory');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('insideChat', user, function(resp) {
        console.log('users connected ', resp);
    });


});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.on('createMessage', function(data) {

    console.log(data);

});

socket.on('listPeople', function(data) {

    console.log(data);

});

// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    msg: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


socket.on('privateMessage', function(msg) {
    console.log('Private message ', msg);
})