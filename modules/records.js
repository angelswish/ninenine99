const {
    EventEmitter
} = require("events");
const mongoose = require('mongoose');
const schema = require('./core-schema.js');
//const Message = mongoose.model('Message', schema);

let instance;
let data = [];
let MAX = 50000;

class Records extends EventEmitter {
    constructor() {
        super();
    }
    set(dbbase, msg, callback) {
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $set: {
                    blockfunction: msg.blockfunction
                }
            }, {
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
                // return JSON.stringify(doc).toString();
            });
    }

    pushblockfunction(dbbase, msg, callback) {
        /*
            提醒:
            $push 加入新的
            $set  重置舊的
         */
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $push: {
                    blockfunction: msg.blockfunction
                }
            }, {
                new: true,
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
            });
    }

    //randomAns開始
    pushrandomAnsfunction(dbbase, msg, callback) {
        /*
            提醒:
            $push 加入新的
            $set  重置舊的
         */
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $push: {
                    randomAnsfunction: msg.randomAnsfunction
                }
            }, {
                new: true,
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
            });
    }
    setrandomAnsfunction(dbbase, msg, callback) {
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $set: {
                    randomAnsfunction: msg.randomAnsfunction
                }
            }, {
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
                // return JSON.stringify(doc).toString();
            });
    }

    pushrandomAnsAllgroup(dbbase, msg, callback) {
        /*
            提醒:
            $push 加入新的
            $set  重置舊的
         */
        schema[dbbase].findOneAndUpdate({}, {
            $push: {
                randomAnsAllgroup: msg.randomAnsAllgroup
            }
        }, {
                new: true,
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
            });
    }
    setrandomAnsAllgroup(dbbase, msg, callback) {
        schema[dbbase].findOneAndUpdate({}, {
            $set: {
                randomAnsAllgroup: msg.randomAnsAllgroup
            }
        }, {
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
                // return JSON.stringify(doc).toString();
            });
    }

    get(target, callback) {
        // 取出所有資料
        schema[target].find({}, (err, msgs) => {
            callback(msgs);
        });
    }

    /*
        trpgDatabase開始
    */
    pushtrpgDatabasefunction(dbbase, msg, callback) {
        /*
            提醒:
            $push 加入新的
            $set  重置舊的
         */
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $push: {
                    trpgDatabasefunction: msg.trpgDatabasefunction
                }
            }, {
                new: true,
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
            });
    }
    settrpgDatabasefunction(dbbase, msg, callback) {
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $set: {
                    trpgDatabasefunction: msg.trpgDatabasefunction
                }
            }, {
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
                // return JSON.stringify(doc).toString();
            });
    }

    pushtrpgDatabaseAllgroup(dbbase, msg, callback) {
        /*
            提醒:
            $push 加入新的
            $set  重置舊的
         */
        console.log('msg: ', msg)
        schema[dbbase].findOneAndUpdate({}, {
            $push: {
                trpgDatabaseAllgroup: msg.trpgDatabaseAllgroup
            }
        }, {
                new: true,
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
            });
    }
    settrpgDatabaseAllgroup(dbbase, msg, callback) {
        schema[dbbase].findOneAndUpdate({}, {
            $set: {
                trpgDatabaseAllgroup: msg.trpgDatabaseAllgroup
            }
        }, {
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
                // return JSON.stringify(doc).toString();
            });
    }


    /*
          setGroupSetting開始
      */
    pushGroupSettingfunction(dbbase, msg, callback) {
        /*
            提醒:
            $push 加入新的
            $set  重置舊的
         */
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $push: {
                    GroupSettingfunction: msg.GroupSettingfunction
                }
            }, {
                new: true,
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
            });
    }
    setGroupSettingfunction(dbbase, msg, callback) {
        schema[dbbase].findOneAndUpdate({
            groupid: msg.groupid
        }, {
                $set: {
                    GroupSettingfunction: msg.GroupSettingfunction
                }
            }, {
                upsert: true
            }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                } else
                    callback();
                // return JSON.stringify(doc).toString();
            });
    }



}

module.exports = (function () {
    if (!instance) {
        instance = new Records();
    }

    return instance;
})();