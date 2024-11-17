const csvToJson = require("../utilities");
const fs = require("fs");

const deliveriesPath = "../data/deliveries.csv";
const matchesPath = "../data/matches.csv";

function strikerate(matchesPath, deliveriesPath) {
    csvToJson(matchesPath).then((matchesData) => {
        csvToJson(deliveriesPath).then((deliveriesData) => {
            let player = 'RG Sharma';

            let idsBySeason = matchesData.reduce((idsBySeason, match) => {
                const season = match.season;
                const matchId = match.id;

                if (!idsBySeason[season]) {
                    idsBySeason[season] = [];
                }
                idsBySeason[season].push(matchId);
                return idsBySeason;
            }, {});

            let strikeRates = Object.keys(idsBySeason).reduce((strikeRates, key) => {
                let totalRuns = 0;
                let totalBalls = 0;

                deliveriesData.forEach((delivery) => {
                    if (idsBySeason[key].includes(delivery.match_id) && delivery.batsman === player) {
                        totalRuns += Number(delivery.batsman_runs);
                        totalBalls += 1;
                    }
                });

                let strikeRate = (totalRuns / totalBalls) * 100;
                strikeRates[key] = strikeRate.toFixed(2);
                return strikeRates;
            }, {});

            console.log('strike rate of Rohit Sharma for each season is');
            console.log(strikeRates);

            fs.writeFile("../public/output/7-strikeRates.json", JSON.stringify(strikeRates, null, 2), (err) => {
                if (err) {
                    console.error('Error writing JSON to file:', err);
                } else {
                    console.log("Data updated successfully");
                }
            });
        });
    });
}

strikerate(matchesPath, deliveriesPath);
