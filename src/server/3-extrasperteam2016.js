const csvToJson = require("../convert"); 
const fs = require("fs");

const deliveriesPath = "../data/deliveries.csv";
const matchesPath = "../data/matches.csv";

function extrasPerYear(matchesPath, deliveriesPath) {
    csvToJson(matchesPath).then((matchesData) => {
        const matchIds2016 = matchesData.reduce((acc, match) => {
            if (match.season === '2016') {
                acc.push(match.id); 
            }
            return acc;
        }, []);

        csvToJson(deliveriesPath).then((deliveriesData) => {
            const extras = deliveriesData.reduce((acc, delivery) => {
                if (matchIds2016.includes(delivery.match_id)) {
                    if (!acc[delivery.bowling_team]) {
                        acc[delivery.bowling_team] = 0; 
                    }
                    acc[delivery.bowling_team] += Number(delivery.extra_runs); 
                }
                return acc;
            }, {});

            console.log(extras); 
            fs.writeFile("../public/output/3-extrasPerYear.json", JSON.stringify(extras, null, 2), (err) => {
                if (err) {
                    console.error("Error writing JSON to file:", err);
                } else {
                    console.log("Data updated successfully");
                }
            });
        });
    });
}

extrasPerYear(matchesPath, deliveriesPath);
