const { exec, execSync } = require("child_process");
const fs = require("fs");
const nodemailer = require("nodemailer");

const dir = ["NextApp", "Super4", "ChatApp"];
const owner = ["akshay@depronto.com"];
// Script to be injected during Initialization
const fileContent = `
    const npmCheck=require("npm-check")    
    const returns=async ()=> {
        var data =await npmCheck("").then((currentState) => (currentState.get("packages")));
        var outdatedPackageName=[]
        var unusedPackageName=[]
        var count=0
        var countunused=0
        for(var i=0;i<data.length;i++){
            if(data[i].latest!==data[i].installed){
                outdatedPackageName[count]=data[i].moduleName
                count++      
            }
            if(data[i].unused){
                unusedPackageName[countunused]=data[i].moduleName
                countunused++
            }
        }
        const Paths=__dirname.split(":")
        const ProjectName=Paths[Paths.length-1]
        console.log("==============",ProjectName.substring(1,ProjectName.length),"=================")
        console.log("==============OUTDATED PACKAGE=================")
        console.log(outdatedPackageName)
        console.log("==============UNUSED PACKAGE=================")
        console.log(unusedPackageName)
      }
    returns()
`;

for (var i = 0; i < dir.length; i++) {
  fs.writeFile(`${dir[i]}/check.js`, fileContent, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}
for (var i = 0; i < dir.length; i++) {
  exec(`cd ${dir[i]} && node check.js`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
    } else {
      console.log(stdout);
    }
  });
}
setTimeout(() => {
    for (var i = 0; i < dir.length; i++) {
      execSync(`cd ${dir[i]} && rm -rf check.js`);
    }
}, 3000);

// const Transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "mukulgupta257@gmail.com",
//     pass: "uyajcgferahnwzfz",
//   },
// });
// const opt = {
//   from: "Mukul Gupta",
//   to: "mukul.gupta@deprontoinfotech.com",
//   subject: "Test mail",
//   text: "Sample test mail",
// };

// Transporter.sendMail(opt, (err, info) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(info.response);
//   }
// });
