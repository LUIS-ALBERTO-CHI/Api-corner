const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes/Team'));                 //TODO #1
app.use(require('./routes/Player'));               //TODO #2
app.use(require('./routes/Season'));               //TODO #3
app.use(require('./routes/CalendarMatches'));      //TODO #4
app.use(require('./routes/DocumentPlayer'));       //TODO #5
app.use(require('./routes/Match'));                //TODO #6
app.use(require('./routes/MatchEvents'));          //TODO #7
app.use(require('./routes/MatchEventType'));       //TODO #8
app.use(require('./routes/MatchLog'));             //TODO #9
app.use(require('./routes/MatchSquad'));           //TODO #10
app.use(require('./routes/Referee'));              //TODO #11
app.use(require('./routes/SeasonTeam'));           //TODO #12
app.use(require('./routes/SeasonSettings'));       //TODO #13
app.use(require('./routes/Stadium'));              //TODO #14
app.use(require('./routes/Tournament'));           //TODO #15
app.use(require('./routes/Auth'));

app.listen(process.env.PORT||3300,() => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;