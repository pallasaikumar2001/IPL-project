const csvToJson = require("../utilities"); 
const fs = require("fs");

const matchesPath = "../data/matches.csv";

function matchesWinsPerYear(matchesPath) {
    csvToJson(matchesPath).then((matchesdata) => {
        const wins = matchesdata.reduce((acc, match) => {
            const season = match.season;
            const winner = match.winner;

            if (!acc[season]) {
                acc[season] = {};
            }

            if (!acc[season][winner]) {
                acc[season][winner] = 0;
            }

            acc[season][winner] += 1;
            return acc;
            }, {});

        console.log(wins);

    fs.writeFile("../public/output/2-matchesWinsPerYear.json", JSON.stringify(wins, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON to file:', err);
      } else {
        console.log("Data updated successfully");
      }
    });
  }).catch((error) => {
    console.error('Error processing data:', error);
  });
}

matchesWinsPerYear(matchesPath);
