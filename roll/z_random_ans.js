try {
    var rply = {
        default: 'on',
        type: 'text',
        text: ''
    };
    const records = require('../modules/records.js');
    records.get('randomAns', (msgs) => {
        rply.randomAnsfunction = msgs
    })
    records.get('randomAnsAllgroup', (msgs) => {
        rply.randomAnsAllgroup = msgs
    })
    gameName = function () {
        return '(公測中)自定義回應功能 .ra(p)(次數) (add del show 自定關鍵字)'
    }
    gameType = function () {
        return 'randomAns:hktrpg'
    }
    prefixs = function () {
        return [/(^[.]ra(\d+|p|p\d+|)$)/ig,]
    }
    getHelpMessage = function () {
        return "【自定義回應功能】" + "\
        \n 這是根據關鍵字來隨機抽選功能,只要符合內容,以後就會隨機抽選\
        \n 例如輸入 .ra add 九大陣營 守序善良 (...太長省略) 中立邪惡 混亂邪惡 \
        \n 再輸入.ra 九大陣營  就會輸出 九大陣營中其中一個\
        \n 如果輸入.ra3 九大陣營  就會輸出 3次九大陣營\
        \n add 後面第一個是關鍵字, 可以是漢字,數字和英文或emoji\
        \n P.S.如果沒立即生效 用.ra show 刷新一下\
    \n 輸入.ra add (關鍵字) (選項1) (選項2) (選項3)即可增加關鍵字\
    \n 輸入.ra show 顯示所有關鍵字\
    \n 輸入.ra del(編號)或all 即可刪除\
    \n 輸入.ra(次數,最多30次) (關鍵字) 即可隨機抽選 \
    \n 如使用輸入.rap 會變成全服版,全服可看, 可用add show功能 \
    \n 例如輸入 .rap10 聖晶石召喚 即可十連抽了 \
    \n "
    }
    initialize = function () {
        return rply;
    }

    rollDiceCommand = function (inputStr, mainMsg, groupid, userid, userrole) {
        records.get('randomAns', (msgs) => {
            rply.randomAnsfunction = msgs
        })
        rply.text = '';
        switch (true) {
            case /(^[.]ra(\d+|)$)/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[2]):
                //增加自定義關鍵字
                let checkifsamename = 0
                if (groupid && userrole >= 2 && mainMsg[3] && mainMsg[4]) {
                    if (rply.randomAnsfunction)
                        for (var i = 0; i < rply.randomAnsfunction.length; i++) {
                            if (rply.randomAnsfunction[i].groupid == groupid) {
                                // console.log('checked1')
                                for (var a = 0; a < rply.randomAnsfunction[i].randomAnsfunction.length; a++) {
                                    if (rply.randomAnsfunction[i].randomAnsfunction[a][0].toLowerCase() == mainMsg[2].toLowerCase()) {
                                        //   console.log('checked')
                                        checkifsamename = 1
                                    }
                                }
                            }
                        }
                    let temp = {
                        groupid: groupid,
                        randomAnsfunction: [mainMsg.slice(2)]
                    }
                    if (checkifsamename == 0) {
                        records.pushrandomAnsfunction('randomAns', temp, () => {
                            records.get('randomAns', (msgs) => {
                                rply.randomAnsfunction = msgs
                                // console.log(rply);
                            })

                        })
                        rply.text = '新增成功: ' + mainMsg[2]
                    } else rply.text = '新增失敗. 重複關鍵字'
                } else {
                    rply.text = '新增失敗.'
                    if (!mainMsg[2])
                        rply.text += ' 沒有關鍵字.'
                    if (!mainMsg[3] && !mainMsg[4])
                        rply.text += ' 沒有自定義回應,至少兩個.'
                    if (!groupid)
                        rply.text += ' 不在群組.'
                    if (groupid && userrole < 2)
                        rply.text += ' 只有GM以上才可新增.'
                }
                return rply;

            case /(^[.]ra(\d+|)$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]) && /^all$/i.test(mainMsg[2]):
                //刪除自定義關鍵字
                if (groupid && mainMsg[2] && rply.randomAnsfunction && userrole >= 2) {
                    for (var i = 0; i < rply.randomAnsfunction.length; i++) {
                        if (rply.randomAnsfunction[i].groupid == groupid) {
                            let temp = rply.randomAnsfunction[i]
                            temp.randomAnsfunction = []
                            records.setrandomAnsfunction('randomAns', temp, () => {
                                records.get('randomAns', (msgs) => {
                                    rply.randomAnsfunction = msgs
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
            case /(^[.]ra(\d+|)$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]) && /^\d+$/i.test(mainMsg[2]):
                //刪除自定義關鍵字
                if (groupid && mainMsg[2] && rply.randomAnsfunction && userrole >= 2) {
                    for (var i = 0; i < rply.randomAnsfunction.length; i++) {
                        if (rply.randomAnsfunction[i].groupid == groupid && mainMsg[2] < rply.randomAnsfunction[i].randomAnsfunction.length && mainMsg[2] >= 0) {
                            let temp = rply.randomAnsfunction[i]
                            temp.randomAnsfunction.splice(mainMsg[2], 1)
                            //console.log('rply.randomAnsfunction: ', temp)
                            records.setrandomAnsfunction('randomAns', temp, () => {
                                records.get('randomAns', (msgs) => {
                                    rply.randomAnsfunction = msgs
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

            case /(^[.]ra(\d+|)$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
                records.get('randomAns', (msgs) => {
                    rply.randomAnsfunction = msgs
                })
                if (groupid) {
                    let temp = 0;
                    if (rply.randomAnsfunction)
                        for (var i = 0; i < rply.randomAnsfunction.length; i++) {
                            if (rply.randomAnsfunction[i].groupid == groupid) {
                                rply.text += '自定義關鍵字列表:'
                                for (var a = 0; a < rply.randomAnsfunction[i].randomAnsfunction.length; a++) {
                                    temp = 1
                                    rply.text += ("\n") + a + '. ' + rply.randomAnsfunction[i].randomAnsfunction[a] + ("\n")
                                }
                            }
                        }
                    if (temp == 0) rply.text = '沒有已設定的關鍵字. '
                } else {
                    rply.text = '不在群組. '
                }
                //顯示自定義關鍵字
                rply.text = rply.text.replace(/^([^(,)\1]*?)\s*(,)\s*/mg, '$1: ').replace(/\,/gm, ', ')
                return rply
            case /(^[.]ra(\d+|)$)/i.test(mainMsg[0]) && /\S/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[1]):
                let times = /^[.]ra(\d+|)/.exec(mainMsg[0])[1] || 1
                if (times > 30) times = 30;
                if (times < 1) times = 1
                //console.log(times)
                if (groupid) {
                    //    console.log(mainMsg[1])
                    let temp = 0;
                    if (rply.randomAnsfunction)
                        for (var i = 0; i < rply.randomAnsfunction.length; i++) {
                            if (rply.randomAnsfunction[i].groupid == groupid) {
                                // console.log(rply.randomAnsfunction[i])
                                //rply.text += '自定義關鍵字列表:'
                                for (var a = 0; a < rply.randomAnsfunction[i].randomAnsfunction.length; a++) {
                                    if (rply.randomAnsfunction[i].randomAnsfunction[a][0].toLowerCase() == mainMsg[1].toLowerCase()) {
                                        temp = 1
                                        rply.text = rply.randomAnsfunction[i].randomAnsfunction[a][0] + ' → ' + rply.randomAnsfunction[i].randomAnsfunction[a][(Math.floor(Math.random() * (rply.randomAnsfunction[i].randomAnsfunction[a].length - 1))) + 1];
                                        for (let t = 1; t < times; t++) {
                                            rply.text += ' , ' + rply.randomAnsfunction[i].randomAnsfunction[a][(Math.floor(Math.random() * (rply.randomAnsfunction[i].randomAnsfunction[a].length - 1))) + 1];
                                        }
                                    }

                                }
                            }
                        }
                    if (temp == 0) rply.text = '沒有相關關鍵字. '
                } else {
                    rply.text = '不在群組. '
                }
                return rply;
            case /(^[.]rap(\d+|)$)/i.test(mainMsg[0]) && /^add$/i.test(mainMsg[1]) && /^(?!(add|del|show)$)/ig.test(mainMsg[2]):
                let checkifsamenamegroup = 0
                if (rply.randomAnsAllgroup)
                    for (var i = 0; i < rply.randomAnsAllgroup.length; i++) {
                        for (var a = 0; a < rply.randomAnsAllgroup[i].randomAnsAllgroup.length; a++) {
                            if (rply.randomAnsAllgroup[i].randomAnsAllgroup[a][0].toLowerCase() == mainMsg[2].toLowerCase()) {
                                checkifsamenamegroup = 1
                            }
                        }
                    }
                if (mainMsg[3] && mainMsg[4]) {
                    let tempA = {
                        randomAnsAllgroup: [mainMsg.slice(2)]
                    }
                    if (checkifsamenamegroup == 0) {
                        records.pushrandomAnsAllgroup('randomAnsAllgroup', tempA, () => {
                            records.get('randomAnsAllgroup', (msgs) => {
                                rply.randomAnsAllgroup = msgs
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
                    if (!mainMsg[3] && !mainMsg[4])
                        rply.text += ' 沒有自定義回應,至少兩個.'
                }
                return rply;
            /* case /(^[.]rap(\d+|)$)/i.test(mainMsg[0]) && /^del$/i.test(mainMsg[1]) && /^\d+$/i.test(mainMsg[2]):
                 //刪除自定義關鍵字
                 if (mainMsg[2] && rply.randomAnsAllgroup) {
                     for (var i = 0; i < rply.randomAnsAllgroup.length; i++) {
                         if (mainMsg[2] < rply.randomAnsAllgroup[i].randomAnsAllgroup.length && mainMsg[2] >= 0) {
                             let temp = rply.randomAnsAllgroup[i]
                             temp.randomAnsAllgroup.splice(mainMsg[2], 1)
                             //console.log('rply.randomAnsAllgroup: ', temp)
                             records.setrandomAnsAllgroup('randomAnsAllgroup', temp, () => {
                                 records.get('randomAnsAllgroup', (msgs) => {
                                     rply.randomAnsAllgroup = msgs
                                 })
                             })
                         }
                         rply.text = '刪除成功: ' + mainMsg[2]
                     }
                 } else {
                     rply.text = '刪除失敗.'
                     if (!mainMsg[2])
                         rply.text += '沒有關鍵字. '

                 }
                 return rply;
                 */
            case /(^[.]rap(\d+|)$)/i.test(mainMsg[0]) && /^show$/i.test(mainMsg[1]):
                records.get('randomAnsAllgroup', (msgs) => {
                    rply.randomAnsAllgroup = msgs
                    //  console.log(rply)
                })
                let tempshow = 0;
                if (rply.randomAnsAllgroup)
                    for (var i = 0; i < rply.randomAnsAllgroup.length; i++) {
                        rply.text += '自定義關鍵字列表:'
                        for (var a = 0; a < rply.randomAnsAllgroup[i].randomAnsAllgroup.length; a++) {
                            tempshow = 1
                            rply.text += ("\n") + a + '. ' + rply.randomAnsAllgroup[i].randomAnsAllgroup[a][0]
                        }
                    }
                if (tempshow == 0) rply.text = '沒有已設定的關鍵字. '
                //顯示自定義關鍵字
                rply.text = rply.text.replace(/^([^(,)\1]*?)\s*(,)\s*/mg, '$1: ').replace(/\,/gm, ', ')
                return rply
            case /(^[.]rap(\d+|)$)/i.test(mainMsg[0]) && /\S/i.test(mainMsg[0]) && /^(?!(add|del|show)$)/ig.test(mainMsg[1]):

                let timesgp = /^[.]rap(\d+|)/.exec(mainMsg[0])[1] || 1
                if (timesgp > 30) timesgp = 30;
                if (timesgp < 1) timesgp = 1
                let temp2 = 0;
                if (rply.randomAnsAllgroup)
                    for (var i = 0; i < rply.randomAnsAllgroup.length; i++) {
                        for (var a = 0; a < rply.randomAnsAllgroup[i].randomAnsAllgroup.length; a++) {
                            if (rply.randomAnsAllgroup[i].randomAnsAllgroup[a][0].toLowerCase() == mainMsg[1].toLowerCase()) {
                                temp2 = 1
                                rply.text = rply.randomAnsAllgroup[i].randomAnsAllgroup[a][0] + ' → ' + rply.randomAnsAllgroup[i].randomAnsAllgroup[a][(Math.floor(Math.random() * (rply.randomAnsAllgroup[i].randomAnsAllgroup[a].length - 1))) + 1];
                                for (let t = 1; t < timesgp; t++) {
                                    rply.text += ' , ' + rply.randomAnsAllgroup[i].randomAnsAllgroup[a][(Math.floor(Math.random() * (rply.randomAnsAllgroup[i].randomAnsAllgroup[a].length - 1))) + 1];
                                }
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