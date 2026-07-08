#!/usr/bin/env node
import { runMenu } from "./menu";
import { tree } from "./tree";

console.log("Hello from Shibbir's CLI!");

runMenu(tree, true);
