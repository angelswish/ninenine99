# RoboYabaso@HKTRPG </br> 
【HKTRPG擲骰BOT】v1.11.240</br> 
最後更新時間2019-04-19T 11:49:35Z</br> 

關於RoboYabaso
==
RoboYabaso最早由LarryLo  Retsnimle開發。 </br> 
是一個開放源碼骰子機器人計畫。</br></br>

現在改成三合一Line x Discord x Telegram。</br>
雖然是三合一，但可以單獨使用，只是共用骰組，</br>
啓動條件是在HEROUKU 輸入BOT的 CHANNEL_SECRET</br>

不然的話沒這麼多伺服器開這麼多ＢＯＴ。</br>
最期待Whatsapp快開放權限，香港都是比較多使用Whatsapp</br></br>


這是建立在Heroku的免費伺服器上，所以大家都可以按照下面的教程，客制化做一個自己的BOT！
</br></br>

試用
==
RoboYabaso@HKTRPG </br>
LineID是：@utr0641o  
你也可以使用QR扣：  
![QR](http://truth.bahamut.com.tw/s01/201612/c50dc2bd02de285983e7cf1c48926a61.JPG)  

或是點這裡：<a href="https://line.me/R/ti/p/svMLqy9Mik"><img height="36" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"></a>
</br></br>

 Discord版 https://discordapp.com/oauth2/authorize?&client_id=544462904037081138&scope=bot&permissions=8
 </br>
 Telegram版 http://t.me/hktrpg_bot
 </br>
骰組指令說明在最底下</br>


順便宣傳
<a href="http://www.goddessfantasy.net/bbs/index.php?board=1400.0">香港TRPG區</a>
<a href="https://www.hktrpg.com">TRPG百科</a>
招技術人員
</br></br></br>

### ToDo list

- [ ] 暗骰同時把結果傳給指定對象
- [ ] 可以給非Admin GM權限
- [ ] 設定名字, 每次擲骰時顯示
- [ ] 定時功能. GM 可以發佈任務, 定時提示時限, 玩家查詢等等
- [ ] 投票功能
- [ ] 存好指定擲骰方法, 輸入指定即可快速打出來
- [ ] 選擇圖書式遊戲(好像COC 單人TRPG 「向火獨行」一樣, 輸入頁碼, 就會顯示故事, 好像跑團一樣,以後不怕沒有同伴了,不過首先要有故事ORZ)

其他功能,歡迎留言建議


特色介紹</br>
==
占卜運氣功能。</br>
支持大小階。</br>
增加HELP功能。詳情BOT內輸入bothelp 查看說明</br>
支持直接 1d100 5d20。</br>
cc<= 改成 cc cc1 cc2 ccn1 ccn2。</br>
增加永遠後日談的NC擲骰 來自Rainsting/TarotLineBot。</br>
增加wod 黑暗世界 DX3 SW2.0的擲骰。</br>
模組化設計。</br></br>
</br></br></br>

以下分別有Line Discord 和telegram 的說明</br>
用那個就看那個吧
</br></br>
如何建立自己的Line骰子機器人
==

準備動作：
--
* 先申請好Line帳號（廢話）</br>
* 先申請好Github帳號</br>
* 先申請好Heroku帳號</br>
以下全部選擇用免費的服務就夠了，請不要手殘選到付費。
</br></br></br>

Step1：先把這個專案Fork回去
--
* 到右上角的 ![Fork](http://i.imgur.com/g5VmzkC.jpg) 按鈕嗎，按下去。</br>
把這個專案存到你的Github裡。
</br></br></br></br>

Step2：建立lineBot賬號
--
* 到[https://developers.line.me/en/ ](https://developers.line.me/en/ )登入一個Line帳號，</br>
點選「開始使用Messaging API」，按照指示註冊你的line Bot賬號。</br>
![開始使用Messaging API](http://i.imgur.com/Zb2Oboy.jpg)</br></br></br>
---

* 點下方那個「免費帳號」</br>
</br></br></br>
---

* 進入你剛註冊的line Bot賬號</br>
---

* 照著這個畫面設定,把Use webhooks 定為開啓，Auto-reply messages  及Greeting messages 定為Disable</br>
![設定](http://i.imgur.com/PXf10Qs.jpg)</br></br></br>
---
* 然後開著網頁不要關。</br>
![LINE Developers](http://i.imgur.com/aks55p4.jpg)</br></br></br></br>
---


Step3：將LineBot部署到Heroku
--

* 按一下下面這個按鈕</br>
按它→[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/zeteticl/RoboYabaso)←按它</br></br></br>
---

* 你會看到這個</br>
![Heroku](http://i.imgur.com/sbCVOcW.jpg)</br></br></br>
當然，先取一個App name，回到上個步驟的LINE Developers網頁</br></br></br></br>




Step4：取得Channel Access Token和Channel Secret
--
* 先取得Channel Secret，按右邊的按鈕</br>
![Channel Secret](http://i.imgur.com/oNN9gUx.jpg)</br>
把取得的字串複製到Step3的LINE_CHANNEL_SECRET</br></br></br>
---
* 再取得Channel Access Token，按右邊的按鈕</br>
![Channel Access Token](http://i.imgur.com/UJ4AQlJ.jpg)</br>
把取得的字串複製到Step3的LINE_CHANNEL_ACCESSTOKEN</br></br>
接著，按下Deploy app，等他跑完之後按下Manage App</br>
距離部署完機器人只差一步啦！
</br></br></br></br>



Step5：鏈接Line與Heroku
--
* 點選settings</br>
![setting](http://i.imgur.com/9fEMoVh.jpg)</br></br></br>
---
* 找到Domains and certificates這個條目，旁邊會有個「Your app can be found at……」加一串網址，把網址複製起來。</br>
![Domain](http://i.imgur.com/dcgyeZa.jpg)</br></br></br>
---
* 回到LINE Developers網頁，選取最底下的edit，找到Webhook URL，把那串網址去除https://複製上去</br>
![webhook](http://i.imgur.com/tn2EN6l.jpg)</br></br></br>
---
* 按下Save。看到在 Webhook URL 旁邊有個 VERIFY 按鈕嗎，按下去。</br>
如果出現 Success. 就表示你成功完成啦！</br>
![Success](http://i.imgur.com/yjlpIh8.jpg)</br></br></br>

如何修改並上傳程式碼咧
==
回到Heroku網頁，點選上面的Deploy，你會看到四種配置程式碼的方法。</br>
![Deploy](http://i.imgur.com/VVRpNLe.jpg)</br>

我猜想如果你是會用第一種（Heroku Git）或是第四種（Container Registry）的人，應該是不會看這種教學文～所以我就不介紹了～</br>
絕、絕對不是我自己也不會的關係哦（眼神漂移）</br>

以第二種（Github）來說的話，你可以綁定你的Github賬號——剛剛我們不是fork了一份程式碼回去嗎？把它連接上去，這樣你就可以在Github那邊修改你要的程式碼，再Deploy過來。</br>
或是你可以使用第三種（Dropbox），當你鏈接之後，它會自動幫你把你剛剛上線的程式碼下載到你的dropbox裡面。你修改完之後再上來Deploy就好咯。</br></br></br>



準備動作：
--
* 先申請好Discord帳號（廢話）</br>
* 先申請好Github帳號</br>
* 先申請好Heroku帳號</br>
以下全部選擇用免費的服務就夠了，請不要手殘選到付費。
</br></br></br>

Step1：先把這個專案Fork回去
--
* 到右上角的 ![Fork](http://i.imgur.com/g5VmzkC.jpg) 按鈕嗎，按下去。</br>
把這個專案存到你的Github裡。
</br></br></br></br>

Step2：建立DiscordBot賬號
--
* 到[http://discordapp.com/developers/applications/me](http://discordapp.com/developers/applications/me )登入一個Discord帳號，</br>
點選「New Application」，按照指示註冊你的Discord Bot。</br>
---

* 記下那個「CLIENT ID」</br>


* 進入左方Setting 的Bot</br>


* 在BUILD-A-BOT中點選Add Bot->Yes Do It. 接著把「Token」複製(Copy)下來</br>
</br></br></br>
Step3：將DiscordBot部署到Heroku
--

* 按一下下面這個按鈕</br>
按它→[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/zeteticl/DiscordRollBot_HKTRPG)←按它</br></br></br>
---

* 你會看到這個</br>
![Heroku](http://i.imgur.com/sbCVOcW.jpg)</br></br></br>
當然，先取一個App name，然後把以前記下的「Token」貼上.</br></br>
如果想要啓動語,可以順便打上. 例如啓動語!trpg 便會變成!trpg 1d100 
接著，按下Deploy app，等他跑完之後按下Manage App</br>
距離部署完機器人只差一步啦！
</br></br></br></br>



Step4：把機器人邀請到你的頻道
--
* 剛剛複製了一個「CLIENT ID」把它取代到以下網址中間</br>

[https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8](https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8)</br></br>

* 點擊然後選擇你的頻道</br>
* 然後就可以在頻道中使用你的Bot了.
---
</br></br></br>


Telegram......</br>
是最簡單的,和上面一樣,先註冊Telegram ACC</br>
然後到 https://telegram.me/botfather</br>
使用 /new bot 輸入BotName 和UserName</br>
會得到Token 和邀請碼，Token 就是輸入到Heroku 中</br>
邀請碼就是給Telegram 用家連到Bot的。</br></br>



以上說明參考</br>
https://github.com/zeteticl/TrpgLineBot-php </br>

下一部希望更新是</br>
1. MONGODB (但好難啊....會有高手幫忙嗎....不想用GOOGLE SHEET.....</br>
2. 骰組方法學習凍豆腐</br>
3. Help的優化

2018/02/01</br>
更新模組化</br></br>

2018/02/17 </br>
發現說明有BUG,已修正</br></br>

2018/03/09</br>
更新DX3了</br></br>

2018/11/22</br>
更新SW2.0</br></br>

*2019/02/15</br>
新增成長或增長檢定：dp (數值) (名字)</br>

*2019/4/2
趕不及4月1日發佈,可惡! 三合一版完成</br>



【擲骰BOT】
--
例如輸入2d6+1　攻撃！</br>
會輸出）2d6+1：攻撃  9[6+3]+1 = 10</br>
如上面一樣,在骰子數字後方隔空白位打字,可以進行發言。</br>
以下還有其他例子</br>
5 3D6 ：分別骰出5次3d6</br>
D66 D66s ：骰出D66 s小者固定在前</br>
5B10：不加總的擲骰 會進行小至大排序</br>
5B10 8：如上,另外計算其中有多少粒大過8</br>
5U10 8：進行5D10 每骰出一粒8會有一粒獎勵骰</br>
5U10 8 9：如上,另外計算其中有多少粒大過9</br>
Choice：啓動語choice/隨機/選項/選1</br>
(問題)(啓動語)(問題)  (選項1) (選項2)</br>
例子 隨機收到聖誕禮物數 1 2 3 >4  </br>
  </br>
隨機排序：啓動語　排序</br>
(問題)(啓動語)(問題)  (選項1) (選項2)(選項3)</br>
例子 交換禮物排序 A君 C君 F君 G君</br></br>
 
・COC六版判定　CCb （目標値）：做出成功或失敗的判定</br>
例）CCb 30　CCb 80</br>
・COC七版判定　CCx（目標値）</br>
　x：獎勵骰/懲罰骰 (2～n2)。沒有的話可以省略。</br>
例）CC 30　CC1 50　CCn2 75</br></br>
・coc7角色背景：啓動語 coc7角色背景</br>
・coc7 成長或增長檢定：dp (技能) (名稱)</br>
例）DP 80 偵查</br></br>
・coc7 成長或增長檢定：dp (技能) (名稱)</br>
例）DP 80 偵查</br></br>

・NC 永遠的後日談擲骰</br>
(骰數)NC/NA (問題)</br>
  例子 1NC 2Na+4 3na-2</br>
依戀  NM (問題)</br>
  例子 NM 我的依戀</br></br>
  
・WOD 黑暗世界擲骰</br>
(骰數)WOD/Wd(加骰)(+成功數) (問題)</br>
  例子 2wod 3wd8 15wd9+2</br></br>

・SW2.0</br>
KKn+m-m@c$d$+xGF n=骰數 c=暴擊值 m=其他修正 d=固定值 x=增加值</br>
例子 KK050+8-1@8 KK050+8@8$9gf</br></br>

・DX3 </br>
nDXc+m-m  n=骰數 c=暴擊值 m=其他修正</br>
例子 5DX8-1+8</br></br>

・占卜運氣功能 字句中包括運氣即可</br>
・塔羅牌占卜 塔羅/大十字塔羅/每日塔羅牌</br>
  時間tarot 等關键字可啓動</br>
・死亡FLAG：啓動語 立Flag/死亡flag</br>
