const fs = require("fs");
const data = require("./data.json");
const readline = require("readline");
const { fstat } = require("fs");
class Family_Tree {
  constructor() {
    this.tree = {};
    this.data1 = [];
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
      //reading the file
      if (err) {
        return console.error(err);
      }
      var data = JSON.parse(data);
      var length = Object.keys(data).length;
      var name = Object.keys(data[length]);

      data[length] = {
        name: data[length][name],
        [relation]: [],
      }; //adding the object to family tree
      fs.writeFileSync("data.json", JSON.stringify(data));
    });
  }

  get_key_by_name(name) {
    // geting the of the person by name
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

  read(data, relation, key) {
    data[key][relation.slice(0, -1)].map((d) => {
      if (typeof data[d][relation.slice(0, -1)] !== "undefined") {
        this.data1 = [...this.data1, ...data[d][relation.slice(0, -1)]];
        this.read(data, relation, d);
      }
    });

    return this.data1.length;
  }

  get_all(name, relation, callback) {
    fs.readFile("data.json", async (err, data) => {
      if (err) {
        console.error(err);
      }
      let json_data = JSON.parse(data);
      let key = await this.get_key_by_name(name);
      callback(this.read(json_data, relation, key));
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
      }; //connecting person in json data using key values
      fs.writeFileSync("data.json", JSON.stringify(json_data)); // writing the data into the json file
    });
  }
}

module.exports = Family_Tree;
