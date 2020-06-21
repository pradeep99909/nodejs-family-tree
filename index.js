const fs = require("fs");
const data = require("./data.json");
const readline = require("readline");
const { fstat } = require("fs");
class Family_Tree {
  constructor() {
    this.tree = {};
  }

  add_person(name_of_person) {
    const fs = require("fs");

    fs.readFile("data.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
      var data = JSON.parse(data);
      var length = Object.keys(data).length;
      data[length + 1] = {
        name: name_of_person,
      };
      fs.writeFileSync("data.json", JSON.stringify(data));
    });
  }

  add_relationship(relation) {
    const fs = require("fs");

    fs.readFile("data.json", (err, data) => {
      if (err) {
        return console.error(err);
      }
      var data = JSON.parse(data);
      var length = Object.keys(data).length;
      var name = Object.keys(data[length]);

      data[length] = {
        name: data[length][name],
        relationship: relation,
      };
      console.log(data);
      fs.writeFileSync("data.json", JSON.stringify(data));
    });
  }
}

module.exports = Family_Tree;
