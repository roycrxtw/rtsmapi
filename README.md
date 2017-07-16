# RTSM API

A real-time traffic data api of motorways in Taiwan. 本api會抓取高速公路局網站之交通資料，並輸出為json格式以利處理。

+ [使用說明](#使用說明)
+ [使用範例](#使用範例)
+ [回傳資料說明](#回傳資料說明)
+ [國道代號列表](#國道代號列表)

## 使用說明
本api使用相當簡單，只需根據各國道之代號，對RTSM API之url發出get請求即可。
```
https://rtsmapi.royvbtw.uk/data/motorwayId
```
**motorwayId** 國道代號，請[參閱下表](#國道代號列表)
## 使用範例
```
https://rtsmapi.royvbtw.uk/data/m5
```
對api請求國道五號(m5)之即時速度資料
```
// 回傳結果
{
name: "國道5號",
nameEn: "M5 Motorway",
traffic: [
{name: "南港系統(0) - 石碇(4)", speedA: "77", speedB: "67"},
{name: "石碇(4) - 坪林行控(14)", speedA: "84", speedB: "76"}
// 省略其餘結果
]}
```
各區段之速度資料會依序輸出在traffic陣列中。

## 回傳資料說明
+ **name**: 國道名稱
+ **nameEn**: 國道英文名稱
+ **direction**: 此國道之走向. 0: 南北向. 1: 東西向.
+ **traffic**: 為一陣列，陣列內元素為各區段之速度資料
+ **traffic .name**: 區段名稱
+ **traffic .speedA**: 參考下表
+ **traffic .speedB**: 參考下表

-|direction|speedA|speedB
---|---|---|---
南北向|0|南下速度|北上速度
東西向|1|東行速度|西行速度

## 國道代號列表
motorwayId|tw name|english name
---|---|---
m1|國道1號|M1 Motorway
m1e|國道1號高架段|M1 Motorway Elevated
m2|國道2號|M2 Motorway
m3|國道3號|M3 Motorway
m3a|國道3甲|M3A Motorway
t2f|港西聯外道路(台2己線)|Port of Keelung Accessway
nar|南港聯絡道|Nankang Accessway
m4|國道4號|M4 Motorway
m5|國道5號|M5 Motorway
m6|國道6號|M6 Motorway
m8|國道8號|M8 Motorway
m10|國道10號|M10 Motorway
e62|台62快速道路|E62 Expressway
e64|台64快速道路|E64 Expressway
e66|台66快速道路|E66 Expressway
e68|台68快速道路|E68 Expressway
e72|台72快速道路|E72 Expressway
e74|台74快速道路|E74 Expressway
e76|台76快速道路|E76 Expressway
e78|台78快速道路|E78 Expressway
e82|台82快速道路|E82 Expressway
e84|台84快速道路|E84 Expressway
e86|台86快速道路|E86 Expressway
e88|台88快速道路|E88 Expressway

## License
RTSM API is licensed under the MIT license.
本RTSM API使用MIT授權。
