// 1 Number of matches played per year for all the years in IPL.

const csvToJson = require("../convert")
const fs = require("fs")

const matchesPath = "../data/matches.csv";
function matchesPerYear(path) {
    
    csvToJson(path).then((matchesdata) => {
      
        const matches = matchesdata.reduce((acc, element) => {
            if (!acc[element.season]) {
                acc[element.season] = 0;
            }
            acc[element.season] += 1;
            return acc;
        }, {});
        
        console.log(matches)
        fs.writeFile("../public/output/1-matchesPerYear.json",JSON.stringify(matches),(err) => {
            if (err) {
                console.log(err);
            } 
            else {
                console.log("Data Updated successfully");
            }
          }
        );

    });
}
  
matchesPerYear(matchesPath);
  
  