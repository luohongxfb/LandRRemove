window.__require=function t(e,i,s){function o(a,n){if(!i[a]){if(!e[a]){var r=a.split("/");if(r=r[r.length-1],!e[r]){var h="function"==typeof __require&&__require;if(!n&&h)return h(r,!0);if(c)return c(r,!0);throw new Error("Cannot find module '"+a+"'")}}var l=i[a]={exports:{}};e[a][0].call(l.exports,function(t){return o(e[a][1][t]||t)},l,l.exports,t,e,i,s)}return i[a].exports}for(var c="function"==typeof __require&&__require,a=0;a<s.length;a++)o(s[a]);return o}({BlockManager:[function(t,e,i){"use strict";cc._RF.push(e,"bb25c3QNlNAnI1JtvF0LL2P","BlockManager");var s=["#57a0ec","#fdc904","#ff6160","#7fdec8","#e890cd","#43193d"];cc.Class({extends:cc.Component,properties:{dragBlock:{default:null,type:cc.Node}},onLoad:function(){this.graphics=this.node.getComponent(cc.Graphics),this.dragBlock.active=!1,this.registerListener()},onDestroy:function(){this.unregisterListener()},registerListener:function(){this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this),this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this)},unregisterListener:function(){this.node.off(cc.Node.EventType.TOUCH_START,this.touchStart,this),this.node.off(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this),this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this),this.node.off(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd,this)},start:function(){},update:function(t){D.canTouch?D.gameManager.isGameOver?this.unregisterListener():this.registerListener():this.unregisterListener()},init:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.blocksManager=t,this.blockItem=e;var o=this.blockItem.color;o||(o=s[parseInt(Math.random()*s.length)],this.blockItem.color=o),this.initBlock(o,i)},initBlock:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=this.blocksManager.blockBackStartX+this.blocksManager.lineWidth*(this.blockItem.start+1)+this.blocksManager.back_block_size*this.blockItem.start,s=this.blocksManager.blockBackStartY+this.blocksManager.lineWidth*(e+1)+this.blocksManager.back_block_size*e,o=this.blocksManager.back_block_size*this.blockItem.length+this.blocksManager.lineWidth*(this.blockItem.length-1),c=this.blocksManager.back_block_size,a=this.blocksManager.back_block_size/4;this.graphics.fillColor=cc.Color.WHITE.fromHEX(t),this.node.x=i,this.node.y=s,this.graphics.roundRect(0,0,o,c,a),this.graphics.fill(),this.graphics.strokeColor=cc.Color.WHITE,this.graphics.lineWidth=3;this.graphics.roundRect(5,5,o-10,c-10,this.blocksManager.back_block_size/4),this.graphics.stroke(),this.node.width=o,this.node.height=c},touchStart:function(t){console.log(t.getStartLocation()),this.v_index=this.blockItem.v_index;for(var e=this.blocksManager.matrix01[this.v_index],i=0,s=0,o=this.blockItem.start-1;o>=0&&!e[o];o--)i+=this.blocksManager.lineWidth+this.blocksManager.back_block_size;for(o=this.blockItem.start+this.blockItem.length;o<this.blocksManager.matrixH&&!e[o];o++)s+=this.blocksManager.lineWidth+this.blocksManager.back_block_size;this.nodeStartX=this.blocksManager.blockBackStartX+this.blocksManager.lineWidth*(this.blockItem.start+1)+this.blocksManager.back_block_size*this.blockItem.start,this.nodeLeftMaxDistance=i,this.nodeRightMaxDistance=s},touchMove:function(t){console.log(t);var e=this.node.x;e+t.getDeltaX()<this.nodeStartX+this.nodeRightMaxDistance&&e+t.getDeltaX()>this.nodeStartX-this.nodeLeftMaxDistance?this.node.x=e+t.getDeltaX():e+t.getDeltaX()>=this.nodeStartX+this.nodeRightMaxDistance?(this.node.x=this.nodeStartX+this.nodeRightMaxDistance,console.log("\u8d85\u51fa\u53f3\u8fb9\u8303\u56f4")):e+t.getDeltaX()<=this.nodeStartX-this.nodeLeftMaxDistance&&(console.log("\u8d85\u51fa\u5de6\u8fb9\u8303\u56f4"),this.node.x=this.nodeStartX-this.nodeLeftMaxDistance)},touchEnd:function(t){console.log(t);var e=(this.node.x-this.blocksManager.blockBackStartX)%(this.blocksManager.lineWidth+this.blocksManager.back_block_size),i=parseInt((this.node.x-this.blocksManager.blockBackStartX)/(this.blocksManager.lineWidth+this.blocksManager.back_block_size));if(e-this.blocksManager.lineWidth>this.blocksManager.back_block_size/2&&i++,this.node.x=this.blocksManager.blockBackStartX+this.blocksManager.lineWidth*(i+1)+this.blocksManager.back_block_size*i,i!=this.blockItem.start){var s=this.blockItem.start;this.blockItem.start=i,console.log("this.blockItem.start:"+this.blockItem.start);for(var o=0;o<this.blockItem.length;o++)this.blocksManager.matrix01[this.v_index][s+o]=0;for(o=0;o<this.blockItem.length;o++)this.blocksManager.matrix01[this.v_index][this.blockItem.start+o]=1;this.blocksManager.matrix[this.v_index][this.blockItem.start]=this.blockItem,this.blocksManager.matrix[this.v_index][s]=null,D.canTouch=!1;var c=function(){D.needMoveUp&&(D.blocksManager.matrixMoveUp(),D.needMoveUp=!1)};D.needMoveUp=!0,D.blocksManager.findCanDrop(c)||D.blocksManager.findCanRemoveRow(c)}},canDrop:function(t){this.v_index=this.blockItem.v_index;var e=!1,i=0,s=null;if(this.v_index){e=!0;for(var o=this.v_index-1;o>=0;o--){for(var c=0;c<this.blockItem.length;c++)if(this.blocksManager.matrix01[o][this.blockItem.start+c]){e=!1;break}if(!e)break;i++}if(i){var a={isDone:!1};s=cc.moveTo(.3,cc.v2(this.node.x,D.blocksManager.blockBackStartY+this.blocksManager.lineWidth+(this.v_index-i)*(this.blocksManager.lineWidth+this.blocksManager.back_block_size))).easing(cc.easeCubicActionIn());var n=cc.moveBy(.1,cc.v2(0,.1*this.blocksManager.back_block_size)).easing(cc.easeCubicActionOut()),r=cc.moveBy(.1,cc.v2(0,.1*-this.blocksManager.back_block_size)).easing(cc.easeCubicActionIn());s=cc.sequence(s,cc.repeat(cc.sequence(n,r),2));var h=cc.callFunc(function(t){a.isDone=!0},this);this.node.runAction(cc.sequence(s,h)),D.preActions.push(a),D.actionEndCallback=t,D.isCanListenActions=!0,this.blocksManager.matrix[this.v_index-i][this.blockItem.start]=this.blockItem,this.blocksManager.matrix[this.v_index][this.blockItem.start]=null,this.blockItem.v_index=this.blockItem.v_index-i;for(o=0;o<this.blockItem.length;o++)this.blocksManager.matrix01[this.v_index][this.blockItem.start+o]=0;for(o=0;o<this.blockItem.length;o++)this.blocksManager.matrix01[this.v_index-i][this.blockItem.start+o]=1}}return s},blockTwinkle:function(t){var e=cc.moveBy(.2,cc.v2(.2*this.blocksManager.back_block_size,0)).easing(cc.easeCubicActionOut()),i=cc.moveBy(.2,cc.v2(.2*-this.blocksManager.back_block_size,0)).easing(cc.easeCubicActionIn()),s={isDone:!1},o=cc.callFunc(function(t){this.node.destroy(),s.isDone=!0},this),c=cc.sequence(cc.repeat(cc.sequence(e,i),2),o);return this.node.runAction(c),D.preActions.push(s),D.actionEndCallback=t,D.isCanListenActions=!0,c},moveUp:function(t){this.v_index=this.blockItem.v_index;var e=cc.moveTo(.3,cc.v2(this.node.x,D.blocksManager.blockBackStartY+this.blocksManager.lineWidth+(this.v_index+1)*(this.blocksManager.lineWidth+this.blocksManager.back_block_size))).easing(cc.easeCubicActionOut()),i={isDone:!1},s=cc.callFunc(function(t){i.isDone=!0},this);this.node.runAction(cc.sequence(e,s)),D.preActions.push(i),D.actionEndCallback=t,D.isCanListenActions=!0,this.blocksManager.matrix[this.v_index+1]||(this.blocksManager.matrix[this.v_index+1]=[],this.blocksManager.matrix01[this.v_index+1]=[]),this.blocksManager.matrix[this.v_index+1][this.blockItem.start]=this.blockItem,this.blocksManager.matrix[this.v_index][this.blockItem.start]=null,this.blockItem.v_index=this.blockItem.v_index+1;for(var o=0;o<this.blockItem.length;o++)this.blocksManager.matrix01[this.v_index][this.blockItem.start+o]=0;for(o=0;o<this.blockItem.length;o++)this.blocksManager.matrix01[this.v_index+1][this.blockItem.start+o]=1;return e},moveDown:function(t,e){this.v_index=this.blockItem.v_index;var i=cc.moveTo(.3,cc.v2(this.node.x,D.blocksManager.blockBackStartY+this.blocksManager.lineWidth+(this.v_index-e)*(this.blocksManager.lineWidth+this.blocksManager.back_block_size))).easing(cc.easeCubicActionOut()),s={isDone:!1},o=cc.callFunc(function(t){s.isDone=!0},this);this.node.runAction(cc.sequence(i,o)),D.preActions.push(s),D.actionEndCallback=t,D.isCanListenActions=!0,this.blocksManager.matrix[this.v_index-e][this.blockItem.start]=this.blockItem,this.blocksManager.matrix[this.v_index][this.blockItem.start]=null,this.blockItem.v_index=this.blockItem.v_index-e;for(var c=0;c<this.blockItem.length;c++)this.blocksManager.matrix01[this.v_index][this.blockItem.start+c]=0;for(c=0;c<this.blockItem.length;c++)this.blocksManager.matrix01[this.v_index-e][this.blockItem.start+c]=1}}),cc._RF.pop()},{}],BlocksManager:[function(t,e,i){"use strict";cc._RF.push(e,"c5622GKJ0dDmrCZGXgNk69o","BlocksManager");t("./Utils");var s=cc.winSize;cc.Class({extends:cc.Component,properties:{blockPref:{default:null,type:cc.Prefab}},onLoad:function(){this.graphics=this.node.getComponent(cc.Graphics),D.blocksManager=this,this.matrix=[],this.matrix01=[]},onDestroy:function(){console.log("onDestroy")},start:function(){},update:function(t){if(D.isCanListenActions&&D.actionEndCallback&&D.preActions&&D.preActions.length){for(var e=0;e<D.preActions.length;e++){var i=D.preActions[e];if(i&&!i.isDone)return}var s=D.actionEndCallback;D.actionEndCallback=null,D.preActions=[],D.isCanListenActions=!1,s()}this.isMatrixEmpty()&&this.matrixMoveUp()},initMatrix:function(t,e){this.matrixH=t,this.matrixV=e,this.initParam(),this.getSavedBlocks(),this.startNewgame()},initParam:function(){this.windowPaddingLeftAndRight=.12*s.width/2,this.hintLineHeight=.1*s.width/3,this.hintLinePaddingTopAndBottom=this.hintLineHeight/2,this.hintLineInnerPaddingTopAndBottom=this.hintLineHeight/6,this.whiteBackPadding=[.1*s.width/3,.1*s.width/3,.1*s.width/3,this.hintLineHeight+2*this.hintLinePaddingTopAndBottom],this.lineWidth=4,this.back_block_size=(s.width-2*this.windowPaddingLeftAndRight-this.whiteBackPadding[0]-this.whiteBackPadding[2]-this.lineWidth*(this.matrixH+1))/this.matrixH,this.matrixWidth=this.back_block_size*this.matrixH+this.lineWidth*(this.matrixH+1),this.matixHeight=this.back_block_size*this.matrixV+this.lineWidth*(this.matrixV+1),this.whiteBackWidth=s.width-2*this.windowPaddingLeftAndRight,this.whiteBackHeight=this.matixHeight+this.whiteBackPadding[1]+this.whiteBackPadding[3],this.whiteBackStartX=this.windowPaddingLeftAndRight,this.whiteBackStartY=(s.height-this.whiteBackHeight)/2,this.blockBackStartX=this.whiteBackStartX+this.whiteBackPadding[0],this.blockBackStartY=this.whiteBackStartY+this.whiteBackPadding[3],D.blocks_relate_top=(s.height-this.whiteBackHeight)/2},startNewgame:function(){if(this.graphics.clear(),this.drawBlockBackground(),this.matrix){for(var t=0;t<this.matrix.length;t++)if(this.matrix[t])for(var e=0;e<this.matrix[t].length;e++){var i=this.matrix[t][e];i&&this.randomBlockNode(i,t)}this.preRandomRow(!1)}else this.matrix=[],this.matrix01=[],this.randomRow(),this.randomRowNode(0),this.randomRowDependOnBeofore(this.matrix01[0]),this.randomRowNode(1),this.preRandomRow(),this.saveBlocks()},getSavedBlocks:function(){this.matrix=JSON.parse(cc.sys.localStorage.getItem("matrix")),this.matrix01=JSON.parse(cc.sys.localStorage.getItem("matrix01")),this.preBlocks=JSON.parse(cc.sys.localStorage.getItem("preBlocks")),this.preBlocks01=JSON.parse(cc.sys.localStorage.getItem("preBlocks01"))},saveBlocks:function(){for(var t=[],e=[],i=0;i<this.matrixV;i++){var s=[],o=[];if(this.matrix[i])for(var c=0;c<this.matrixH;c++){var a=this.matrix[i][c];a&&(s[c]={start:a.start,v_index:a.v_index,length:a.length,color:a.color}),o[c]=this.matrix01[i][c]}t[i]=s,e[i]=o}cc.sys.localStorage.setItem("matrix",JSON.stringify(t)),cc.sys.localStorage.setItem("matrix01",JSON.stringify(e)),cc.sys.localStorage.setItem("preBlocks",JSON.stringify(this.preBlocks)),cc.sys.localStorage.setItem("preBlocks01",JSON.stringify(this.preBlocks01))},drawBlockBackground:function(){this.graphics.fillColor=cc.Color.WHITE,this.graphics.roundRect(this.whiteBackStartX,this.whiteBackStartY,this.whiteBackWidth,this.whiteBackHeight,10),this.graphics.fill(),this.graphics.fillColor=cc.Color.WHITE.fromHEX("#e2687f"),this.graphics.rect(this.blockBackStartX,this.blockBackStartY,this.matrixWidth,this.matixHeight),this.graphics.fill();for(var t=!0,e=0;e<this.matrixV;e++)for(var i=0;i<this.matrixH;i++)t?(this.graphics.fillColor=cc.Color.WHITE.fromHEX("#e48ba1"),t=!1):(this.graphics.fillColor=cc.Color.WHITE.fromHEX("#f38ca1"),t=!0),this.graphics.rect(this.blockBackStartX+this.lineWidth*(i+1)+this.back_block_size*i,this.blockBackStartY+this.lineWidth*(e+1)+this.back_block_size*e,this.back_block_size,this.back_block_size),this.graphics.fill();this.graphics.fillColor=cc.Color.WHITE.fromHEX("#d5e0e6"),this.graphics.roundRect(this.blockBackStartX,this.whiteBackStartY+this.hintLinePaddingTopAndBottom,this.matrixWidth,this.hintLineHeight,this.hintLineHeight/2),this.graphics.fill()},randomRow:function(){for(var t=D.gameManager.diffDegreeNumber>1?4:3,e=3+parseInt(6*Math.random()),i=[],s=[],o=0;o<e;o++)for(;;){var c=parseInt(Math.random()*this.matrixH);if(!s[c]){s[c]=1;break}}var a=0;for(o=0;o<this.matrixH;o++)s[o]?o==this.matrixH-1&&this.matrixH-a>0&&(i=this.divideBlock({start:a,length:this.matrixH-a},i,t)):(o-a>0&&(i=this.divideBlock({start:a,length:o-a},i,t)),a=o+1);this.preBlocks=i,this.preBlocks01=s},divideBlock:function(t,e,i){if(t.length>=i){for(var s=t.length,o=t.start;s>i;)i=this.matrixH-o<i?this.matrixH-o:i,length=parseInt(Math.random()*i+1),e[o]={start:o,length:length},o+=length,s-=length;s>0&&(e[o]={start:o,length:s})}else e[t.start]=t;return e},randomRowNode:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=this.preBlocks,i=0;i<e.length;i++)e[i]&&(e[i]=this.randomBlockNode(e[i],t));this.matrix[t]=e,this.matrix01[t]=this.preBlocks01},randomBlockNode:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=cc.instantiate(this.blockPref);return this.node.addChild(i),i.getComponent("BlockManager").init(this,t,e),t.node=i,t.v_index=e,t},randomRowDependOnBeofore:function(t){if(t){for(var e=D.gameManager.diffDegreeNumber>1?4:3,i=[],s=[],o=0,c=3+parseInt(6*Math.random()),a=0;o<this.matrixH&&a<c;)if(t[o]){e=this.matrixH-o<e?this.matrixH-o:c-a<e?c-a:e,length=parseInt(Math.random()*e+1),i[o]={start:o,length:length};for(var n=0;n<length;n++)s[o+n]=1;o+=length,a+=length}else o++;this.preBlocks=i,this.preBlocks01=s}},preRandomRow:function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&this.randomRow(),this.graphics.clear(),this.drawBlockBackground(),this.graphics.fillColor=cc.Color.WHITE.fromHEX("#86afb1");for(var t=0;t<this.preBlocks.length;t++)this.preBlocks[t]&&(this.graphics.roundRect(this.blockBackStartX+this.lineWidth*(this.preBlocks[t].start+1)+this.back_block_size*this.preBlocks[t].start,this.whiteBackStartY+this.hintLinePaddingTopAndBottom+this.hintLineInnerPaddingTopAndBottom,this.lineWidth*(this.preBlocks[t].length-1)+this.back_block_size*this.preBlocks[t].length,this.hintLineHeight-2*this.hintLineInnerPaddingTopAndBottom,(this.hintLineHeight-2*this.hintLineInnerPaddingTopAndBottom)/2),this.graphics.fill())},matrixMoveUp:function(){var t=this;if(this.isMatrixFull())D.gameManager.gameOver();else{var e=[];console.log("\u5f00\u59cb\u77e9\u9635\u4e0a\u79fb");var i=function(){console.log("\u5f00\u59cb\u968f\u673a\u65b0\u7684\u4e00\u884c"),t.randomRowNode(0),t.preRandomRow(),t.findCanDrop(function(){D.canTouch=!0,t.saveBlocks()})};if(this.isMatrixEmpty())i();else for(var s=this.matrix.length-1;s>=0;s--)for(var o=0;o<this.matrix[s].length;o++)if(this.matrix[s][o]){var c=this.matrix[s][o].node.getComponent("BlockManager").moveUp(i);e.push(c)}}},findCanRemoveRow:function(t){for(var e=this,i=[],s=0;s<this.matrix01.length;s++){for(var o=!0,c=0;c<this.matrixH;c++)if(!this.matrix01[s][c]){o=!1;break}o&&i.push(s)}var a=function(){e.matrixMoveDown(t,i),D.gameManager.refreshScore(i.length)};if(i.length>0){console.log("\u5f00\u59cb\u6d88\u9664");for(s=0;s<i.length;s++){for(c=0;c<this.matrix[i[s]].length;c++){var n=this.matrix[i[s]][c];n&&n.node.getComponent("BlockManager").blockTwinkle(a)}this.matrix01[i[s]]=[],this.matrix[i[s]]=[]}}else t&&t();return i.length>0},matrixMoveDown:function(t,e){var i=this;if(e){if(this.isMatrixEmpty()||1==e.length&&e[0]>this.getMatrixLastIndex())return void t();for(var s=function(){i.findCanDrop(t)},o=e[0]+1;o<this.matrix.length;o++){for(var c=0,a=0;a<e.length;a++)if(o>e[a])c++;else if(o<e[a])break;if(c)for(var n=0;n<this.matrix[o].length;n++){var r=this.matrix[o][n];r&&r.node.getComponent("BlockManager").moveDown(s,c)}}}},isMatrixEmpty:function(){for(var t=!0,e=0;e<this.matrix01.length;e++){for(var i=0;i<this.matrix01[e].length;i++)if(this.matrix01[e][i]){t=!1;break}if(!t)break}return t},isMatrixFull:function(){var t=!1;if(this.matrix01[this.matrixV-1])for(var e=0;e<this.matrix01[this.matrixV-1].length;e++)if(this.matrix01[this.matrixV-1][e]){t=!0;break}return t},getMatrixLastIndex:function(){for(var t=this.matrix.length-1,e=t;e>=0;e--){for(var i=!1,s=0;s<this.matrix[e].length;s++)if(this.matrix[e][s]){i=!0;break}if(i){t=e;break}}return t},findCanDrop:function(t){var e=this;console.log("\u5f00\u59cb\u80fd\u5426\u4e0b\u843d");var i=this.matrixDrop(0,function(){console.log("\u4e0b\u843d\u52a8\u753b\u7ed3\u675f"),e.findCanRemoveRow(t)});return i&&i.length>0||t&&t(),i.length>0},matrixDrop:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments[1],i=[],s=t;s<this.matrix.length;s++)for(var o=0;o<this.matrix[s].length;o++)if(this.matrix[s][o]){var c=this.matrix[s][o].node.getComponent("BlockManager").canDrop(e);c&&(0,this.matrixDrop(s+1,e),i.push(c))}return i},matrixcanRemoveOrDrop:function(){for(var t=0;t<this.matrix01.length;t++){for(var e=!0,i=0;i<this.matrixH;i++)if(!this.matrix01[t][i]){e=!1;break}if(e)return!0;for(i=0;i<this.matrix[t].length;i++){var s=this.matrix[t][i];if(s)for(var o=!0,c=s.v_index-1;c>=0;c--){for(var a=0;a<s.length;a++)if(this.matrix01[c][s.start+a]){o=!1;break}if(o)return!0}}}return!1}}),cc._RF.pop()},{"./Utils":"Utils"}],BlocksTouchManager:[function(t,e,i){"use strict";cc._RF.push(e,"f167dY8R59LCrdjSLpCTaEV","BlocksTouchManager"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},onDestroy:function(){},start:function(){},update:function(t){},registerTouchEvent:function(){console.log("block touch manager"),this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this),this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this),this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this)},touchStart:function(t){},touchMove:function(t){},touchEnd:function(t){}}),cc._RF.pop()},{}],DiffDegreeManager:[function(t,e,i){"use strict";cc._RF.push(e,"79c4fK52V1DjKIZLrPUAB1Q","DiffDegreeManager");var s=cc.winSize;cc.Class({extends:cc.Component,properties:{desc:{default:null,type:cc.Label},degree:{default:null,type:cc.Label}},onLoad:function(){console.log("onLoad"),this.degreeBack=this.node.getComponent(cc.Graphics),this.textWidth=0},start:function(){},update:function(t){this.textWidth!=this.degree.node.width&&(this.textWidth=this.degree.node.width,this.degree.node.x=this.desc.node.x+this.desc.node.width+15,this.degreeBack.clear(),this.degreeBack.roundRect(-30,this.degree.node.y-this.degree.node.height/2-15,this.degree.node.x+this.degree.node.width+60,this.degree.node.height+30,30),this.degreeBack.fill(),this.degreeBack.stroke())},refresh:function(t){this.degree.string=t,console.log("refresh"),this.node.y=s.height/2-D.blocks_relate_top/2,this.degree.lineHeight=.8*D.blocksManager.back_block_size,this.degree.fontSize=.8*D.blocksManager.back_block_size,this.desc.lineHeight=.4*D.blocksManager.back_block_size,this.desc.fontSize=.4*D.blocksManager.back_block_size}}),cc._RF.pop()},{}],GameManager:[function(t,e,i){"use strict";cc._RF.push(e,"065e106CMZK7oq8jveONqBc","GameManager");var s=cc.winSize,o=[9,12];cc.Class({extends:cc.Component,properties:{diffDegreeNumber:1,scoreNumber:0,diffDegree:{default:null,type:cc.Node},blocksContainer:{default:null,type:cc.Node},gamePlayMethod:{default:null,type:cc.Node},scoreNode:{default:null,type:cc.Label},showGainScoreNode:{default:null,type:cc.Label},gameOverNode:{default:null,type:cc.Label},settingsNode:{default:null,type:cc.Node},popWindowNode:{default:null,type:cc.Node}},onLoad:function(){D.gameManager=this,this.fitScreen(),this.diffDegreeManager=this.diffDegree.getComponent("DiffDegreeManager"),this.blocksManager=this.blocksContainer.getComponent("BlocksManager"),this.scoreNumber=parseInt(cc.sys.localStorage.getItem("score")?cc.sys.localStorage.getItem("score"):0),this.maxScoreNumber=parseInt(cc.sys.localStorage.getItem("maxScore")?cc.sys.localStorage.getItem("maxScore"):0)},start:function(){this.blocksManager.initMatrix(o[0],o[1]),this.diffScore=[10,30,100,200];for(var t=4;t<100;t++)this.diffScore.push(this.diffScore[t-2]+this.diffScore[t-1]);this.showGamePlayMethod(),this.initSetting(),this.scoreNode.node.y=s.height/2-D.blocks_relate_top/2-D.blocksManager.back_block_size/2,this.scoreNode.lineHeight=D.blocksManager.back_block_size,this.scoreNode.fontSize=D.blocksManager.back_block_size,this.showGainScoreNode.lineHeight=D.blocksManager.back_block_size,this.showGainScoreNode.fontSize=.8*D.blocksManager.back_block_size,this.showGainScoreNode.node.active=!1,this.refreshScore(0)},update:function(t){},fitScreen:function(){cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT),cc.view.enableAntiAlias(!0)},initSetting:function(){var t=this,e=this.settingsNode.getComponent(cc.Graphics),i=this.settingsNode.getChildByName("icon"),o=this.settingsNode.getChildByName("text").getComponent(cc.Label);i.width=D.blocksManager.back_block_size,i.height=D.blocksManager.back_block_size,o.fontSize=D.blocksManager.back_block_size/2.5,o.lineHeight=D.blocksManager.back_block_size/2.5;var c=D.blocksManager.back_block_size/3,a=o.fontSize/2,n=i.width+2*c,r=i.height+2*a+o.fontSize+c;this.settingsNode.x=s.width/2-(D.blocksManager.windowPaddingLeftAndRight+c+i.width/2),this.settingsNode.y=-s.height/2+2*a+i.width/2+o.lineHeight;var h=n/4;e.roundRect(-n/2,n/2-r-h,n,r+h,h),e.fill(),this.settingsNode.width=n,this.settingsNode.height=r,o.node.y=-i.width/2-a-o.lineHeight/2,this.settingsNode.on(cc.Node.EventType.TOUCH_START,function(){t.popWindowNode.getComponent("PopWindowManager").show()},this)},refreshScore:function(t){if(this.scoreNumber+=t,this.scoreNode.string=this.scoreNumber,t){this.showGainScoreNode.string=1==t?"+"+this.diffDegreeNumber+"\n\u5f97\u5206":"\u8fde\u51fbx"+t+" \u5f97\u5206+"+this.diffDegreeNumber*Math.pow(2,t-1),this.showGainScoreNode.node.active=!0;var e=cc.callFunc(function(t){this.showGainScoreNode.node.active=!1},this);this.showGainScoreNode.node.runAction(cc.sequence(cc.scaleTo(.4,1.05).easing(cc.easeCubicActionOut()),cc.scaleTo(.4,.9).easing(cc.easeCubicActionIn()),cc.repeat(cc.sequence(cc.scaleTo(.2,1).easing(cc.easeCubicActionOut()),cc.scaleTo(.2,.95).easing(cc.easeCubicActionIn())),2),e))}for(var i=0;i<this.diffScore.length;i++)if(this.scoreNumber<this.diffScore[i]){this.diffDegreeNumber=i+1;break}this.diffDegreeManager.refresh(this.diffDegreeNumber),this.maxScoreNumber=this.maxScoreNumber>this.scoreNumber?this.maxScoreNumber:this.scoreNumber,cc.sys.localStorage.setItem("score",this.scoreNumber),cc.sys.localStorage.setItem("maxScore",this.maxScoreNumber)},showGamePlayMethod:function(){var t=D.blocksManager.back_block_size,e=.6*D.blocksManager.back_block_size;this.gamePlayMethod.getChildByName("start").getComponent(cc.Label).fontSize=t,this.gamePlayMethod.getChildByName("start").getComponent(cc.Label).lineHeight=1.4*t,this.gamePlayMethod.getChildByName("desc").getComponent(cc.Label).fontSize=e,this.gamePlayMethod.getChildByName("desc").getComponent(cc.Label).lineHeight=1.4*e,this.gamePlayMethod.getChildByName("start").y=1.4*t/2,this.gamePlayMethod.getChildByName("desc").y=1.4*-e/2,this.gamePlayMethod.active=!0;var i=cc.callFunc(function(t){this.gamePlayMethod.active=!1},this);this.gamePlayMethod.runAction(cc.sequence(cc.scaleTo(.8,1.05).easing(cc.easeCubicActionOut()),cc.scaleTo(.5,.9).easing(cc.easeCubicActionIn()),cc.repeat(cc.sequence(cc.scaleTo(.2,1).easing(cc.easeCubicActionOut()),cc.scaleTo(.2,.95).easing(cc.easeCubicActionIn())),2),cc.fadeOut(2).easing(cc.easeCubicActionIn()),i))},gameOver:function(){this.gameOverNode.lineHeight=D.blocksManager.back_block_size,this.gameOverNode.fontSize=D.blocksManager.back_block_size,this.gameOverNode.node.active=!0,this.isGameOver=!0;var t=cc.callFunc(function(t){cc.sys.localStorage.removeItem("score"),cc.sys.localStorage.removeItem("matrix"),cc.sys.localStorage.removeItem("matrix01"),cc.sys.localStorage.removeItem("preBlocks"),cc.sys.localStorage.removeItem("preBlocks01"),this.popWindowNode.getComponent("PopWindowManager").show()},this);this.gameOverNode.node.runAction(cc.sequence(cc.scaleTo(.4,1.05).easing(cc.easeCubicActionOut()),cc.scaleTo(.4,.9).easing(cc.easeCubicActionIn()),cc.repeat(cc.sequence(cc.scaleTo(.2,1).easing(cc.easeCubicActionOut()),cc.scaleTo(.2,.95).easing(cc.easeCubicActionIn())),2),t))}}),cc._RF.pop()},{}],Globals:[function(t,e,i){"use strict";cc._RF.push(e,"c8ca1d+G3FMl6+qMMGrEDx4","Globals"),window.D={gameManager:null,blocks_relate_top:0,blocksManager:null,preActions:[],actionEndCallback:null,isCanListenActions:!1,needMoveUp:!1,canTouch:!0},cc._RF.pop()},{}],PopWindowManager:[function(t,e,i){"use strict";cc._RF.push(e,"0b285CZidFKA4XeHj8UV+s5","PopWindowManager");var s=cc.winSize;cc.Class({extends:cc.Component,properties:{descLabel:{default:null,type:cc.Label},scoreLabel:{default:null,type:cc.Label},restartNode:{default:null,type:cc.Node},maxScoreLable:{default:null,type:cc.Label},cancelNode:{default:null,type:cc.Node}},onLoad:function(){var t=this;this.graphics=this.getComponent(cc.Graphics),this.initGameOverPop(),this.node.on(cc.Node.EventType.TOUCH_START,function(t){console.log("\u906e\u7f69\u6355\u83b7\u89e6\u6478"),t.stopPropagation()},this),this.restartNode.on(cc.Node.EventType.TOUCH_START,function(){cc.sys.localStorage.removeItem("score"),cc.sys.localStorage.removeItem("matrix"),cc.sys.localStorage.removeItem("matrix01"),cc.sys.localStorage.removeItem("preBlocks"),cc.sys.localStorage.removeItem("preBlocks01"),cc.director.loadScene("Game"),D.canTouch=!0},this),this.restartNode.on(cc.Node.EventType.TOUCH_MOVE,function(){t.restartNode.opacity=200}),this.restartNode.on(cc.Node.EventType.TOUCH_END,function(){t.restartNode.opacity=250}),this.restartNode.on(cc.Node.EventType.TOUCH_CANCEL,function(){t.restartNode.opacity=250}),this.cancelNode.on(cc.Node.EventType.TOUCH_START,function(){t.node.active=!1},this)},start:function(){},initGameOverPop:function(){this.graphics.fillColor=cc.Color.BLACK.setA(200),this.graphics.rect(0,0,s.width,s.height),this.graphics.fill();var t=[D.blocksManager.back_block_size/2,D.blocksManager.back_block_size],e=D.blocksManager.back_block_size/3*2,i=1.5*D.blocksManager.back_block_size,o=i/2,c=3*D.blocksManager.back_block_size,a=4.5*D.blocksManager.back_block_size,n=.7*D.blocksManager.back_block_size,r=1.6*D.blocksManager.back_block_size,h=.5*D.blocksManager.back_block_size,l=.4*D.blocksManager.back_block_size,d=s.width-4*D.blocksManager.back_block_size,g=r+2*t[1]+c+i+o+e+h+l,k=(s.width-d)/2,b=(s.height-g)/2,m=.5*D.blocksManager.back_block_size;this.graphics.fillColor=cc.Color.WHITE,this.graphics.roundRect(k,b,d,g,m),this.graphics.fill(),this.descLabel.fontSize=e,this.descLabel.lineHeight=e,this.descLabel.node.y=b+g-t[1]-e/2,this.scoreLabel.fontSize=i,this.scoreLabel.lineHeight=i,this.scoreLabel.node.y=b+g-t[1]-e-o-i/2,this.restartNode.y=b+t[1]+r/2+h+l;var f=this.restartNode.getComponent(cc.Graphics);f.roundRect(-a/2,-r/2,a,r,r/2),f.fill(),this.restartNode.width=a,this.restartNode.height=r;var u=this.restartNode.getChildByName("text").getComponent(cc.Label);u.fontSize=n,u.lineHeight=n,this.maxScoreLable.fontSize=l,this.maxScoreLable.lineHeight=l,this.maxScoreLable.node.y=b+t[1]+l/2,this.cancelNode.y=b-t[1],this.cancelNode.width=D.blocksManager.back_block_size,this.cancelNode.height=D.blocksManager.back_block_size},show:function(){this.node.active=!0,this.scoreLabel.string=D.gameManager.scoreNumber,this.maxScoreLable.string="\u5386\u53f2\u6700\u9ad8\u5f97\u5206\uff1a"+D.gameManager.maxScoreNumber}}),cc._RF.pop()},{}],Utils:[function(t,e,i){"use strict";function s(t,e,i,s){t.beginPath(0),t.arc(e-s,i-s,s,0,Math.PI/2),t.lineTo(s,i),t.arc(s,i-s,s,Math.PI/2,Math.PI),t.lineTo(0,s),t.arc(s,s,s,Math.PI,3*Math.PI/2),t.lineTo(e-s,0),t.arc(e-s,s,s,3*Math.PI/2,2*Math.PI),t.lineTo(e,i-s),t.closePath()}cc._RF.push(e,"0faa46Iq15CyL0I/6lg8Y9k","Utils"),Object.defineProperty(i,"__esModule",{value:!0}),i.drawRoundRect=function(t,e,i,o,c,a,n){if(2*a>o||2*a>c)return!1;t.save(),t.translate(e,i),s(t,o,c,a),t.fillStyle=n||"#000",t.fill(),t.restore()},i.drawRoundRectPath=s,cc._RF.pop()},{}]},{},["BlockManager","BlocksManager","BlocksTouchManager","DiffDegreeManager","GameManager","Globals","PopWindowManager","Utils"]);