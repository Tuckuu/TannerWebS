const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

app.use("/js", express.static("./js"));
app.use("/css", express.static("./css"));
app.use("/img", express.static("./images"));


app.get("/", function (req, res) {
    let doc = fs.readFileSync("./index.html", "utf8");
    res.send(doc);
});

app.get("/assignment5DBTable", function (req, res) {

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment5"
    });
    let myResults = null;
    connection.connect();
    
    let usr = "Tanner";
    connection.execute(
        
        "SELECT a01401176_user.user_name, a01401176_user.email_address, a01401176_user_timeline.date_of_post, a01401176_user_timeline.text, a01401176_user_timeline.time_of_post, a01401176_user_timeline.number_of_views FROM a01401176_user INNER JOIN a01401176_user_timeline ON a01401176_user.ID = a01401176_user_timeline.ID",
        [usr],
        function (error, results, fields) {
            console.log("results:", results);
            if (error) {
                console.log(error);
            }
            let table = "<table><tr><th>User Name</th><th>Email Address</th><th>Date of post</th><th>Description</th><th>Time of Post</th><th>Number of Views</th>";
            for (let i = 0; i < results.length; i++) {
                table += "<tr>"
                for (const property in results[i]) {
                    table += "<td>" + results[i][property] + "</td>";
                }
                table += "</tr>";
            }
            
            table += "</table>";
            res.send(table);
            connection.end();
        }
    );

});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Listening on port " + port + "!");
});