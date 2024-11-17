const csvToJson=require("../utilities")
const fs=require("fs");
const matchespath="../data/matches.csv"
const deliveriespath="../data/deliveries.csv"
function mostrunsbyteam(matchespath,deliveriespath){
    csvToJson(matchespath).then((matchesdata)=>{
        csvToJson(deliveriespath).then((deliveriesdata)=>{
            s={}
            for(let i=0;i<matchesdata.length;i++){
                if (s[matchesdata[i].season]===undefined){
                    s[matchesdata[i].season]=[]
                }s[matchesdata[i].season].push(matchesdata[i].id)
            }
            console.log(s)
        })
    })
}
mostrunsbyteam(matchespath,deliveriespath)