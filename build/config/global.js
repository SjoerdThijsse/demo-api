"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var global = {
  master: true,
  port: 5001,
  workers: 2,
  tempDir: process.cwd() + "/tmp",
  dbHosts: ["localhost"],
  Promise: Promise
};

exports.global = global;