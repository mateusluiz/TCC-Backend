module.exports = function parseStringAsArray(arrayAsString){
    // split(): Percorre a string e recorta toda vez que existir uma virgula
    // map(): Percorre um array
    // trim(): Retira espaços antes e depois de uma string
    return arrayAsString.split(',').map(tech => tech.trim());
}