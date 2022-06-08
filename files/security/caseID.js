const {
    customAlphabet
} = require('nanoid')

module.exports = {
    makeid(length) {
        const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 10)
    }
}