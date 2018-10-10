
let generate = (error, message, status, data) {
    return {
        error,
        message,
        status,
        data
    }
}

module.exports = {
    generate
}