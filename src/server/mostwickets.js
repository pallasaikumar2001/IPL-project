const csvToJson = require("../utilities");
const fs = require("fs");
const matchespath = "../data/matches.csv";
const deliveriespath = "../data/deliveries.csv";

function mostwickets(matchespath, deliveriespath) {
  csvToJson(matchespath).then((matchesData) => {
    csvToJson(deliveriespath).then((deliveriesData) => {
      let s = {};

      for (let i = 0; i < matchesData.length; i++) {
        if (s[matchesData[i].season] === undefined) {
          s[matchesData[i].season] = [];
        }
        s[matchesData[i].season].push(matchesData[i].id);
      }
      //console.log(s)
      let final = {};

      for (let key in s) {
        let mw = {};
        for (let i = 0; i < deliveriesData.length; i++) {
          if (s[key].includes(deliveriesData[i].match_id)) {
            if (
              deliveriesData[i].dismissal_kind === "lbw" ||
              deliveriesData[i].dismissal_kind === "bowled" ||
              deliveriesData[i].dismissal_kind === "caught"
            ) {
              if (mw[deliveriesData[i].bowler] === undefined) {
                mw[deliveriesData[i].bowler] = 0;
              }
              mw[deliveriesData[i].bowler] += 1;
            }
          }
        }
        console.log(mw)

        
        let entries = Object.entries(mw);
        entries.sort((a, b) => b[1] - a[1]);
        final[key] = entries[0]; 
      }

      console.log(final);
    });
  });
}

mostwickets(matchespath, deliveriespath);
