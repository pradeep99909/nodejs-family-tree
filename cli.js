#!/usr/bin/env node
const Family_Tree = require("./index.js");

var Tree = new Family_Tree();

var argv = process.argv.slice(2);
switch (argv[0]) {
  case "add-person":
    console.log("add person");
    break;
  case "add-relationship":
    console.log("add relationship");
    break;
  case "connect":
    console.log("connect");
    break;
  case "count":
    console.log("count");
    break;
  default:
    console.log("Entered wrong command");
}
