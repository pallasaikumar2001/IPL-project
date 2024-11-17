const csvToJson=require("../utilities")
const fs=require("fs");
const matchesPath="../data/matches.csv";
function mom(path){
    csvToJson(path).then((matchesdata)=>{
        let d={};
        for (let i=0;i<matchesdata.length;i++){
            if (!d[matchesdata[i].player_of_match]){
                d[matchesdata[i].player_of_match]=0
            }d[matchesdata[i].player_of_match]+=1
        }
        // console.log(d)
        const entries = Object.entries(d);
        // console.log(entries)
        entries.sort((a, b) => b[1]-a[1]); 
        let a=entries.slice(0,10);
        const sortedObj = Object.fromEntries(a);
        console.log(sortedObj);
    })
}
mom(matchesPath)