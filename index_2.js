const moment = require('moment');
require('moment-precise-range-plugin');

let input = process.argv[2];
let inputHour = +input.substr(0, 2);
let inputDay = +input.substr(3, 2);
let inputMonth = +input.substr(6, 2);
let inputYear = +input.substr(9, 4);
let inputDate = new Date(inputYear, inputMonth - 1, inputDay, inputHour);

let countdown = setTimeout(() => {
    let leftTime = '';
    let message = '';
    let error = '';
    let d = inputDay < new Date().getDay();
    let m = inputMonth < new Date().getMonth();
    let y = inputYear < new Date().getFullYear();
    if (d || m || y) {
        leftTime = moment().preciseDiff(inputDate);
        message = 'Time is up by'
        error = 'Enter future date';
    }
    else {
        leftTime = moment().preciseDiff(inputDate);
        message = 'Left to deadline';
    }
    console.log(`
        ${(`Today : ${new Date().toLocaleString()}`)}
        ${(`Deadline : ${inputDate.toLocaleString()}`)}
        ${(`${message}: ${leftTime}`)}
        ${(`${error}`)}
        `);
    }
)
