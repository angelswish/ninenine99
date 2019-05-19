try {
    var rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    const records = require('../modules/records.js');
    records.get('trpgDatabase', (msgs) => {
        rply.trpgDatabasefunction = msgs
    })
    records.get('trpgDatabaseAllgroup', (msgs) => {
        rply.trpgDatabaseAllgroup = msgs
    })
    gameName = function () {
        return '(公測中)資料庫功能 .db(p) (add del show 自定關鍵字)'
    }
    gameType = function () {
        return 'trpgDatabase:hktrpg'
    }
    prefixs = function () {
        return [/(^[.]db(p|)$)/ig, ]
    }
    getHelpMessage = function () {
        return "【資料庫功能】" + "\
        \n 這是根據關鍵字來顯示數據的,\
        \n 例如輸入 .db add 九大陣營 守序善良 (...太長省略) 中立邪惡 混亂邪惡 \
        \n 再輸入.db 九大陣營  守序善良 (...太長省略) 中立邪惡 混亂邪惡\
        \n add 後面第一個是關鍵字, 可以是漢字,數字,英文及emoji\
        \n P.S.如果沒立即生效 用.db show 刷新一下\
    \n 輸入.db add (關鍵字) (內容)即可增加關鍵字\
    \n 輸入.db show 顯示所有關鍵字\
    \n 輸入.db del(編號)或all 即可刪除\
    \n 輸入.db  (關鍵字) 即可顯示 \
    \n 如使用輸入.dbp 會變成全服版,全服可看, 可用add show功能 \
    \n "
    }
    initialize = function () {
        return rply;
    }

    rollDiceCommand = function (inputStr, mainMsg, groupid, userid, userrole) {
        records.get('trpgDatabase', (msgs) => {
            rply.trpgDatabasefunction = msgs
        })
        rply.text = '';
        switch (true) {
            // .DB(0) ADD(1) TOPIC(2) CONTACT(3)
            case /(^[.]db$)/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[2]):
                //增加資料庫
                //檢查有沒有重覆
                let checkifsamename = 0
                if (groupid && userrole >= 2 && mainMsg[3]) {
                    if (rply.trpgDatabasefunction)
                        for (var i = 0; i < rply.trpgDatabasefunction.length; i++) {
                            if (rply.trpgDatabasefunction[i].groupid == groupid) {
                                // console.log('checked1')
                                if (rply.trpgDatabasefunction[0] && rply.trpgDatabasefunction[0].trpgDatabasefunction[0])
                                    for (var a = 0; a < rply.trpgDatabasefunction[i].trpgDatabasefunction.length; a++) {
                                        if (rply.trpgDatabasefunction[i].trpgDatabasefunction[a].topic == mainMsg[2]) {
                                            //   console.log('checked')
                                            checkifsamename = 1
                                        }
                                    }
                            }
                        }
                    let temp = {
                        groupid: groupid,
                        trpgDatabasefunction: [{
                            topic: mainMsg[2],
                            contact: inputStr.replace(/\.db add /i, '').replace(mainMsg[2], '').replace(/^\s+/, '')
                        }]
                    }
                    if (checkifsamename == 0) {
                        records.pushtrpgDatabasefunction('trpgDatabase', temp, () => {
                            records.get('trpgDatabase', (msgs) => {
                                rply.trpgDatabasefunction = msgs
                                // console.log(rply);
                            })

                        })
                        rply.text = '新增成功: ' + mainMsg[2]
                    } else rply.text = '新增失敗. 重複標題'
                } else {
                    rply.text = '新增失敗.'
                    if (!mainMsg[2])
                        rply.text += ' 沒有標題.'
                    if (!mainMsg[3])
                        rply.text += ' 沒有內容'
                    if (!groupid)
                        rply.text += ' 不在群組.'
                    if (groupid && userrole < 2)
                        rply.text += ' 只有GM以上才可新增.'
                }
                return rply;

            case /(^[.]db$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]) && /^all$/i.test(mainMsg[2]):
                //刪除資料庫
                if (groupid && mainMsg[2] && rply.trpgDatabasefunction && userrole >= 2) {
                    for (var i = 0; i < rply.trpgDatabasefunction.length; i++) {
                        if (rply.trpgDatabasefunction[i].groupid == groupid) {
                            let temp = rply.trpgDatabasefunction[i]
                            temp.trpgDatabasefunction = []
                            records.settrpgDatabasefunction('trpgDatabase', temp, () => {
                                records.get('trpgDatabase', (msgs) => {
                                    rply.trpgDatabasefunction = msgs
                                })
                            })
                            rply.text = '刪除所有關鍵字'
                        }
                    }
                } else {
                    rply.text = '刪除失敗.'
                    if (!groupid)
                        rply.text += '不在群組. '
                    if (groupid && userrole < 2)
                        rply.text += '只有GM以上才可刪除. '
                }

                return rply;
            case /(^[.]db$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]) && /^\d+$/i.test(mainMsg[2]):
                //刪除資料庫
                if (groupid && mainMsg[2] && rply.trpgDatabasefunction && userrole >= 2) {
                    for (var i = 0; i < rply.trpgDatabasefunction.length; i++) {
                        if (rply.trpgDatabasefunction[i].groupid == groupid && mainMsg[2] < rply.trpgDatabasefunction[i].trpgDatabasefunction.length && mainMsg[2] >= 0) {
                            let temp = rply.trpgDatabasefunction[i]
                            temp.trpgDatabasefunction.splice(mainMsg[2], 1)
                            //console.log('rply.trpgDatabasefunction: ', temp)
                            records.settrpgDatabasefunction('trpgDatabase', temp, () => {
                                records.get('trpgDatabase', (msgs) => {
                                    rply.trpgDatabasefunction = msgs
                                })
                            })
                        }
                        rply.text = '刪除成功: ' + mainMsg[2]
                    }
                } else {
                    rply.text = '刪除失敗.'
                    if (!mainMsg[2])
                        rply.text += '沒有關鍵字. '
                    if (!groupid)
                        rply.text += '不在群組. '
                    if (groupid && userrole < 2)
                        rply.text += '只有GM以上才可刪除. '
                }
                return rply;

            case /(^[.]db$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
                //顯示
                records.get('trpgDatabase', (msgs) => {
                    rply.trpgDatabasefunction = msgs
                })
                //console.log(rply.trpgDatabasefunction)
                if (groupid) {
                    let temp = 0;
                    if (rply.trpgDatabasefunction)
                        for (var i = 0; i < rply.trpgDatabasefunction.length; i++) {
                            if (rply.trpgDatabasefunction[i].groupid == groupid) {
                                rply.text += '資料庫列表:'
                                for (var a = 0; a < rply.trpgDatabasefunction[i].trpgDatabasefunction.length; a++) {
                                    temp = 1
                                    rply.text += ("\n") + a + '. ' + rply.trpgDatabasefunction[i].trpgDatabasefunction[a].topic
                                }
                            }
                        }
                    if (temp == 0) rply.text = '沒有已設定的關鍵字. '
                } else {
                    rply.text = '不在群組. '
                }
                //顯示資料庫
                rply.text = rply.text.replace(/^([^(,)\1]*?)\s*(,)\s*/mg, '$1: ').replace(/\,/gm, ', ')
                return rply
            case /(^[.]db$)/i.test(mainMsg[0]) && /\S/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[1]):
                //顯示關鍵字
                //let times = /^[.]db/.exec(mainMsg[0])[1] || 1
                //if (times > 30) times = 30;
                //if (times < 1) times = 1
                //console.log(times)
                if (groupid) {
                    //    console.log(mainMsg[1])
                    let temp = 0;
                    if (rply.trpgDatabasefunction)
                        for (var i = 0; i < rply.trpgDatabasefunction.length; i++) {
                            if (rply.trpgDatabasefunction[i].groupid == groupid) {
                                // console.log(rply.trpgDatabasefunction[i])
                                //rply.text += '資料庫列表:'
                                for (var a = 0; a < rply.trpgDatabasefunction[i].trpgDatabasefunction.length; a++) {
                                    if (rply.trpgDatabasefunction[i].trpgDatabasefunction[a].topic.toLowerCase() == mainMsg[1].toLowerCase()) {
                                        temp = 1
                                        rply.text = rply.trpgDatabasefunction[i].trpgDatabasefunction[a].topic + '\n' + rply.trpgDatabasefunction[i].trpgDatabasefunction[a].contact;

                                    }

                                }
                            }
                        }
                    if (temp == 0) rply.text = '沒有相關關鍵字. '
                } else {
                    rply.text = '不在群組. '
                }
                rply.text = rply.text.replace(/\,/mg, ' ')
                return rply;
            case /(^[.]dbp$)/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[2]):
                let checkifsamenamegroup = 0
                if (rply.trpgDatabaseAllgroup)
                    if (rply.trpgDatabaseAllgroup[0].trpgDatabaseAllgroup[0])
                        for (var i = 0; i < rply.trpgDatabaseAllgroup.length; i++) {
                            for (var a = 0; a < rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup.length; a++) {
                                if (rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[a].topic.toLowerCase() == mainMsg[2].toLowerCase()) {
                                    checkifsamenamegroup = 1
                                }
                            }
                        }
                if (mainMsg[3]) {
                    let tempA = {
                        trpgDatabaseAllgroup: [{
                            topic: mainMsg[2],
                            contact: inputStr.replace(/\.dbp add /i, '').replace(mainMsg[2], '').replace(/^\s+/, '')
                        }]
                    }
                    console.log('tempA: ', tempA)
                    if (checkifsamenamegroup == 0) {
                        records.pushtrpgDatabaseAllgroup('trpgDatabaseAllgroup', tempA, () => {
                            records.get('trpgDatabaseAllgroup', (msgs) => {
                                rply.trpgDatabaseAllgroup = msgs
                                // console.log(rply);
                            })
                        })
                        rply.text = '新增成功: ' + mainMsg[2]
                    } else {
                        rply.text = '新增失敗. 重複關鍵字'
                    }
                } else {
                    rply.text = '新增失敗.'
                    if (!mainMsg[2])
                        rply.text += ' 沒有關鍵字.'
                    if (!mainMsg[3])
                        rply.text += ' 沒有內容.'
                }
                return rply;
            case /(^[.]dbp$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
                records.get('trpgDatabaseAllgroup', (msgs) => {
                    rply.trpgDatabaseAllgroup = msgs
                })
                let tempshow = 0;
                if (rply.trpgDatabaseAllgroup)
                    for (var i = 0; i < rply.trpgDatabaseAllgroup.length; i++) {
                        rply.text += '資料庫列表:'
                        for (var a = 0; a < rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup.length; a++) {
                            tempshow = 1
                            rply.text += ("\n") + a + '. ' + rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[a].topic
                        }
                    }
                if (tempshow == 0) rply.text = '沒有已設定的關鍵字. '
                //顯示資料庫
                rply.text = rply.text.replace(/^([^(,)\1]*?)\s*(,)\s*/mg, '$1: ').replace(/\,/gm, ', ')
                return rply
            case /(^[.]dbp$)/i.test(mainMsg[0]) && /\S/i.test(mainMsg[0]) && /^(?!(add|del|show)$)/ig.test(mainMsg[1]):

                //let timesgp = /^[.]dbp/.exec(mainMsg[0])[1] || 1
                //  if (timesgp > 30) timesgp = 30;
                //  if (timesgp < 1) timesgp = 1
                let temp2 = 0;
                if (rply.trpgDatabaseAllgroup)
                    for (var i = 0; i < rply.trpgDatabaseAllgroup.length; i++) {
                        for (var a = 0; a < rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup.length; a++) {
                            if (rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[a].topic.toLowerCase() == mainMsg[1].toLowerCase()) {
                                temp2 = 1
                                rply.text = rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[a].topic + '\n' + rply.trpgDatabaseAllgroup[i].trpgDatabaseAllgroup[a].contact;


                            }
                        }
                    }
                if (temp2 == 0) rply.text = '沒有相關關鍵字. '
                return rply;
            default:
                break;

        }
    }


    module.exports = {
        rollDiceCommand: rollDiceCommand,
        initialize: initialize,
        getHelpMessage: getHelpMessage,
        prefixs: prefixs,
        gameType: gameType,
        gameName: gameName
    };
} catch (e) {
    console.log(e)
}