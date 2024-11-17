const csvToJson = require("../utilities");
const fs = require("fs");
const matchespath = "../data/matches.csv";
const deliveriespath = "../data/deliveries.csv";

function mostruns(matchespath, deliveriespath) {
    csvToJson(matchespath).then((matchesData) => {
        csvToJson(deliveriespath).then((deliveriesData) => {
            let s = {};
            for (let i = 0; i < matchesData.length; i++) {
                if (s[matchesData[i].season] === undefined) {
                    s[matchesData[i].season] = [];
                }
                s[matchesData[i].season].push(matchesData[i].id);
            }
            // console.log(s)

            let final = {};
            for (let key in s) {
                let mr = {}; 
                for (let i = 0; i < deliveriesData.length; i++) {
                    if (s[key].includes(deliveriesData[i].match_id)) {
                        if (mr[deliveriesData[i].batsman] === undefined) {
                            mr[deliveriesData[i].batsman] = 0;
                        }
                        mr[deliveriesData[i].batsman] += Number(deliveriesData[i].batsman_runs);
                    }
                }
                entries = Object.entries(mr); 
                entries.sort((a, b) => b[1] - a[1]);
                final[key]=entries[0]
            }

            console.log(final); 
        });
    });
}

mostruns(matchespath, deliveriespath);
