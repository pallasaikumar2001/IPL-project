const csv = require('csvtojson')

function csvToJson(path) {
  return csv().fromFile(path).then((jsonObj)=>{
    return jsonObj
})  
}
module.exports = csvToJson
