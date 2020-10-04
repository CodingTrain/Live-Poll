const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);
app.use(express.static("public"));

const Datastore = require("nedb-promises");
const database = Datastore.create("database.db");

app.get("/vote/:pollId/:choice", async (request, response) => {
    const { pollId: _id, choice } = request.params;
    await database.update({ _id }, { $inc: { [choice]: 1 } });
    response.send(poll);
});

app.get("/votes/:pollId", async (request, response) => {
    const { pollId: _id } = request.params;
    const poll = await database.findOne({ _id });
    response.send(poll);
});
