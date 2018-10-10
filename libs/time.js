const moment = require('moment')
const momentTimezone = require('moment-timezone')
const timezone = "Asia/Calcutta"

let now = () => {
    return moment.utc().format()
}

let getLocalTime = () => {
    return moment.tz(timezone).format()
}

let convertToLocalTime = (time) => {
    return moment.tz(time, timezone).format('LLLL')
}

module.exports = {
    now,
    getLocalTime,
    convertToLocalTime
}