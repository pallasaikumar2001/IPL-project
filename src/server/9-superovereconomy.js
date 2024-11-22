const csvToJson = require("../convert");
const fs = require("fs");

const deliveriesPath = "../data/deliveries.csv";

function supereconomy(deliveriesPath) {
    csvToJson(deliveriesPath).then((deliveriesData) => {
        const players = deliveriesData.reduce((acc, delivery) => {
            if (delivery.is_super_over !== '0') {
                if (!acc[delivery.bowler]) {
                    acc[delivery.bowler] = { runs: 0, balls: 0 };
                }
                acc[delivery.bowler].runs += parseInt(delivery.total_runs, 10);
                acc[delivery.bowler].balls += 1;
            }
            return acc;
        }, {});

        const economies = Object.entries(players).map(([bowler, data]) => {
            const overs = data.balls / 6;
            const economyRate = data.runs / overs;
            return { bowler, economyRate };
        });

        economies.sort((a, b) => a.economyRate - b.economyRate);
        const bestBowler = economies[0];
        console.log(economies)

        console.log(bestBowler);

        fs.writeFile("../public/output/9-superovereconomy.json", JSON.stringify(bestBowler, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON to file:', err);
            } else {
                console.log("Data updated successfully");
            }
        });
    }).catch((err) => {
        console.error('Error reading deliveries data:', err);
    });
}

supereconomy(deliveriesPath);
