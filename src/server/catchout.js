const csvToJson=require("../utilities")
const fs=require("fs");
const matchesPath="../data/matches.csv";
const deliveriespath="../data/deliveries.csv";
function catchout(matchesPath, deliveriesPath) {
    csvToJson(matchesPath).then((matchesData) => {
        csvToJson(deliveriesPath).then((deliveriesData) => {
            let s={};
            for (let i=0; i<matchesData.length;i++){
                if (s[matchesData[i].season]===undefined){
                    s[matchesData[i].season]=[]
                }s[matchesData[i].season].push(matchesData[i].id)
            }
            // console.log(s)
            let player='RG Sharma';
        
        

            let c={}
            for (let key in s){
                for (let i=0;i<deliveriesData.length;i++){
                    if (s[key].includes(deliveriesData[i].match_id)){
                        if (deliveriesData[i].batsman===player && deliveriesData[i].dismissal_kind==='caught'){
                            if (c[key]===undefined){
                                c[key]=0
                            }c[key]+=1

                        }
                    }
                }
            }
            console.log(c)
        })
    })
}
catchout(matchesPath,deliveriespath)