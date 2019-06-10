var config = {}

config.host = process.env.HOST || "https://masterstroke.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "guGtYIInL4BWnmp3q9H4RF6NOlVXHqDLydJGZjueZzceqSfz3pljNZKOL2F1aSLYHCi8gGdnGeGrovqVBNHnvA==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;