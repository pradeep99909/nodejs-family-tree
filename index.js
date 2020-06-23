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
        [relation]: [],
      };
      console.log(data);
      fs.writeFileSync("data.json", JSON.stringify(data));
    });
  }

  get_key_by_name(name) {
    return new Promise((resolve, reject) => {
      fs.readFile("data.json", (err, data) => {
        if (err) {
          reject(err);
        }
        let json_data = JSON.parse(data);

        Object.keys(json_data).map((key) => {
          if (json_data[key]["name"] === name) {
            resolve(key);
          }
        });
      });
    });
  }

  get_count(name, relation, callback) {
    fs.readFile("data.json", async (err, data) => {
      if (err) {
        console.error(err);
      }
      let json_data = JSON.parse(data);
      let key = await this.get_key_by_name(name);
      callback(json_data[key][relation.slice(0, -1)].length);
    });
  }

  connect(person1, person2, relation) {
    fs.readFile("data.json", async (err, data) => {
      if (err) {
        console.error(err);
      }
      let json_data = JSON.parse(data);
      var key1 = await this.get_key_by_name(person1);
      var key2 = await this.get_key_by_name(person2);
      json_data[key2] = {
        ...json_data[key2],
        [relation]: [key1],
      };
      fs.writeFileSync("data.json", JSON.stringify(json_data));
    });
  }
}

module.exports = Family_Tree;
