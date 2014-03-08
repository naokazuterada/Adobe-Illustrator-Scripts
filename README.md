

# Adobe Illustrator Scripts

## Installing

1. Download & place into `~/Applications/Adobe Illustrator/preset/script/`
2. Restart Illustrator
3. See File > Script > ◯◯◯


## Contents

- SaveAsPDFByLayers
- DeleteAllHiddens
- SaveAsPNG


## SaveAsPDFByLayers

### 特徴

- ページをレイヤー分けしておくと、自動でPDFに書き出してくれます
- 不要なレイヤーは毎回削除するので、無駄にデータが増えません
- レイヤーの並び順に従い、ファイル名の頭に番号がつきます
　（後は、Acrobatで連結してください）

### 機能

- 最上位階層のレイヤーを上（または下）から順にPDFで保存します
- ロックされているレイヤーは操作の対象になりません
- ヘッダーなどの共通部分を含むレイヤーは「表示」＆「ロック」しておくと便利です
- 下位階層のレイヤーは操作の対象になりません。また、最上位階層でも「非表示」＆「ロック」状態のレイヤーも非表示のまま書き出し対象になりますので、不必要なレイヤーはあらかじめ破棄しておくことをお勧めします（これを活用してください）
- 書き出されたPDFのファイル名の接頭数字は３桁でつくので、Acrobatで一気に読みこんだ時に順番の入替作業が不要で便利です
- レイヤーの書出し順序の設定
- PDFのオプション設定
- 前回設定の保存



## DeleteAllHiddens

### 特徴

非表示状態のレイヤーやアイテム・グループをきれいに消去してくれます。ロックされてても関係なく消されます。


### 処理の流れ

1. 非表示状態のアイテムの消去
2. 非表示状態のレイヤーの消去
3.子要素がなくなったレイヤーの消去（クリーンナップ）


SaveAsPDFByLayersの使用前に使うと便利かと思います。


## SaveAsPNG

PDFで保存します。
