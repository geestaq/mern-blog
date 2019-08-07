module.exports = {
  PORT: process.env.PORT,
  DB: `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0-icaht.mongodb.net/mernapp?retryWrites=true&w=majority`,
};
