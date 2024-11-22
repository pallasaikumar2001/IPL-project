const csvToJson = require("../convert"); 
const fs = require("fs");

const matchesPath = "../data/matches.csv";

function tossAndMatchWins(matchesPath) {
    csvToJson(matchesPath).then((matchesData) => {
        const tossMatchWins = matchesData.reduce((tossMatchWins, match) => {
            if (match.toss_winner === match.winner) {
                if (!tossMatchWins[match.winner]) {
                    tossMatchWins[match.winner] = 0;
                }
                tossMatchWins[match.winner]++;
            }
            return tossMatchWins;
        }, {});

        console.log(tossMatchWins);
        fs.writeFile("../public/output/5-tossAndMatchWins.json", JSON.stringify(tossMatchWins, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON to file:', err);
            } else {
                console.log("Data updated successfully");
            }
        });
    });
}

tossAndMatchWins(matchesPath);
