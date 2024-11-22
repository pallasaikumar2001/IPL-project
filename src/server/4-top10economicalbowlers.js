const csvToJson = require("../convert");
const fs = require("fs");

const deliveriesPath = "../data/deliveries.csv";
const matchesPath = "../data/matches.csv";

function economical(matchesPath, deliveriesPath) {
    csvToJson(matchesPath).then((matchesData) => {
        const matchIds2015 = matchesData.reduce((matchIds, match) => {
            if (match.season === '2015') {
                matchIds.push(match.id);
            }
            return matchIds;
        }, []);

        csvToJson(deliveriesPath).then((deliveriesData) => {
            const { dr, db } = deliveriesData.reduce(
                ({ dr, db }, delivery) => {
                    if (matchIds2015.includes(delivery.match_id)) {
                        if (!db[delivery.bowler]) {
                            db[delivery.bowler] = 0;
                            dr[delivery.bowler] = 0;
                        }
                        if (delivery.wide_runs === '0' && delivery.noball_runs === '0') {
                            db[delivery.bowler] += 1;
                        }
                        dr[delivery.bowler] += Number(delivery.total_runs);
                    }
                    return { dr, db };
                },
                { dr: {}, db: {} }
            );

            const topEconomicalBowlers = Object.entries(db)
                .reduce((top, [bowler, balls]) => {
                    const overs = balls / 6;
                    const economyRate = dr[bowler] / overs;
                    top.push({ bowler, economyRate });
                    return top;
                }, [])
                .sort((a, b) => a.economyRate - b.economyRate)
                .slice(0, 10)
                .reduce((result, item) => {
                    result[item.bowler] = item.economyRate.toFixed(2);
                    return result;
                }, {});

            console.log(topEconomicalBowlers);
            fs.writeFile("../public/output/4-top10economicalbowlers.json",JSON.stringify(topEconomicalBowlers, null, 2),(err) => {
                    if (err) {
                        console.error("Error writing JSON to file:", err);
                    } else {
                        console.log("Data updated successfully");
                    }
                }
            );
        });
    });
}

economical(matchesPath, deliveriesPath);
