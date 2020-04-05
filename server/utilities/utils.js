
const createMessage = (name, msg) => {
    return {
        name,
        msg,
        dateMsg: new Date().getTime
    }
}

module.exports = {
    createMessage
}