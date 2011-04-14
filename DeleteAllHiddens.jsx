/*
	-----------------------------------------------------------------------------------------
	DeleteAllHiddens ( Items, Groups, Layers )
	Javascript for Adobe Illustrator CS
		
	auther 	: TERADA Naokazu
	date		: 2009.06

	http://kocoha.net/
	http://karappo.net/
	-----------------------------------------------------------------------------------------
	
	description ( in Japanese ):
	
	非表示状態のレイヤーやアイテム・グループをきれいに消去する
	PDF書き出しの前などに使う

	＜処理の流れ＞
	・	非表示状態のアイテムの消去
	・	非表示状態のレイヤーの消去
	・	子要素がなくなったレイヤーの消去（クリーンナップ）
	
*/

var targetDocument = activeDocument;

var deletedItemCount = 0;
var deletedLayerCount = 0;
var cleanupLayerCount = 0;

deleteUnvisiblePageItems();						// 非表示状態のアイテムの消去
deleteUnvisibleLayers( targetDocument );	// 非表示状態のレイヤーの消去
deleteNoItemLayers( targetDocument );		// 子要素がなくなったレイヤーの消去

alert( 	"非表示アイテム（グループ）の削除："+deletedItemCount+"\n"+
			"非表示レイヤーの削除："+deletedLayerCount+"\n"+
			"子要素がなくなったレイヤーの削除："+cleanupLayerCount	);

// --------------------------------------------------------------------------------------------

// 非表示状態のアイテムを消去
function deleteUnvisiblePageItems()
{
		//$.writeln( "deleteUnvisiblePageItems---------------------");
		var _targetArray = targetDocument.pageItems;
		var count = _targetArray.length;
		
		// 下から上に昇っていく順。
		// こうしておかないと、非表示グループ内の非表示オブジェクトがあった場合に、
		// 先にグループが消されて参照が切れる
		for (var i = count - 1; i >= 0; i-- ) 
		{
				var _target = _targetArray[i];
				if( _target.hidden )
				{
						// アイテム削除
						//$.write( _target+"を消去します" );
						_target.remove();
						//$.writeln( "（消去しました）" );
						deletedItemCount++;
				}
		}
}

// 非表示状態のレイヤーを消去する( 再帰関数 )
function deleteUnvisibleLayers( _target )
{
		//$.writeln( "deleteUnvisibleLayers---------------------");
		var layerCount = _target.layers.length;
		
		for (var i = layerCount - 1; i >= 0; i-- ) 
		{
				var targetLayer = _target.layers[i];

				if ( !targetLayer.visible )
				{
						// 一度表示状態にしないと消せない
						targetLayer.visible = true;
						
						// レイヤー削除
						//$.write( targetLayer+"を消去します" );
						targetLayer.remove();
						//$.writeln( "（消去しました）" );
						deletedLayerCount++;
				}
				else
				{
					// 下の階層もチェック（再帰）
					deleteUnvisibleLayers( targetLayer );
				}
		}
}

// 子要素が何もないレイヤーを消去する( 再帰関数 )
function deleteNoItemLayers( _target )
{
		//$.writeln( "deleteNoItemLayers---------------------");
		var layerCount = _target.layers.length;
		
		for (var i = layerCount - 1; i >= 0; i-- ) 
		{
				var targetLayer = _target.layers[i];

				if ( targetLayer.layers.length == 0 )
				{
						if ( targetLayer.pageItems.length == 0 )
						{
								// レイヤー削除
								//$.write( targetLayer+"を消去します" );
								targetLayer.remove();
								//$.writeln( "（消去しました）" );
								cleanupLayerCount++;
						}
				}
				else
				{
					// 下の階層もチェック（再帰）
					deleteNoItemLayers( targetLayer );
				}
		}
}
