// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const fs = require("fs");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

// our default array of dreams

var filePath = __dirname + "/dreams.json";
const dreamsFile = require(filePath);

app.use(bodyParser.urlencoded({ extended: false }));

// firebase notifications
const tokenList = [];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.set('Sent', Date.now());
  response.json(dreamsFile);
});

// https://expressjs.com/en/starter/basic-routing.html
app.get("/admin", (request, response) => {
  response.sendFile(__dirname + "/views/admin.html");
});

app.post("/dream", async (request, response) => {
  const { title, content, author } = request.body;
  if (!title || !content) {
    response.send({
      status: 500,
      message: "Title or content missing!",
    });
  }
  try {
    const newId = dreamsFile.lastIdAdded + 1;
    dreamsFile.dreams.push({
      id: newId,
      title,
      content,
      author: author !== "" && author !== undefined ? author : "Anonymous",
      likes: 0,
    });
    dreamsFile.lastIdAdded = newId;
    await fs.writeFile(
      filePath,
      JSON.stringify(dreamsFile),
      "utf8",
      async function (error) {
        if (error) {
          response.send({
            status: 500,
            query: request.query,
            message: "Error while writting file",
            error: error,
          });
        } else {
          const { title, content } = request.body;
          await sendNotification({ title, content });
          response.send({
            status: 200,
            query: request.query,
            message: "Dream created successfully!",
          });
        }
      }
    );
  } catch (e) {
    response.send({
      status: 500,
      message: "Couldn't create dream",
      error: e,
    });
  }
});

app.post("/token", (request, response, next) => {
  const { token } = request.query;
  if (!token) {
    response.send({
      status: 500,
      message: "Token missing!",
    });
  }
  try {
    tokenList.push(token);
    response.send({
      status: 200,
      token: token,
      message: "Token saved successfully!",
    });
  } catch (e) {
    response.send({
      status: 500,
      message: "Couldn't save token",
      error: e,
    });
  }
});

app.get("/notify", async (request, response) => {
  try {
    await sendNotification({ title: "notititle", content: "nocontent" });
    response.send({
      status: 200,
      query: request.query,
      message: "Notification sent successfully!",
    });
  } catch (error) {
    response.send({
      status: 500,
      message: "Couldn't sent notification",
      error: error,
    });
  }
});

app.get("/token_list", (request, response) => {
  response.send({
    status: 200,
    tokenList,
    message: "Notification sent successfully!",
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const sendNotification = async ({ title, content }) => {
  const key =
    "AAAAuNthpXE:APA91bFYkxWooc96pZ5hRd8Z3UdS_45hPuX1gK9wBGnqF4gSZ16hwyTpdh_Cpb76TdSZDW60CZuU1sfqJ4TDgeDQ8qmhheh-9aEMnyiEjTqXb7kmilT7ZVkk2PuM8Zq_ATpYQyX71yPV";
  const notification = {
    title: `New Dream: ${title}`,
    body: `${content}`,
    icon: "https://lace-near-swordtail.glitch.me/images/icons/icon-128x128.png",
    click_action: "https://lace-near-swordtail.glitch.me/",
  };

  try {
    tokenList.forEach(async (token) => {
      await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notification: notification,
          // registration_ids: registration_ids,
          to: token,
        }),
      });
    });
  } catch (error) {
    return error;
  }
};
