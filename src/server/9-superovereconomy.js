// 9 Find the bowler with the best economy in super overs

const csvToJson = require("../utilities"); 
const fs = require("fs");

const deliveriesPath = "../data/deliveries.csv";
function supereconomy(deliveriesPath){
    csvToJson(deliveriesPath).then((deliveriesData)=>{
        const players = deliveriesData.reduce((acc, delivery) => {
            if (delivery.is_super_over !== '0') {
                if (!acc[delivery.bowler]) {
                    acc[delivery.bowler] = 0;
                }
                acc[delivery.bowler] += 1;
            }
            return acc;
        }, {});
        
        // console.log(players)
        entries = Object.entries(players); 
        entries.sort((a, b) => a[1] - b[1]);
        const bowlername = entries[0]; 
        const final={}
        final[bowlername[0]]=bowlername[1]

        console.log(final);
        fs.writeFile("../public/output/9-superovereconomy.json", JSON.stringify(final, null, 2), (err) => {
            if (err) {
                console.error('Error writing JSON to file:', err);
            } 
            else {
                console.log("Data updated successfully");
            }
        });
    })
}
supereconomy(deliveriesPath)