var mongoose = require('mongoose');

var beaconData ={
  beacon001:{type:String},
  beacon002:{type:String},
  beacon003:{type:String},
  beacon004:{type:String},
  beacon005:{type:String},
  rectime : {type:String},

  createdAt:{type:Date,default:Date.now},
};

module.exports = beaconData;
