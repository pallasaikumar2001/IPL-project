const csvToJson = require("../utilities");
const fs = require("fs");

const matchesPath = "../data/matches.csv";

function highestmom(matchesPath) {
    csvToJson(matchesPath).then((matchesData) => {
        let s = matchesData.reduce((s, match) => {
            const season = match.season;
            const player = match.player_of_match;

            if (!s[season]) {
                s[season] = {};
            }
            if (!s[season].player) {
                s[season].player = 0;
            }
            s[season].player += 1;
            return s;
        }, {});

        let top = Object.keys(s).reduce((top, season) => {
            let c = 0;
            let topPlayer = "";

            for (const player in s[season]) {
                if (s[season][player] > c) {
                    c = s[season][player];
                    topPlayer = player;
                }
            }

            top[season] = [topPlayer, c];
            return top;
        }, {});

        console.log(top);

        fs.writeFile(
            "../public/output/6-highestMOMSeason.json",
            JSON.stringify(top, null, 2),
            (err) => {
                if (err) {
                    console.error("Error writing JSON to file:", err);
                } else {
                    console.log("Data updated successfully");
                }
            }
        );
    });
}

highestmom(matchesPath);
