

class Users {

    constructor (){
        // Estas van a ser las personas que van a estar conectadas al Chat
        this.people = [];
        
    }

    // Annadir una nueva persona al chat (no a una sala)
    addPerson (id, name, room) {

        let person = {
            id,
            name,
            room
        }
        
        this.people.push(person);

        // Devolvemos el conjunto de personas del chat
        return this.people;
    }

    getPerson(id){
        // La funcion "filter" devuelve un array, por eso se tiene que devolver la posición 0
        let person = this.people.filter(pers => {
            return pers.id === id;
        })[0];

        // En el caso de que no encuentra a una persona por el ID, "person" devolvera "undefined"
        return person;
    }

    getPeople(){
        return this.people;
    }

    getPeopleByRoom (room){
        let people = this.people.filter(pers => {
            return pers.room === room;
        });

        return people;
    }

    // Borra una persona del chat
    deletePerson (id){

        // Primero guardamos la información de la persona que queremos borrar
        let deletedPerson = this.getPerson(id);

        // Se va a devolver todas las personas que tengan un ID distinto al que le estamos pasando
        // Filter devuelve un array
        this.people= this.people.filter( pers => {
            return (pers.id != id);
        })

        return deletedPerson;
    }
}

module.exports = {
    Users
}