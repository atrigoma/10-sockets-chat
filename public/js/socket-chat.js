var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('The params NAME and ROOM are mandatory');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};



socket.on('connect', function() {
    console.log('Conectado al servidor');

    // entrarChat
    socket.emit('insideChat', user, function(resp) {
        console.log('Usuarios conectados', resp);
        rendersUsers(resp);
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     nombre: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información: crearMensaje
socket.on('createMessage', function(msg) {
    console.log('Servidor.createMessage:', msg);
    renderMsg(msg, false);
});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat: listaPersona
socket.on('listPeople', function(people) {
    //console.log(personas);
    console.log('Dentro de cocket-chat.listPeople');    
    rendersUsers(people);
});

// Mensajes privados
socket.on('privateMessage', function(mensaje) {

    console.log('Mensaje Privado:', mensaje);

});