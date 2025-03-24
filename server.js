const express = require("express");
const soap = require("soap");
const mongoose = require("mongoose");
const fs = require("fs");
const soapEmployeeService = require("./services/soapEmployeeService");

const app = express();
const PORT = 5000;


mongoose.connect("mongodb://localhost:27017/employees").then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


const xml = fs.readFileSync(__dirname + "/public/employeeService.wsdl", "utf8");


const server = app.listen(PORT, () => console.log(`SOAP Service running on port ${PORT}`));
soap.listen(server, "/employeeService", soapEmployeeService, xml);
