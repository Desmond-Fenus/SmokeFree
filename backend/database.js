const sqlite3 = require("sqlite3").verbose();
const cardPosts = require("./users.js");

const DBFunc = {
  createTable: function (table) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("users.db");
      const sql = `CREATE TABLE IF NOT EXISTS ${table} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName TEXT,
            text TEXT,
            img TEXT,
            likes INTEGER,
            bgcolor TEXT
          )`;

      db.run(sql, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("Table created successfully.");
        }
      });

      db.close();
    });
  },

  insertCardData: function (cardData, table) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("users.db");
      const sql = `INSERT INTO ${table} (userName, text, img, likes, bgcolor) VALUES (?, ?, ?, ?, ?)`;
      const values = [
        cardData.userName,
        cardData.text,
        cardData.img,
        cardData.likes,
        cardData.bgcolor,
      ];

      db.run(sql, values, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(`Card data inserted successfully with ID: ${this.lastID}`);
        }
      });

      db.close();
    });
  },

  getCardDataById: function (postId) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("users.db");
      const sql = `SELECT * FROM users WHERE id = ?`;
      const values = [postId];

      db.get(sql, values, function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });

      db.close();
    });
  },

  getAllRowsCount: function (table) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("users.db");
      const sql = `SELECT COUNT(*) AS rowCount FROM ${table}`;

      db.get(sql, function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row.rowCount);
        }
      });

      db.close();
    });
  },

  getDataByIds: function (ids) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("users.db");
      const placeholders = ids.map(() => "?").join(",");
      const sql = `SELECT * FROM users WHERE id IN (${placeholders})`;

      db.all(sql, ids, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
      db.close();
    });
  },
  addLikeById: function (id) {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database("users.db");
      const sql = `UPDATE users SET likes = likes + 1 WHERE id = ?`;

      db.run(sql, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(r);
        }
      });

      db.close();
    });
  },
};

/* for (post of cardPosts) {
  console.log(post);
  DBFunc.insertCardData(post, "users").then((r) => {
    console.log(r);
  });
} */

module.exports = DBFunc;
