var rollbase = require('./rollbase.js');
var rply = {
	default: 'on',
	type: 'text',
	text: ''
};

gameName = function () {
	return '進階擲骰 D66 5B10 5U10 8'
}

gameType = function () {
	return 'advroll:hktrpg'
}
prefixs = function () {
	return [/^(\d+)(b)(\d+)$|^d66s$|^d66$/i, ,
		/^(\d+)(u)(\d+)$/i, /\d+/]
}
getHelpMessage = function () {
	return "【進階擲骰】" + "\
	\n D66 D66s：	骰出D66 s小者固定在前\
	\n 5B10：	不加總的擲骰 會進行小至大排序 \
	\n 5B10 9：	如上,另外計算其中有多少粒大於9 \
	\n 5U10 8：	進行5D10 每骰出一粒8會有一粒獎勵骰 \
	\n 5U10 8 9：	如上,另外計算其中有多少粒大於9 \
		\n "
}
initialize = function () {
	return rply;
}

rollDiceCommand = function (inputStr, mainMsg) {
	rply.text = '';
	//let result = {};
	switch (true) {
		case /^d66$/i.test(mainMsg[0]):
			return d66(mainMsg[1]);
		case /^d66s$/i.test(mainMsg[0]):
			return d66s(mainMsg[1])
		case /^(\d+)(b)(\d+)$/i.test(mainMsg[0]):
			return xBy(mainMsg[0], mainMsg[1], mainMsg[2])
		case /^(\d+)(u)(\d+)$/i.test(mainMsg[0]) && mainMsg[1] <= 10000:
			return xUy(mainMsg[0], mainMsg[1], mainMsg[2], mainMsg[3]);
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
/*
 \n D66 D66s：	骰出D66 s小者固定在前\
  \n 5B10：	不加總的擲骰 會進行小至大排序 \
  \n 5B10 9：	如上,另外計算其中有多少粒大於9 \
  \n 5U10 8：	進行5D10 每骰出一粒8會有一粒獎勵骰 \
  \n 5U10 8 9：	如上,另外計算其中有多少粒大於9 \  
 
  */
////////////////////////////////////////
//////////////// D66
////////////////////////////////////////
function d66(text) {
	let returnStr = '';
	if (text != null) {
		returnStr = 'D66：' + text + ' → ' + rollbase.Dice(6) + rollbase.Dice(6);
	} else {
		returnStr = 'D66 → ' + rollbase.Dice(6) + rollbase.Dice(6);
	}
	rply.text = returnStr;
	return rply;
}
////////////////////////////////////////
//////////////// D66s
////////////////////////////////////////
function d66s(text) {
	let temp0 = rollbase.Dice(6);
	let temp1 = rollbase.Dice(6);
	let returnStr = '';
	if (temp0 >= temp1) {
		let temp2 = temp0;
		temp0 = temp1;
		temp1 = temp2;
	}
	if (text != null) {
		returnStr = 'D66s：' + text + ' → ' + temp0 + temp1;
	} else {
		returnStr = 'D66s → ' + temp0 + temp1;
	}
	rply.text = returnStr;
	return rply;
}
////////////////////////////////////////
//////////////// xBy
////////////////////////////////////////
function xBy(triggermsg, text01, text02) {
	let returnStr = '(' + triggermsg + ')';
	let match = /^(\d+)(B)(\d+)$/i.exec(triggermsg); //判斷式  [0]3B8,[1]3,[2]B,[3]8
	let varcou = new Array();
	let varsu = 0;
	for (var i = 0; i < Number(match[1]); i++) {
		varcou[i] = rollbase.Dice(match[3]);
	}
	varcou.sort(rollbase.sortNumber);
	//(5B7>6) → 7,5,6,4,4 → 成功数1
	if (isNaN(text01) == false && Number(text01) <= Number(match[3])) {
		for (let i = 0; i < Number(match[1]); i++) {
			if (Number(varcou[i]) >= Number(text01)) varsu++;
		}
		if (text02 == undefined) text02 = '';

		returnStr += ' → ' + varcou + ' → 成功數' + varsu + ' ' + text02;
	} else {
		if (text01 == undefined) text01 = '';
		returnStr += ' → ' + varcou + ' ' + text01;
	}
	rply.text = returnStr;
	return rply;
}
////////////////////////////////////////
//////////////// xUy
////////////////  (5U10[8]) → 17[10,7],4,5,7,4 → 17/37(最大/合計)
////////////////  (5U10[8]>8) → 1,30[9,8,8,5],1,3,4 → 成功数1
////////////////////////////////////////

function xUy(triggermsg, text01, text02, text03) {
	var match = /^(\d+)(u)(\d+)/i.exec(triggermsg); //判斷式  5u19,5,u,19, 
	var returnStr = '(' + triggermsg + '[' + text01 + ']';
	if (Number(text02) <= Number(match[3]) && text02 != undefined) {
		returnStr += '>' + text02 + ') → ';
		if (text03 != undefined) returnStr += text03 + ' → ';
	} else {
		returnStr += ') → ';
		if (text02 != undefined) returnStr += text02 + ' → ';
	}
	let varcou = new Array();
	let varcouloop = new Array();
	let varcoufanl = new Array();
	let varcounew = new Array();
	var varsu = 0;
	if (text01 <= 2) {
		rply.text = '加骰最少比2高';
		return rply;
	}

	for (var i = 0; i < Number(match[1]); i++) {
		varcou[i] = rollbase.Dice(match[3]);
		varcounew[i] = varcou[i];
		varcouloop[i] = varcounew[i];
		for (; varcounew[i] >= text01;) {
			varcounew[i] = rollbase.Dice(match[3]);
			varcouloop[i] += ', ' + varcounew[i];
			varcou[i] += varcounew[i];
		}

	}
	for (var i = 0; i < varcouloop.length; i++) {
		if (varcouloop[i] == varcou[i]) {
			returnStr += varcou[i] + ', ';
		} else returnStr += varcou[i] + '[' + varcouloop[i] + '], ';

	}
	returnStr = returnStr.replace(/, $/ig, '');

	if (Number(text02) <= Number(match[3])) {
		let suc = 0;

		////////////////  (5U10[8]>8) → 1,30[9,8,8,5],1,3,4 → 成功数1
		for (var i = 0; i < varcou.length; i++) {
			if (Number(varcou[i]) >= Number(text02)) suc++;
		}
		returnStr += ' → 成功数' + suc;
	} else
	////////////////  (5U10[8]) → 17[10,7],4,5,7,4 → 17/37(最大/合計)

	{
		returnStr += ' → ' + Math.max.apply(null, varcou)
		returnStr += '/' + varcou.reduce(function (previousValue, currentValue) {
			return previousValue + currentValue;
		}) + '(最大/合計)';
	}
	rply.text = returnStr;
	return rply;
}