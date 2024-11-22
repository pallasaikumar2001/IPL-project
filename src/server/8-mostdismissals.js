const csvToJson = require("../convert");
const deliveriesPath = "../data/deliveries.csv";
const fs = require("fs");

function mostdismissals(deliveriesPath) {
    csvToJson(deliveriesPath).then((deliveriesData) => {
        let pair = deliveriesData.reduce((pair, delivery) => {
            const bowler = delivery.bowler;
            const batsman = delivery.batsman;
            const dismissalKind = delivery.dismissal_kind;

            if (dismissalKind === "caught" || dismissalKind === "lbw" || dismissalKind === "bowled") {
                const key = `${bowler}-${batsman}`;

                if (!pair[key]) {
                    pair[key] = 0;
                }

                pair[key] += 1;
            }

            return pair;
        }, {});

        const entries = Object.entries(pair);
        entries.sort((a, b) => b[1] - a[1]);
        const topPair = entries[0];
        const final = {};
        final[topPair[0]] = topPair[1];

        console.log(final);
        fs.writeFile("../public/output/8-mostdismissals.json", JSON.stringify(final, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON to file:', err);
            } else {
                console.log("Data updated successfully");
            }
        });
    });
}

mostdismissals(deliveriesPath);
