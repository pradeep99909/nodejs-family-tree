#!/usr/bin/env node
const Family_Tree = require("./index.js");

var Tree = new Family_Tree();

var argv = process.argv.slice(2);
switch (argv[0]) {
  case "add-person":
    Tree.add_person(argv[1]);
    break;
  case "add-relationship":
    Tree.add_relationship(argv[1]);
    break;
  case "connect":
    if (argv.length !== 6) {
      console.log("Wrong command");
      console.log(
        "Is may be like family-tree connect <name 1> as <relationship> of <name 2>"
      );
    } else {
      Tree.connect(argv[1], argv[5], argv[3]);
    }
    break;
  default:
    console.log("Entered wrong command");
}
