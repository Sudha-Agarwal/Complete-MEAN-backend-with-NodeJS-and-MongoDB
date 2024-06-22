//Core module
const fs = require('fs');
const http = require('http');


//third party modules
const express = require('express');
const {MongoClient} = require('mongodb');

//local modules
const math = require('./math');

console.log(math.add(2,3));