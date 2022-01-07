"use strict";

const express = require("express");
const Sequelize = require("sequelize");
const bodyParser = require("body-parser");

const sequelize = new Sequelize("db", "alexandrasindie", "admin", {
  dialect: "mysql",
});

const Author = sequelize.define("author", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 127],
    },
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 127],
    },
  },

  dateOfBirth: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },

  specialisation: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 127],
    },
  },

  university: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 127],
    },
  },
});

const Article = sequelize.define("article", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 255],
    },
  },

  yearOfPublication: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
    },
  },

  subjectField: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 127],
    },
  },
});

Article.belongsTo(Author);

let app = express();

app.use((req, res, next) => {
  next();
});

app.use(bodyParser.json());

app.use(express.static("./client/build"));

app.get("/create", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Done" });
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

const Op = sequelize.Op;

app.get("/authors", async (req, res) => {
  try {
    if (req.query && req.query.filter) {
      let authors = await Author.findAll({
        name: {
          [Op.like]: "%" + req.query.filter + "%",
        },
      });
      res.status(200).json(authors);
    } else {
      let authors = await Author.findAll();
      res.status(200).json(authors);
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/authors/:id", async (req, res) => {
  try {
    let authors = await Author.findByPk(req.params.id);

    if (authors) {
      res.status(200).json(authors);
    } else {
      res.status(404).json({ message: "Done" });
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/authors", async (req, res) => {
  try {
    await Author.create(req.body);
    res.status(201).json({ message: "Done" });
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/authors/:id", async (req, res) => {
  try {
    let author = await Author.findByPk(req.params.id);
    
    if (author) {
      await author.update(req.body, {
        fields: [
          "firstName",
          "lastName",
          "dateOfBirth",
          "specialisation",
          "university",
        ],
      });
      res.status(202).json({ message: "Done" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/authors/:id", async (req, res) => {
  try {
    let author = await Author.findByPk(req.params.id);

    if (author) {
      await author.destroy();
      res.status(202).json({ message: "Done" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/articles", async (req, res) => {
  try {
    if (req.query && req.query.filter) {
      let article = await Article.findAll({
        name: {
          [Op.like]: "%" + req.query.filter + "%",
        },
      });
      res.status(200).json(article);
    } else {
      let article = await Article.findAll();
      res.status(200).json(article);
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    let article = await Article.findByPk(req.params.id);

    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/articles", async (req, res) => {
  try {
    await Article.create(req.body);
    res.status(201).json({ message: "Done" });
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/articles/:id", async (req, res) => {
  try {
    let article = await Article.findByPk(req.params.id);
    
    if (article) {
      await article.update(req.body, {
        fields: ["title", "yearOfPublication", "subjectField"],
      });
      res.status(202).json({ message: "Done" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/articles/:id", async (req, res) => {
  try {
    let article = await Article.findByPk(req.params.id);

    if (article) {
      await article.destroy();
      res.status(202).json({ message: "Done" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (e) {
    console.warn(e.stack);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(8080);
