/*
	-----------------------------------------------------------------------------------------
	SaveAsPDFByLayers
	Javascript for Adobe Illustrator CS
		
	auther 	: TERADA Naokazu
	date		: 2009.06

	http://kocoha.net/
	http://karappo.net/
	-----------------------------------------------------------------------------------------
	
	description ( in Japanese ):
	
	最上位階層にあるレイヤーごとにPDFで保存します。

	・	実行後にダイアログが表示されますので、保存先を指定してください。
	
	・	あらかじめロックされているレイヤーは無視されるので、
		ヘッダーフッターなどの共通部分を含むレイヤーは「表示・ロック」しておくと便利です。

	・	「非表示・ロック」になっているレイヤーも非表示のまま書き出し対象になりますので、
		不必要なレイヤーはあらかじめ破棄しておくことをお勧めします。

	・	書き出されたPDFのファイル名の接頭数字は３桁でつくので、
		Acrobatで一気に読みこんで、順番入れ替え作業がいらないので便利です。
*/



// 必要な場合は、ここで設定してください。
// <PDFで保存するのオプション設定>
var saveOpts = new PDFSaveOptions();
saveOpts.compatibility = PDFCompatibility.ACROBAT8; 	// PDFバージョン
saveOpts.preserveEditability = false;							// Illustratorの編集機能を保持
saveOpts.generateThumbnails = true;						// サムネールを埋め込み
saveOpts.optimization = false;									// web表示用に最適化
saveOpts.viewAfterSaving = false;								// 保存後PDFファイルを表示
saveOpts.acrobatLayers = false;								// 上位レベルのレイヤーからAcrobat

// --------------------------------------------------------------------------------------------

// いちばん上の階層にあるレイヤーを保持する配列
var rootLayers;

// PDFの保存先を指定
var destFolder = Folder.selectDialog( 'PDFファイルの保存先を指定してください。\nその場所に「[連番]_[レイヤー名].pdf」という名前で保存されます。');


var targetDocument = activeDocument;

// 上から順に
var currentLayerIndex = 0;
setRootLayers();
var layerCount = rootLayers.length;
for (var i = layerCount - 1; i >= 0; i-- ) 
{
		var targetLayer = rootLayers[i];
		
		deleteAllUnlockedLayersButThis( rootLayers, targetLayer );
		
		if( !targetLayer.visible ) targetLayer.visible = true;
		
		// 接頭の連番３桁にする
		var preNum ="000"+String(currentLayerIndex+1);
		preNum = preNum.substr (preNum.length-3, 3);
		// ファイル名
		var _filename = preNum+"_"+targetLayer.name;
		// 保存先のフルパス
		var _path = destFolder+"/"+_filename;
		// PDFで保存
		saveFileToPDF( _path );
		
		// レイヤーを消す前に戻る
		app.undo();
		// 一度保存した後、アンドゥしてもrootLayers参照が切れてしまうのでここで毎回設定する
		setRootLayers();
		
		currentLayerIndex++;
}

alert("PDFの書き出しを完了しました");

// --------------------------------------------------------------------------------------------
	
// いちばん上の階層にあるレイヤーをrootLayersに保持する(ロックされてるのは除外)
function setRootLayers()
{
		// 初期化
		rootLayers = new Array();
		
		var layerCount = targetDocument.layers.length;
		for (var i = layerCount - 1; i >= 0; i-- ) 
		{
				var targetLayer = targetDocument.layers[i];
				if ( ( targetLayer.parent == targetDocument ) && ( !targetLayer.locked ) )
				{
						rootLayers.push(targetLayer);
				}
		}
		// $.write( vLayers.length );
}

//　PDFで保存
function saveFileToPDF ( dest ) 
{
		var saveName = new File ( dest );
		targetDocument.saveAs( saveName, saveOpts );
		// $.writeln(saveName+"を保存しました" );
}

// 第一引数の配列の中にあるレイヤーのうち、例外レイヤーでないやつを消去
function deleteAllUnlockedLayersButThis( _layers, _exception )
{
		for (var i = _layers.length - 1; i >= 0; i-- ) 
		{
				var targetLayer = _layers[i];
				if ( targetLayer != _exception )
				{
						// TODO:（なぜか調べる）これやっとかないとapp落ちる!
						if( !targetLayer.visible ) targetLayer.visible = true;
						
						// レイヤー削除
						//$.write( targetLayer+"を消去します" );
						targetLayer.remove();
						//$.writeln( "（消去しました）" );
				}
		}
}



