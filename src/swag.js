const toTitleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase());
const ranInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;
const ranElement = table => table[0, ranInteger(0, table.length)];

async function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}  

const ownerId = '655245039026569216'

module.exports = {toTitleCase, ranInteger, ranElement, sleep, ownerId}