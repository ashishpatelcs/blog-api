
let trim = (str) => {
    let value = String(str)
    return value.replace(/^\s+|\s+$/gm, '')
}

let isEmpty = (v) => {
    if (v === null || v === undefined || trim(v) === '' || v.length === 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    trim,
    isEmpty
}