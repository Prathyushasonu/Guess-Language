require('dotenv').config();
const dbConnection = require('./dbConnection');
const fs = require('fs');
const path = require('path');
const Language = require('./models/Language');
const { connect } = require('http2');

(async()=>{
    const connection = await dbConnection();
    const languages = await Language.find({});
    if(languages.length !==0){
        console.log("languages already exists, stopping the script here!!")
        connection.disconnect();
        return;
    }
    const logosFromGithubJson = Json.parse(
        fs.readFileSync(
            path.resolve(__dirname,'Technology.json'), 'utf-8'
        )
    )

    const logostToAdd = Object.keys(logosFromGithubJson).map(key => {  
        const tech =   `https://github.com/bablubambal/All_logo_and_pictures/tree/main/${logosFromGithubJson[key]}`
        
    });
    const languagesFromGithubJson = JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname,'./data/languages-from-github.json'), 'utf-8'
        )
    )
    const languagesToAdd = Object.keys(languagesFromGithubJson).map(key =>{
        const name = key;
        const iconKey = languagesFromGithubJson[key];
        const iconUrl = `https://github.com/abrahamcalf/programming-languages-logos/raw/master/src/${iconKey}/${iconKey}.svg`;
        return { name, iconUrl };
    }) 
    try {
        await Language.insertMany(languagesToAdd);
        console.log("Languages added to database");
      } catch (e) {
        console.log("Error while instering languages", e);
      }

      connection.disconnect();
})();