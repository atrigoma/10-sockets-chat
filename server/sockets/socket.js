const { io } = require('../server');
const {Users} = require('./classes/users')
const { createMessage} = require('../utilities/utils')


const users = new Users();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    
    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });

    client.on('sendMessage', (data, callback) =>{
        let person = users.getPerson(client.id);
        let msg = createMessage(person.name, data.msg);
        client.broadcast.to(person.room).emit('createMessage', msg);
        
        callback(msg);
    })

    // Escuchar mensaje privado, para enviarlo.
    // El "id" del cliente destino, va a estar en "data.dest"

    client.on('privateMessage', (data) =>{
        let person= users.getPerson(client.id);
        let msg = createMessage(person.name, data.msg);
        client.broadcast.to(data.dest).emit('privateMessage',msg);

    })

    client.on('disconnect', () => {
        console.log('Usuario desconectado');

        let person = users.deletePerson(client.id);

        if (person){
            let msg = createMessage('Administrator', `User ${person.name} is disconnected`);
            client.broadcast.to(person.room).emit('createMessage', msg);
            client.broadcast.to(person.room).emit('listPeople', users.getPeopleByRoom(person.room));
        }

    });

    client.on('insideChat', (data, callback) => {
        console.log('Dentro insideChat');
        console.log(data);

        if (!data.name || !data.room){
            return callback({
                err: true,
                message: 'NAME and ROOM are mandatory'
            })
        }

        users.addPerson(client.id, data.name, data.room);

        // Con esta sentencia, nos unimos a una sala.
        client.join(data.room);

        let msg = createMessage('Administrator', `User ${data.name} inside in the chat`);
        client.broadcast.to(data.room).emit('createMessage', msg);

        let peopleByRoom=users.getPeopleByRoom(data.room);
        client.broadcast.to(data.room).emit('listPeople', peopleByRoom);

        callback(peopleByRoom);
    });


    
});