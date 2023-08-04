(function(){
    var script = {
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "mobileMipmappingEnabled": false,
 "height": "100%",
 "id": "rootPlayer",
 "scrollBarVisible": "rollOver",
 "vrPolyfillScale": 0.5,
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC"
 ],
 "layout": "absolute",
 "backgroundPreloadEnabled": true,
 "horizontalAlign": "left",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "class": "Player",
 "minHeight": 20,
 "scrollBarWidth": 10,
 "defaultVRPointer": "laser",
 "downloadEnabled": false,
 "scripts": {
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getKey": function(key){  return window[key]; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "existsKey": function(key){  return key in window; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); }
 },
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 20,
 "paddingLeft": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "mouseWheelEnabled": true,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Player468"
 },
 "paddingTop": 0,
 "gap": 10,
 "desktopMipmappingEnabled": false,
 "definitions": [{
 "initialPosition": {
  "yaw": 172.28,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC6D26A8_BFB6_C386_41CA_9E328454726E",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "E Auto Analyzer",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B65FA856_AD99_43C9_41D3_0ACF290D4B23_t.jpg",
 "id": "video_B65FA856_AD99_43C9_41D3_0ACF290D4B23",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B65FA856_AD99_43C9_41D3_0ACF290D4B23.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 179.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACBFA5D2_BFB6_C18A_41DE_8FF72556ECE2",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "E Ngp",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B60BA92C_AD9F_455A_41DC_C23DBE73BF33_t.jpg",
 "id": "video_B60BA92C_AD9F_455A_41DC_C23DBE73BF33",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B60BA92C_AD9F_455A_41DC_C23DBE73BF33.mp4"
 }
},
{
 "initialPosition": {
  "yaw": -72.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACB4F5C5_BFB6_C18E_41E2_5D1C101913C2",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": -65.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ABB9D701_BFB6_C286_41DA_868574401064",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_B54A4C61_AD9A_C3CA_41C5_5DD12AA2F035",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7BF54B6_BFB6_C78A_41B9_3EC3F82CD447"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window45494"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "label": "A Auto Analyzer 2",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B3721249_A6EB_C28E_41E0_9DA86A5934C5_t.jpg",
 "id": "video_B3721249_A6EB_C28E_41E0_9DA86A5934C5",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B3721249_A6EB_C28E_41E0_9DA86A5934C5.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 4.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC59F68F_BFB6_C39A_41D9_FD73B7FF477D",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": -167.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_A71A7500_BFB6_C686_41D0_1EAF1F3DBC1B",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 175.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC7606B5_BFB6_C38E_41D7_27C772A209DC",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "items": [
  {
   "media": "this.video_AEBD2E2A_BF4D_429A_41E7_17776333A6ED",
   "start": "this.viewer_uidA7BAF4B4_BFB6_C78E_41D9_788382A6918EVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_A7BB24B4_BFB6_C78E_41D8_A7ACBF5A667F, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_A7BB24B4_BFB6_C78E_41D8_A7ACBF5A667F, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7BAF4B4_BFB6_C78E_41D9_788382A6918EVideoPlayer)",
   "player": "this.viewer_uidA7BAF4B4_BFB6_C78E_41D9_788382A6918EVideoPlayer"
  }
 ],
 "id": "playList_A7BB24B4_BFB6_C78E_41D8_A7ACBF5A667F",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77",
 "label": "CLF I a",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -98.67,
   "panorama": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -34.83
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_83768908_9D5E_FB4F_41B3_CF4FB44419B9",
  "this.overlay_83206684_9D52_4947_41D1_A6D53576D27D"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90631E96_9D55_D943_41E1_075253E49390",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90631E96_9D55_D943_41E1_075253E49390_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EF635_9D52_4940_41DE_62177C61378C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EF635_9D52_4940_41DE_62177C61378C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_9062F88A_9D55_D943_4192_62948FF5C8D9",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907E7820_9D55_F940_41D6_BCB778E30947",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E7820_9D55_F940_41D6_BCB778E30947_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.video_BCDD06C7_A6E7_4382_41E4_2BF18287717A",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 19, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 19)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B338FE47_A6E9_C282_41AC_577A1523BAD1",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 20, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 20)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B2149343_A6EA_C282_41D4_D694499D3918",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 21, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 21)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B359B683_A6EB_4382_41C6_34C05D91091F",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 22, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 22)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B3721249_A6EB_C28E_41E0_9DA86A5934C5",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 23, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 23)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BCCD912F_A69F_BE82_41E1_EF7E6F69FE14",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 24, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 24)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BC41B6D8_A699_438E_4192_9F157AD863FC",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 25, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 25)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BC45EA22_A69B_4283_41DA_B72C250FAB14",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 26, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 26)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BFA566A6_A699_4382_41A1_9B21EACB179D",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 27, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 27)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BE821DB5_A6A6_C186_41D4_6F32A2D8E022",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 28, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 28)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BC17D089_A2A9_435A_41C0_301F093CEC2E",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 29, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 29)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BD82AAE9_A2A7_C4DA_41E2_E00AC1A3C866",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 30, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 30)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BB37156B_A2A6_CDDE_41DD_94F2AB6288FE",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 31, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 31)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B4367164_AD9A_C5C9_41D2_450BAD844F0F",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 32, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 32)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B5529801_AD9B_434A_41C9_C4FBA7E9731A",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 33, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 33)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B5B8878C_AD99_4D59_41CB_74A18FDE79DE",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 34, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 34)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 34, 35)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B5FDB1D3_AD9B_44CE_41E1_00270236067C",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 35, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 35)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B65FA856_AD99_43C9_41D3_0ACF290D4B23",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 36, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 36)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B60BA92C_AD9F_455A_41DC_C23DBE73BF33",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 37, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 37)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_AE445E03_BF55_428A_41E6_975DE2211CA9",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 38, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 38)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 38, 39)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B09A8371_BF4B_4286_41C9_A7817D0DFB3C",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 39, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 39)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 39, 40)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_AEBD2E2A_BF4D_429A_41E7_17776333A6ED",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 40, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 40)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_ADECE224_BF4B_428E_41E1_CC5812763614",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 41, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 41)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_AB405B64_BFB5_428E_41D8_ADB2C6070666",
   "end": "this.trigger('tourEnded')",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.mainPlayList, 42, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.mainPlayList, 42)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.mainPlayList, 42, 0)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551",
 "label": "Smoke NGP Laboratory copy",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -163.53,
   "panorama": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -68.16
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_872B7FE6_9DF6_36C3_41CC_20A899D67267",
  "this.overlay_B13595F0_A074_565A_41C6_37776E09D60F"
 ]
},
{
 "label": "A Karl Fischer",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_ADECE224_BF4B_428E_41E1_CC5812763614_t.jpg",
 "id": "video_ADECE224_BF4B_428E_41E1_CC5812763614",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_ADECE224_BF4B_428E_41E1_CC5812763614.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 81.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACFA461E_BFB6_C2BA_41E6_A78FD1F16DDB",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "C Gc-Fid",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BC17D089_A2A9_435A_41C0_301F093CEC2E_t.jpg",
 "id": "video_BC17D089_A2A9_435A_41C0_301F093CEC2E",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BC17D089_A2A9_435A_41C0_301F093CEC2E.mp4"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4",
 "label": "ICP Room",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 60.92,
   "panorama": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -40.37
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_BCA9E8D1_9EBE_3AC1_41D9_CFA6E5D3F634",
  "this.overlay_BDA80F42_9EBE_D7C3_41DA_6B3F3EA2940F",
  "this.overlay_BD77A168_9EBE_4BCF_41D7_290CAFAADB38"
 ]
},
{
 "items": [
  {
   "media": "this.video_B09A8371_BF4B_4286_41C9_A7817D0DFB3C",
   "start": "this.viewer_uidA7B6B4B2_BFB6_C78A_41C5_EED1745FFAA3VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACEF7130_BF4D_3E86_41D1_6064725058A5, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACEF7130_BF4D_3E86_41D1_6064725058A5, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7B6B4B2_BFB6_C78A_41C5_EED1745FFAA3VideoPlayer)",
   "player": "this.viewer_uidA7B6B4B2_BFB6_C78A_41C5_EED1745FFAA3VideoPlayer"
  }
 ],
 "id": "playList_ACEF7130_BF4D_3E86_41D1_6064725058A5",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_B338FE47_A6E9_C282_41AC_577A1523BAD1",
   "start": "this.viewer_uidA7B724B2_BFB6_C78A_41D4_A641592656C2VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACF3812F_BF4D_3E9A_41D3_05EDDD9E4E3C, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACF3812F_BF4D_3E9A_41D3_05EDDD9E4E3C, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7B724B2_BFB6_C78A_41D4_A641592656C2VideoPlayer)",
   "player": "this.viewer_uidA7B724B2_BFB6_C78A_41D4_A641592656C2VideoPlayer"
  }
 ],
 "id": "playList_ACF3812F_BF4D_3E9A_41D3_05EDDD9E4E3C",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_90631E96_9D55_D943_41E1_075253E49390_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3",
 "label": "Route 2",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -126.84,
   "panorama": "this.panorama_90631E96_9D55_D943_41E1_075253E49390",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 161.47
  },
  {
   "yaw": 176.57,
   "panorama": "this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 12.53
  },
  {
   "yaw": -68.16,
   "panorama": "this.panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -163.53
  },
  {
   "yaw": -9.09,
   "panorama": "this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -90.09
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_89595998_9D7D_DB4F_4195_D8A67DDAD728",
  "this.overlay_8827B028_9D7E_494F_41E1_17B1E069DD53",
  "this.overlay_89928C2C_9D7E_7940_4196_DD687FD50F07",
  "this.overlay_89C9BE70_9D7E_39DF_41E1_BEC8E105AC6B"
 ]
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08",
 "label": "Chemical Laboratory II",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 0.12,
   "panorama": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 178.97
  },
  {
   "yaw": -95.66,
   "panorama": "this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -81.3
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_BD97799D_9D56_DB40_41E2_EE3E9E43E0D0",
  "this.overlay_BD77B2C3_9D52_CEC0_41E2_7FC72A1E6D46"
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "items": [
  {
   "media": "this.video_BB37156B_A2A6_CDDE_41DD_94F2AB6288FE",
   "start": "this.viewer_uidA7BCD4B5_BFB6_C78E_41D4_6A5CAB367D3AVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACE4F134_BF4D_3E8E_41DC_8218407C3E08, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACE4F134_BF4D_3E8E_41DC_8218407C3E08, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7BCD4B5_BFB6_C78E_41D4_6A5CAB367D3AVideoPlayer)",
   "player": "this.viewer_uidA7BCD4B5_BFB6_C78E_41D4_6A5CAB367D3AVideoPlayer"
  }
 ],
 "id": "playList_ACE4F134_BF4D_3E8E_41DC_8218407C3E08",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_8B056FEC_9DD6_36C7_419A_BA038344555B",
 "headerPaddingBottom": 10,
 "titleFontSize": "3vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 12,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#000000",
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "bodyBorderColor": "#000000",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#000099",
  "#000099",
  "#000099"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 5,
 "closeButtonIconHeight": 12,
 "shadow": true,
 "headerPaddingRight": 10,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "Ignition Propensity Tester",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#FFFFFF",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "bold",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.htmlText_8B06AFEC_9DD6_36C7_41E2_57B393DB75C1"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0.5,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 5,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 5,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window14709"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0.5,
 "paddingTop": 0,
 "paddingBottom": 0,
 "bodyBorderSize": 0,
 "scrollBarOpacity": 0.5
},
{
 "initialPosition": {
  "yaw": -18.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_A71114F3_BFB6_C78B_419A_6FD46807E2E5",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_BD5884F1_A2A9_CCCA_41D6_DCDFEAFFF191",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7B244B0_BFB6_C786_41E7_AC1B3CFAF006"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window37369"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "initialPosition": {
  "yaw": 98.7,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AB8D56CF_BFB6_C39A_41D5_363A8695C2E9",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": -6.18,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC07D62A_BFB6_C29A_41BA_D0146A7DB08A",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "id": "MainViewerVideoPlayer",
 "viewerArea": "this.MainViewer",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 139.63,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC8E8585_BFB6_C18E_41E2_A1503C2DC1A3",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": -170.6,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC22364F_BFB6_C29A_41E7_B567F25DEB43",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_BCA56488_A2A7_4359_41D8_6BAB8500D113",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7BCD4B5_BFB6_C78E_41D4_6A5CAB367D3A"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window39246"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_AF8A37E2_BF55_418A_41D0_7DCA36663156",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColor": [],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "titleFontColor": "#000000",
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7B9E4B2_BFB6_C78A_41E3_63AAA1249FE4"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonRollOverBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "titlePaddingRight": 5,
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window4313"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C",
 "label": "CLF I b",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 173.82,
   "panorama": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 30.71
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_822CCB7D_9D52_7FC1_41B6_0742F4898E19"
 ]
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907E7820_9D55_F940_41D6_BCB778E30947",
 "label": "CLF II c2",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 94.55,
   "panorama": "this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -7.72
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_BCA551AD_9EB2_4B41_41D8_A80CE1A3FD1B",
  "this.overlay_BDFEB5BA_9EB2_4B40_41E0_54C1CD3D2C28",
  "this.overlay_B1DEA00F_A08C_6DC6_4175_D54D52726BEF"
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_AED8C4A9_BF4D_4786_41E4_B24050D49360",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColor": [],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "titleFontColor": "#000000",
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7BAF4B4_BFB6_C78E_41D9_788382A6918E"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonRollOverBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "titlePaddingRight": 5,
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window6245"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "initialPosition": {
  "yaw": -1.03,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AB8056C2_BFB6_C38A_41DE_1067290A1CA0",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "C Ic",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BB37156B_A2A6_CDDE_41DD_94F2AB6288FE_t.jpg",
 "id": "video_BB37156B_A2A6_CDDE_41DD_94F2AB6288FE",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BB37156B_A2A6_CDDE_41DD_94F2AB6288FE.mp4"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_B26A5AAE_9F52_3943_41C3_476664E4206E",
 "headerPaddingBottom": 10,
 "titleFontSize": "2.5vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 12,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#000000",
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "bodyBorderColor": "#000000",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#000099",
  "#000099",
  "#000099"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 5,
 "closeButtonIconHeight": 12,
 "shadow": true,
 "headerPaddingRight": 10,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "LC-MS/MS",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#FFFFFF",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "bold",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.htmlText_B271BAAE_9F52_3943_41BF_AEE7AC295408"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0.5,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 5,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 5,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window14709"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0.5,
 "paddingTop": 0,
 "paddingBottom": 0,
 "bodyBorderSize": 0,
 "scrollBarOpacity": 0.5
},
{
 "initialPosition": {
  "yaw": -29.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC0E4637_BFB6_C28A_41E2_57CFD6356226",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": -179.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC94F593_BFB6_C18A_41DE_482105DB961D",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 4.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC39D668_BFB6_C286_41C4_20878D359B3C",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 84.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACE64605_BFB6_C28E_41E5_C3B40955CE53",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": -85.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ABAC56F4_BFB6_C38E_41DC_7C9E53DE6735",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 170.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AB99A6DB_BFB6_C3BA_41D6_4847C3D3ADEE",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "A Side Stream Smoking Machine 2",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B2149343_A6EA_C282_41D4_D694499D3918_t.jpg",
 "id": "video_B2149343_A6EA_C282_41D4_D694499D3918",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B2149343_A6EA_C282_41D4_D694499D3918.mp4"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_BCABB323_A69A_C282_41E0_65904728B9F3",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7C184B7_BFB6_C78A_41AA_332E66847AE6"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window34213"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_90631E96_9D55_D943_41E1_075253E49390",
 "label": "IP Laboratory",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 161.47,
   "panorama": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -126.84
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_8A7CE892_9D76_7943_41B6_E2BC891849E5",
  "this.overlay_86C0C863_9DF6_39C1_41C8_1721908AED4D"
 ]
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_AC4EA3DC_BF4A_C1BD_41B2_ECD604CDADF2",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColor": [],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "titleFontColor": "#000000",
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7BD74B5_BFB6_C78E_41E3_35DA1BAE0140"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonRollOverBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "titlePaddingRight": 5,
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window8404"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "label": "E Karl Fischer",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B5FDB1D3_AD9B_44CE_41E1_00270236067C_t.jpg",
 "id": "video_B5FDB1D3_AD9B_44CE_41E1_00270236067C",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B5FDB1D3_AD9B_44CE_41E1_00270236067C.mp4"
 }
},
{
 "label": "A Linear Smoking Machine 2",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B338FE47_A6E9_C282_41AC_577A1523BAD1_t.jpg",
 "id": "video_B338FE47_A6E9_C282_41AC_577A1523BAD1",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B338FE47_A6E9_C282_41AC_577A1523BAD1.mp4"
 }
},
{
 "items": [
  {
   "media": "this.video_BC17D089_A2A9_435A_41C0_301F093CEC2E",
   "start": "this.viewer_uidA7B244B0_BFB6_C786_41E7_AC1B3CFAF006VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACF7E128_BF4D_3E86_41C6_5411DD89E7AE, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACF7E128_BF4D_3E86_41C6_5411DD89E7AE, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7B244B0_BFB6_C786_41E7_AC1B3CFAF006VideoPlayer)",
   "player": "this.viewer_uidA7B244B0_BFB6_C786_41E7_AC1B3CFAF006VideoPlayer"
  }
 ],
 "id": "playList_ACF7E128_BF4D_3E86_41C6_5411DD89E7AE",
 "class": "PlayList"
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF",
 "label": "Chemical Laboratory I",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -34.83,
   "panorama": "this.panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -98.67
  },
  {
   "yaw": 30.71,
   "panorama": "this.panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 173.82
  },
  {
   "yaw": -102.1,
   "panorama": "this.panorama_907EF635_9D52_4940_41DE_62177C61378C",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 150.38
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_806D924D_9DF6_49C1_41A3_4CF65AB184A7",
  "this.overlay_82895AF6_9DF6_FEC0_41C8_F2BECF0B588F",
  "this.overlay_BFAF35AB_9DF6_4B41_41D8_892A9A116E03"
 ]
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "B Icp-Ms-Ms ",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BFA566A6_A699_4382_41A1_9B21EACB179D_t.jpg",
 "id": "video_BFA566A6_A699_4382_41A1_9B21EACB179D",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BFA566A6_A699_4382_41A1_9B21EACB179D.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_90613180_9D55_CB40_41E2_7B563653B381",
 "label": "CLF II a",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 178.97,
   "panorama": "this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 0.12
  },
  {
   "yaw": -40.37,
   "panorama": "this.panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 60.92
  },
  {
   "yaw": 20.42,
   "panorama": "this.panorama_9062F88A_9D55_D943_4192_62948FF5C8D9",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -135.39
  },
  {
   "yaw": 114.45,
   "panorama": "this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -79.79
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_BE3AD55C_9EAE_4BC7_41BA_BFE7D5A5CAF7",
  "this.overlay_BE971BE6_9EAE_3EC3_415F_3D045BECA709",
  "this.overlay_BFBCFB0D_9EAD_DF41_41E2_730D32CDB4BB",
  "this.overlay_BF15C59B_9EB2_4B41_41C8_07B8B7CB8333",
  "this.overlay_B2119AD7_9F52_3EC1_4199_589AE36DFF18"
 ]
},
{
 "initialPosition": {
  "yaw": 77.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACC8E5DF_BFB6_C1BA_41E3_D35255A84906",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_BD1CE37A_A2A7_45B9_41C3_7679DA9AB5C5",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7B414B1_BFB6_C786_41C0_E88166D59A11"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window38321"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "items": [
  {
   "media": "this.video_BD82AAE9_A2A7_C4DA_41E2_E00AC1A3C866",
   "start": "this.viewer_uidA7B414B1_BFB6_C786_41C0_E88166D59A11VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACF15129_BF4D_3E86_419A_C22578B6EE8E, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACF15129_BF4D_3E86_419A_C22578B6EE8E, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7B414B1_BFB6_C786_41C0_E88166D59A11VideoPlayer)",
   "player": "this.viewer_uidA7B414B1_BFB6_C786_41C0_E88166D59A11VideoPlayer"
  }
 ],
 "id": "playList_ACF15129_BF4D_3E86_419A_C22578B6EE8E",
 "class": "PlayList"
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_9062F88A_9D55_D943_4192_62948FF5C8D9",
 "label": "CLF II b",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -135.39,
   "panorama": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 20.42
  },
  {
   "panorama": "this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_BFA14B7A_9EB2_3FC3_41DF_410C7B4346D2",
  "this.overlay_BC8BB3CC_9EB6_CEC7_41CA_F111EEC1D172",
  "this.overlay_BC370988_9EB6_3B4F_41CD_0210AE2A0F7C"
 ]
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_AF30DBD4_BF4B_C18E_41C9_2262E76A454E",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColor": [],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "titleFontColor": "#000000",
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7B6B4B2_BFB6_C78A_41C5_EED1745FFAA3"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonRollOverBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "titlePaddingRight": 5,
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window5188"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "initialPosition": {
  "yaw": 100.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACAB95B9_BFB6_C186_41D7_1E054BCD8683",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907E7820_9D55_F940_41D6_BCB778E30947_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756",
 "label": "Lobby",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 9.4,
   "panorama": "this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -175.54
  },
  {
   "yaw": -175.54,
   "panorama": "this.panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -12.55
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_8F8CFC18_9D76_D94F_41D0_B48A04BA132B",
  "this.overlay_8E4070D2_9D75_CAC3_41D1_5761954EDA6C"
 ]
},
{
 "initialPosition": {
  "yaw": 94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACDD35F8_BFB6_C186_41E2_88E605F71753",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 16.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_A729F50C_BFB6_C69D_41E1_B27F011F5549",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854",
 "label": "Smoke & Physical Laboratory a",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 107.59,
   "panorama": "this.panorama_907EF635_9D52_4940_41DE_62177C61378C",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -86
  },
  {
   "yaw": -4.98,
   "panorama": "this.panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -95.58
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_82C58862_9D52_79C3_41E2_AF8567AE63C3",
  "this.overlay_BCA66D2C_9D52_3B47_419E_089631A7ECF3",
  "this.overlay_B1F1851E_9F56_CB43_41E3_3EA6C9420A54",
  "this.overlay_90C64812_9F97_DDDE_41E2_CE66D94B58C1"
 ]
},
{
 "items": [
  {
   "media": "this.video_AE445E03_BF55_428A_41E6_975DE2211CA9",
   "start": "this.viewer_uidA7B9E4B2_BFB6_C78A_41E3_63AAA1249FE4VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACE83130_BF4D_3E86_41DC_F7D67AD466EB, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACE83130_BF4D_3E86_41DC_F7D67AD466EB, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7B9E4B2_BFB6_C78A_41E3_63AAA1249FE4VideoPlayer)",
   "player": "this.viewer_uidA7B9E4B2_BFB6_C78A_41E3_63AAA1249FE4VideoPlayer"
  }
 ],
 "id": "playList_ACE83130_BF4D_3E86_41DC_F7D67AD466EB",
 "class": "PlayList"
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_906FDE4D_9D52_59C0_41C0_337FE3031441",
 "label": "Route 3",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -90.09,
   "panorama": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -9.09
  },
  {
   "yaw": -0.86,
   "panorama": "this.panorama_907EF635_9D52_4940_41DE_62177C61378C",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 175.88
  },
  {
   "panorama": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_87512DAD_9DFE_7B41_41E2_E24C126CE6DC",
  "this.overlay_877D3A68_9DFE_39C0_41E0_BD9C4F7E78B9",
  "this.overlay_B7F03209_9FF3_C940_41D6_59EF0AA0DC74"
 ]
},
{
 "items": [
  {
   "media": "this.video_BFA566A6_A699_4382_41A1_9B21EACB179D",
   "start": "this.viewer_uidA7BE04B6_BFB6_C78A_41E5_DB7D5346A348VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACE7C135_BF4D_3E8E_41D9_2778E4D24D49, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACE7C135_BF4D_3E8E_41D9_2778E4D24D49, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7BE04B6_BFB6_C78A_41E5_DB7D5346A348VideoPlayer)",
   "player": "this.viewer_uidA7BE04B6_BFB6_C78A_41E5_DB7D5346A348VideoPlayer"
  }
 ],
 "id": "playList_ACE7C135_BF4D_3E8E_41D9_2778E4D24D49",
 "class": "PlayList"
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907E5E80_9D52_393F_41E3_3D796633E7B4",
 "label": "Route 1",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": 12.53,
   "panorama": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 176.57
  },
  {
   "yaw": -175.54,
   "panorama": "this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 9.4
  },
  {
   "yaw": -81.3,
   "panorama": "this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -95.66
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_8E689493_9D72_C940_41CF_E9513E63328A",
  "this.overlay_89F05638_9D72_494F_4192_E7073D503EAA",
  "this.overlay_8981F292_9D72_4940_41D5_2B73E994870A"
 ]
},
{
 "items": [
  {
   "media": "this.video_B60BA92C_AD9F_455A_41DC_C23DBE73BF33",
   "start": "this.viewer_uidA7B124AE_BFB6_C79A_41CB_DE322B5CEC11VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACFBB123_BF4D_3E8A_41E5_C47FC778DE3E, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACFBB123_BF4D_3E8A_41E5_C47FC778DE3E, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7B124AE_BFB6_C79A_41CB_DE322B5CEC11VideoPlayer)",
   "player": "this.viewer_uidA7B124AE_BFB6_C79A_41CB_DE322B5CEC11VideoPlayer"
  }
 ],
 "id": "playList_ACFBB123_BF4D_3E8A_41E5_C47FC778DE3E",
 "class": "PlayList"
},
{
 "label": "B Apt",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BC41B6D8_A699_438E_4192_9F157AD863FC_t.jpg",
 "id": "video_BC41B6D8_A699_438E_4192_9F157AD863FC",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BC41B6D8_A699_438E_4192_9F157AD863FC.mp4"
 }
},
{
 "initialPosition": {
  "yaw": -3.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC1B6643_BFB6_C28A_41E7_D08A6436A710",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_BFA37F3F_A69A_C281_41D5_506E2EA78449",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7BE04B6_BFB6_C78A_41E5_DB7D5346A348"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window35099"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_90602F9E_9D55_D740_41E3_6A1240018ABB",
 "label": "CLF II c copy",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -7.72,
   "panorama": "this.panorama_907E7820_9D55_F940_41D6_BCB778E30947",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 94.55
  },
  {
   "yaw": -79.79,
   "panorama": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 114.45
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_BC1F53B8_9EB6_4F4F_41E3_997B525047D1",
  "this.overlay_BC7B8EDB_9EB6_36C1_41D6_DEC7235BDBAC",
  "this.overlay_B18E6492_A094_76DE_41D1_3D4C4ADC4623",
  "this.overlay_BD00FAC0_A7E9_C3FE_419C_A506EADE35D2",
  "this.overlay_BDD841F9_A2E9_44BA_41E0_3979A7EB21BF"
 ]
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907EF635_9D52_4940_41DE_62177C61378C",
 "label": "Route 4",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -86,
   "panorama": "this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 107.59
  },
  {
   "yaw": 175.88,
   "panorama": "this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -0.86
  },
  {
   "yaw": 150.38,
   "panorama": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -102.1
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_86EF6CE0_9DFD_DAFF_41C5_7B47EFE3571D",
  "this.overlay_86CD7B43_9DF2_3FC1_41C7_2E5CDE675610",
  "this.overlay_81A1E5D5_9DF2_4AC1_41DF_990A9B39176E"
 ]
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_ACD5FD64_BF4B_C68E_41C4_7C0DA07E8CD5",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColor": [],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "titleFontColor": "#000000",
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7BC04B6_BFB6_C78A_41DC_19AE3B6E9D6E"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonRollOverBackgroundColor": [],
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "titlePaddingRight": 5,
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window7532"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "items": [
  {
   "media": "this.panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90631E96_9D55_D943_41E1_075253E49390",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90631E96_9D55_D943_41E1_075253E49390_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EF635_9D52_4940_41DE_62177C61378C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EF635_9D52_4940_41DE_62177C61378C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90613180_9D55_CB40_41E2_7B563653B381_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_9062F88A_9D55_D943_4192_62948FF5C8D9",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_907E7820_9D55_F940_41D6_BCB778E30947",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_907E7820_9D55_F940_41D6_BCB778E30947_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.video_BCDD06C7_A6E7_4382_41E4_2BF18287717A",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B338FE47_A6E9_C282_41AC_577A1523BAD1",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B2149343_A6EA_C282_41D4_D694499D3918",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B359B683_A6EB_4382_41C6_34C05D91091F",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B3721249_A6EB_C28E_41E0_9DA86A5934C5",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BCCD912F_A69F_BE82_41E1_EF7E6F69FE14",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BC41B6D8_A699_438E_4192_9F157AD863FC",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BC45EA22_A69B_4283_41DA_B72C250FAB14",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BFA566A6_A699_4382_41A1_9B21EACB179D",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BE821DB5_A6A6_C186_41D4_6F32A2D8E022",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BC17D089_A2A9_435A_41C0_301F093CEC2E",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 30)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BD82AAE9_A2A7_C4DA_41E2_E00AC1A3C866",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, 31)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_BB37156B_A2A6_CDDE_41DD_94F2AB6288FE",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, 32)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B4367164_AD9A_C5C9_41D2_450BAD844F0F",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32, 33)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B5529801_AD9B_434A_41C9_C4FBA7E9731A",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33, 34)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B5B8878C_AD99_4D59_41CB_74A18FDE79DE",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34, 35)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B5FDB1D3_AD9B_44CE_41E1_00270236067C",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35, 36)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B65FA856_AD99_43C9_41D3_0ACF290D4B23",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36, 37)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B60BA92C_AD9F_455A_41DC_C23DBE73BF33",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37, 38)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_AE445E03_BF55_428A_41E6_975DE2211CA9",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38, 39)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_B09A8371_BF4B_4286_41C9_A7817D0DFB3C",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39, 40)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_AEBD2E2A_BF4D_429A_41E7_17776333A6ED",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40, 41)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_ADECE224_BF4B_428E_41E1_CC5812763614",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41, 42)",
   "player": "this.MainViewerVideoPlayer"
  },
  {
   "media": "this.video_AB405B64_BFB5_428E_41D8_ADB2C6070666",
   "start": "this.MainViewerVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.MainViewerVideoPlayer); this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42, 0)",
   "player": "this.MainViewerVideoPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_BC45EA22_A69B_4283_41DA_B72C250FAB14",
   "start": "this.viewer_uidA7C184B7_BFB6_C78A_41AA_332E66847AE6VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACE08136_BF4D_3E8A_41B0_B6808E3A8C58, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACE08136_BF4D_3E8A_41B0_B6808E3A8C58, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7C184B7_BFB6_C78A_41AA_332E66847AE6VideoPlayer)",
   "player": "this.viewer_uidA7C184B7_BFB6_C78A_41AA_332E66847AE6VideoPlayer"
  }
 ],
 "id": "playList_ACE08136_BF4D_3E8A_41B0_B6808E3A8C58",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 167.45,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC429675_BFB6_C28E_41E4_78EC7191F31A",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "displayPlaybackBar": true,
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "touchControlMode": "drag_rotation"
},
{
 "label": "D Hplc",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B4367164_AD9A_C5C9_41D2_450BAD844F0F_t.jpg",
 "id": "video_B4367164_AD9A_C5C9_41D2_450BAD844F0F",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B4367164_AD9A_C5C9_41D2_450BAD844F0F.mp4"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_B277F2DE_A6E9_4382_41D5_4380D8A43CDE",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7B724B2_BFB6_C78A_41D4_A641592656C2"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window24891"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "initialPosition": {
  "yaw": 145.17,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC62A69B_BFB6_C3BA_41C5_1A633F8EFDCA",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "B Dma",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BC45EA22_A69B_4283_41DA_B72C250FAB14_t.jpg",
 "id": "video_BC45EA22_A69B_4283_41DA_B72C250FAB14",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BC45EA22_A69B_4283_41DA_B72C250FAB14.mp4"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720",
 "label": "Entrance",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -12.55,
   "panorama": "this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -175.54
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_8FB387DF_9D76_76C1_41E1_02937EB0E142"
 ]
},
{
 "items": [
  {
   "media": "this.video_B65FA856_AD99_43C9_41D3_0ACF290D4B23",
   "start": "this.viewer_uidA7BF54B6_BFB6_C78A_41B9_3EC3F82CD447VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACE6A135_BF4D_3E8E_41C9_63A182170F22, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACE6A135_BF4D_3E8E_41C9_63A182170F22, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7BF54B6_BFB6_C78A_41B9_3EC3F82CD447VideoPlayer)",
   "player": "this.viewer_uidA7BF54B6_BFB6_C78A_41B9_3EC3F82CD447VideoPlayer"
  }
 ],
 "id": "playList_ACE6A135_BF4D_3E8E_41C9_63A182170F22",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": -159.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACF10611_BFB6_C286_41E2_E8D711316CF6",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907EF635_9D52_4940_41DE_62177C61378C_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_B63B6CF9_AD9E_DCBA_41E0_827A790CD184",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7B124AE_BFB6_C79A_41CB_DE322B5CEC11"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window46489"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "items": [
  {
   "media": "this.video_AB405B64_BFB5_428E_41D8_ADB2C6070666",
   "start": "this.viewer_uidA7BD74B5_BFB6_C78E_41E3_35DA1BAE0140VideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_A7BDB4B5_BFB6_C78E_41D3_EF9DF7859555, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_A7BDB4B5_BFB6_C78E_41D3_EF9DF7859555, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7BD74B5_BFB6_C78E_41E3_35DA1BAE0140VideoPlayer)",
   "player": "this.viewer_uidA7BD74B5_BFB6_C78E_41E3_35DA1BAE0140VideoPlayer"
  }
 ],
 "id": "playList_A7BDB4B5_BFB6_C78E_41D3_EF9DF7859555",
 "class": "PlayList"
},
{
 "items": [
  {
   "media": "this.video_BC41B6D8_A699_438E_4192_9F157AD863FC",
   "start": "this.viewer_uidA7B4A4B0_BFB6_C786_41C8_39BBCEC495DFVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_ACF1A129_BF4D_3E86_41E5_EC2961156F4C, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_ACF1A129_BF4D_3E86_41E5_EC2961156F4C, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7B4A4B0_BFB6_C786_41C8_39BBCEC495DFVideoPlayer)",
   "player": "this.viewer_uidA7B4A4B0_BFB6_C786_41C8_39BBCEC495DFVideoPlayer"
  }
 ],
 "id": "playList_ACF1A129_BF4D_3E86_41E5_EC2961156F4C",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": -149.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACD225EB_BFB6_C19A_41DA_0AC8C10D3B03",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "A Gc Fid 2",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BCDD06C7_A6E7_4382_41E4_2BF18287717A_t.jpg",
 "id": "video_BCDD06C7_A6E7_4382_41E4_2BF18287717A",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BCDD06C7_A6E7_4382_41E4_2BF18287717A.mp4"
 }
},
{
 "initialPosition": {
  "yaw": -119.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC9AD59F_BFB6_C1BA_41E7_BFA5E22A1CE9",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 53.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_A70454E6_BFB6_C78A_41DF_21ABDF84A091",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "D Karl Fischer",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B5529801_AD9B_434A_41C9_C4FBA7E9731A_t.jpg",
 "id": "video_B5529801_AD9B_434A_41C9_C4FBA7E9731A",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B5529801_AD9B_434A_41C9_C4FBA7E9731A.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 44.61,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ACA355AC_BFB6_C19E_41C0_ADE2CD061B02",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "B Qtm 1",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BCCD912F_A69F_BE82_41E1_EF7E6F69FE14_t.jpg",
 "id": "video_BCCD912F_A69F_BE82_41E1_EF7E6F69FE14",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BCCD912F_A69F_BE82_41E1_EF7E6F69FE14.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_90613180_9D55_CB40_41E2_7B563653B381_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "initialPosition": {
  "yaw": 84.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC2F065C_BFB6_C2BE_41DF_02B16561AD4B",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "A Rotary Smoking Machine 2",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B359B683_A6EB_4382_41C6_34C05D91091F_t.jpg",
 "id": "video_B359B683_A6EB_4382_41C6_34C05D91091F",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B359B683_A6EB_4382_41C6_34C05D91091F.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 111.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC4F8683_BFB6_C38B_41E4_90EC303C76A6",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "A Hplc",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_AB405B64_BFB5_428E_41D8_ADB2C6070666_t.jpg",
 "id": "video_AB405B64_BFB5_428E_41D8_ADB2C6070666",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_AB405B64_BFB5_428E_41D8_ADB2C6070666.mp4"
 }
},
{
 "label": "D Ngp",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B5B8878C_AD99_4D59_41CB_74A18FDE79DE_t.jpg",
 "id": "video_B5B8878C_AD99_4D59_41CB_74A18FDE79DE",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B5B8878C_AD99_4D59_41CB_74A18FDE79DE.mp4"
 }
},
{
 "initialPosition": {
  "yaw": -4.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_ABA076E8_BFB6_C386_41DC_2B98FA1779EE",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "B Gc-Ms",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BE821DB5_A6A6_C186_41D4_6F32A2D8E022_t.jpg",
 "id": "video_BE821DB5_A6A6_C186_41D4_6F32A2D8E022",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BE821DB5_A6A6_C186_41D4_6F32A2D8E022.mp4"
 }
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "label": "A Rotary Smoking Machine",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_AE445E03_BF55_428A_41E6_975DE2211CA9_t.jpg",
 "id": "video_AE445E03_BF55_428A_41E6_975DE2211CA9",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_AE445E03_BF55_428A_41E6_975DE2211CA9.mp4"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_B1AE0FD3_A08C_525E_41B3_D4822DA27D18",
 "headerPaddingBottom": 10,
 "titleFontSize": "2vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 12,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#000000",
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "bodyBorderColor": "#000000",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#000099",
  "#000099",
  "#000099"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 5,
 "closeButtonIconHeight": 12,
 "shadow": true,
 "headerPaddingRight": 10,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "High Performance Liquid Chromatography",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#FFFFFF",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "bold",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.htmlText_B1B23FD3_A08C_525E_41CB_6C031FEBFFC2"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0.5,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 5,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 5,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 5,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window14709"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0.5,
 "paddingTop": 0,
 "paddingBottom": 0,
 "bodyBorderSize": 0,
 "scrollBarOpacity": 0.5
},
{
 "items": [
  {
   "media": "this.video_ADECE224_BF4B_428E_41E1_CC5812763614",
   "start": "this.viewer_uidA7BC04B6_BFB6_C78A_41DC_19AE3B6E9D6EVideoPlayer.set('displayPlaybackBar', true); this.changeBackgroundWhilePlay(this.playList_A7BC44B6_BFB6_C78A_41E3_3E30BD630005, 0, '#000000'); this.pauseGlobalAudiosWhilePlayItem(this.playList_A7BC44B6_BFB6_C78A_41E3_3E30BD630005, 0)",
   "class": "VideoPlayListItem",
   "begin": "this.fixTogglePlayPauseButton(this.viewer_uidA7BC04B6_BFB6_C78A_41DC_19AE3B6E9D6EVideoPlayer)",
   "player": "this.viewer_uidA7BC04B6_BFB6_C78A_41DC_19AE3B6E9D6EVideoPlayer"
  }
 ],
 "id": "playList_A7BC44B6_BFB6_C78A_41E3_3E30BD630005",
 "class": "PlayList"
},
{
 "initialPosition": {
  "yaw": 89.91,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "id": "camera_AC8B1578_BFB6_C686_41B8_B5D883F77C68",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 }
},
{
 "hfov": 360,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "thumbnailUrl": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "height": 2048,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "height": 1024,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "height": 512,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ]
   },
   "class": "CubicPanoramaFrame"
  }
 ],
 "id": "panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2",
 "label": "Smoke & Physical Laboratory b copy",
 "pitch": 0,
 "thumbnailUrl": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_t.jpg",
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "yaw": -95.58,
   "panorama": "this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854",
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -4.98
  }
 ],
 "hfovMin": "135%",
 "hfovMax": 130,
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_822B964B_9D55_C9C1_41C3_D4CC7FFBEC12",
  "this.overlay_BDD4B3B5_9D56_CF41_4191_872AA0128CB4",
  "this.overlay_BD8C1CAC_9D56_F947_41D6_87A2B5A0DAF4",
  "this.overlay_8270FF37_9D56_7741_41D5_F3692915DF48"
 ]
},
{
 "label": "C Qtm",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_BD82AAE9_A2A7_C4DA_41E2_E00AC1A3C866_t.jpg",
 "id": "video_BD82AAE9_A2A7_C4DA_41E2_E00AC1A3C866",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_BD82AAE9_A2A7_C4DA_41E2_E00AC1A3C866.mp4"
 }
},
{
 "label": "A Side Stream Smoking Machine",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_B09A8371_BF4B_4286_41C9_A7817D0DFB3C_t.jpg",
 "id": "video_B09A8371_BF4B_4286_41C9_A7817D0DFB3C",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_B09A8371_BF4B_4286_41C9_A7817D0DFB3C.mp4"
 }
},
{
 "label": "A Gc-Ms",
 "scaleMode": "fit_inside",
 "width": 1920,
 "loop": false,
 "class": "Video",
 "thumbnailUrl": "media/video_AEBD2E2A_BF4D_429A_41E7_17776333A6ED_t.jpg",
 "id": "video_AEBD2E2A_BF4D_429A_41E7_17776333A6ED",
 "height": 1080,
 "video": {
  "width": 1920,
  "height": 1080,
  "class": "VideoResource",
  "mp4Url": "media/video_AEBD2E2A_BF4D_429A_41E7_17776333A6ED.mp4"
 }
},
{
 "scrollBarVisible": "rollOver",
 "id": "window_BF907195_A69E_C186_41C0_48E30CF416F5",
 "headerPaddingBottom": 5,
 "titleFontSize": "1.29vmin",
 "width": 400,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "closeButtonIconWidth": 20,
 "closeButtonIconLineWidth": 2,
 "headerPaddingLeft": 10,
 "headerBorderColor": "#000000",
 "shadowSpread": 1,
 "closeButtonIconColor": "#B2B2B2",
 "footerBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "veilOpacity": 0.4,
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "closeButtonPressedIconLineWidth": 3,
 "modal": true,
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundOpacity": 1,
 "closeButtonBackgroundColorRatios": [],
 "minHeight": 20,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "closeButtonPressedIconColor": "#FFFFFF",
 "height": 600,
 "bodyPaddingRight": 0,
 "closeButtonIconHeight": 20,
 "shadow": true,
 "headerPaddingRight": 0,
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "title": "",
 "veilColorRatios": [
  0,
  1
 ],
 "veilColorDirection": "horizontal",
 "backgroundColor": [],
 "verticalAlign": "middle",
 "minWidth": 20,
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "titleFontColor": "#000000",
 "paddingRight": 0,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "closeButtonBackgroundColor": [],
 "titleFontWeight": "normal",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "titlePaddingLeft": 5,
 "bodyBackgroundColorDirection": "vertical",
 "titlePaddingBottom": 5,
 "overflow": "scroll",
 "shadowHorizontalLength": 3,
 "footerHeight": 5,
 "closeButtonPressedBackgroundColor": [],
 "headerVerticalAlign": "middle",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "borderSize": 0,
 "children": [
  "this.viewer_uidA7B4A4B0_BFB6_C786_41C8_39BBCEC495DF"
 ],
 "layout": "vertical",
 "headerBackgroundColorDirection": "vertical",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "headerBackgroundOpacity": 0,
 "titleFontStyle": "normal",
 "bodyPaddingLeft": 0,
 "shadowVerticalLength": 0,
 "class": "Window",
 "bodyPaddingBottom": 0,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "titlePaddingRight": 5,
 "footerBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "backgroundColorRatios": [],
 "headerBorderSize": 0,
 "contentOpaque": false,
 "headerPaddingTop": 10,
 "titlePaddingTop": 5,
 "bodyPaddingTop": 0,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "closeButtonRollOverBackgroundColor": [],
 "titleFontFamily": "Arial",
 "scrollBarColor": "#000000",
 "titleTextDecoration": "none",
 "data": {
  "name": "Window33278"
 },
 "closeButtonRollOverIconColor": "#FFFFFF",
 "gap": 10,
 "bodyBackgroundOpacity": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "toolTipFontSize": "9px",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 55,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "class": "ViewerArea",
 "top": 0,
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarBottom": 5,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarVisible": "rollOver",
 "width": 115.05,
 "scrollBarMargin": 2,
 "borderSize": 0,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "layout": "absolute",
 "right": "0%",
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "top": "0%",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 641,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--SETTINGS"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 30,
 "scrollBarVisible": "rollOver",
 "width": 400,
 "scrollBarMargin": 2,
 "borderSize": 0,
 "children": [
  "this.Label_0DD14F09_1744_0507_41AA_D8475423214A",
  "this.Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2",
  "this.Image_8DDC27A5_9D52_D741_41CD_D044CFEE87FD"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "top": 15,
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 133,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "--STICKER"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.64,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": 0,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 118,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "--MENU"
 },
 "paddingTop": 0,
 "gap": 10,
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--INFO photo"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--INFO photoalbum"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--PANORAMA LIST"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--LOCATION"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--FLOORPLAN"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--PHOTOALBUM + text"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "--PHOTOALBUM"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "shadow": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "paddingRight": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "scrollBarColor": "#04A3E1",
 "overflow": "scroll",
 "data": {
  "name": "--REALTOR"
 },
 "paddingTop": 0,
 "gap": 10,
 "visible": false,
 "scrollBarOpacity": 0.5
},
{
 "transparencyActive": true,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "borderSize": 0,
 "maxWidth": 58,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "maxHeight": 58,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "shadow": false,
 "mode": "toggle",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 58,
 "paddingRight": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "borderSize": 0,
 "maxWidth": 58,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "maxHeight": 58,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "shadow": false,
 "mode": "toggle",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 58,
 "paddingRight": 0,
 "data": {
  "name": "IconButton MUTE"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7BF54B6_BFB6_C78A_41B9_3EC3F82CD447",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9667"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "viewer_uidA7BAF4B4_BFB6_C78E_41D9_788382A6918EVideoPlayer",
 "viewerArea": "this.viewer_uidA7BAF4B4_BFB6_C78E_41D9_788382A6918E",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "maps": [
  {
   "yaw": -26.29,
   "hfov": 11.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_83768908_9D5E_FB4F_41B3_CF4FB44419B9",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_BD5884F1_A2A9_CCCA_41D6_DCDFEAFFF191, this.video_BC17D089_A2A9_435A_41C0_301F093CEC2E, this.playList_ACF7E128_BF4D_3E86_41C6_5411DD89E7AE, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.81,
   "image": "this.AnimatedImageResource_B5167C7C_A08C_564A_41C1_3BA6C325721B",
   "yaw": -26.29,
   "pitch": 4.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "GC/FID"
 }
},
{
 "maps": [
  {
   "yaw": -98.67,
   "hfov": 17.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -20.78,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_83206684_9D52_4947_41D1_A6D53576D27D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF, this.camera_AC62A69B_BFB6_C3BA_41C5_1A633F8EFDCA); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.33,
   "image": "this.AnimatedImageResource_B5623E4D_9FF2_59C1_41E0_84C8166B58AF",
   "yaw": -98.67,
   "pitch": -20.78,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -163.53,
   "hfov": 16.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -23.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_872B7FE6_9DF6_36C3_41CC_20A899D67267",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3, this.camera_AC4F8683_BFB6_C38B_41E4_90EC303C76A6); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.99,
   "image": "this.AnimatedImageResource_B567BE4B_9FF2_59C1_41D8_63C8FCEB6163",
   "yaw": -163.53,
   "pitch": -23.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -36.39,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.7,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_B13595F0_A074_565A_41C6_37776E09D60F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_B63B6CF9_AD9E_DCBA_41E0_827A790CD184, this.video_B60BA92C_AD9F_455A_41DC_C23DBE73BF33, this.playList_ACFBB123_BF4D_3E8A_41E5_C47FC778DE3E, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_B17144DC_A074_D64A_41D3_9B4180E019C1",
   "yaw": -36.39,
   "pitch": -0.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "NGP Linear Smoking Machine"
 }
},
{
 "maps": [
  {
   "yaw": 3.48,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.02,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BCA9E8D1_9EBE_3AC1_41D9_CFA6E5D3F634",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_BFA37F3F_A69A_C281_41D5_506E2EA78449, this.video_BFA566A6_A699_4382_41A1_9B21EACB179D, this.playList_ACE7C135_BF4D_3E8E_41D9_2778E4D24D49, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_B50E2C87_A08C_56C6_41DA_C85A75C4BDC0",
   "yaw": 3.48,
   "pitch": -0.02,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "ICP-MS/MS"
 }
},
{
 "maps": [
  {
   "yaw": 129.78,
   "hfov": 11.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 9.93,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BDA80F42_9EBE_D7C3_41DA_6B3F3EA2940F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_BCABB323_A69A_C282_41E0_65904728B9F3, this.video_BC45EA22_A69B_4283_41DA_B72C250FAB14, this.playList_ACE08136_BF4D_3E8A_41B0_B6808E3A8C58, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.66,
   "image": "this.AnimatedImageResource_B50E5C87_A08C_56C6_41DC_C7EB5FEC4E67",
   "yaw": 129.78,
   "pitch": 9.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Direct Mercury Analyzer"
 }
},
{
 "maps": [
  {
   "yaw": 60.92,
   "hfov": 17.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0_HS_3_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -22.5,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BD77A168_9EBE_4BCF_41D7_290CAFAADB38",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90613180_9D55_CB40_41E2_7B563653B381, this.camera_AC8E8585_BFB6_C18E_41E2_A1503C2DC1A3); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.12,
   "image": "this.AnimatedImageResource_B56A5E57_9FF2_59C1_41D4_92B19DDB527F",
   "yaw": 60.92,
   "pitch": -22.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "id": "viewer_uidA7B6B4B2_BFB6_C78A_41C5_EED1745FFAA3VideoPlayer",
 "viewerArea": "this.viewer_uidA7B6B4B2_BFB6_C78A_41C5_EED1745FFAA3",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "id": "viewer_uidA7B724B2_BFB6_C78A_41D4_A641592656C2VideoPlayer",
 "viewerArea": "this.viewer_uidA7B724B2_BFB6_C78A_41D4_A641592656C2",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "maps": [
  {
   "yaw": -9.09,
   "hfov": 17.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -15.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_89595998_9D7D_DB4F_4195_D8A67DDAD728",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441, this.camera_AC8B1578_BFB6_C686_41B8_B5D883F77C68); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.85,
   "image": "this.AnimatedImageResource_8AD242AC_9DED_C947_41DD_F01F584F7904",
   "yaw": -9.09,
   "pitch": -15.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 176.57,
   "hfov": 17.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -15.98,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8827B028_9D7E_494F_41E1_17B1E069DD53",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4, this.camera_A71A7500_BFB6_C686_41D0_1EAF1F3DBC1B); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.82,
   "image": "this.AnimatedImageResource_8AD292AD_9DED_C941_41B6_1FE579F5A9B5",
   "yaw": 176.57,
   "pitch": -15.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -68.16,
   "hfov": 11.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -4.53,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_89928C2C_9D7E_7940_4196_DD687FD50F07",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551, this.camera_A729F50C_BFB6_C69D_41E1_B27F011F5549); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.81,
   "image": "this.AnimatedImageResource_8AD2C2AD_9DED_C941_41E2_E4462FB8B4BC",
   "yaw": -68.16,
   "pitch": -4.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -126.84,
   "hfov": 11.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -3.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_89C9BE70_9D7E_39DF_41E1_BEC8E105AC6B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90631E96_9D55_D943_41E1_075253E49390, this.camera_A71114F3_BFB6_C78B_419A_6FD46807E2E5); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.82,
   "image": "this.AnimatedImageResource_8AD332AD_9DED_C941_41E1_8E5BEDBC5B92",
   "yaw": -126.84,
   "pitch": -3.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 0.12,
   "hfov": 11.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -6.25,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BD97799D_9D56_DB40_41E2_EE3E9E43E0D0",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90613180_9D55_CB40_41E2_7B563653B381, this.camera_AB8056C2_BFB6_C38A_41DE_1067290A1CA0); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.77,
   "image": "this.AnimatedImageResource_B5615E4F_9FF2_59C1_41E2_024685967470",
   "yaw": 0.12,
   "pitch": -6.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -95.66,
   "hfov": 13.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.25,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BD77B2C3_9D52_CEC0_41E2_7FC72A1E6D46",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4, this.camera_AB8D56CF_BFB6_C39A_41D5_363A8695C2E9); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.8,
   "image": "this.AnimatedImageResource_B5612E4F_9FF2_59C1_41C9_18C4CE36528F",
   "yaw": -95.66,
   "pitch": -21.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Circle Arrow 04 Left"
 },
 "enabledInCardboard": true
},
{
 "id": "viewer_uidA7BCD4B5_BFB6_C78E_41D4_6A5CAB367D3AVideoPlayer",
 "viewerArea": "this.viewer_uidA7BCD4B5_BFB6_C78E_41D4_6A5CAB367D3A",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "id": "htmlText_8B06AFEC_9DD6_36C7_41E2_57B393DB75C1",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 0,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 0,
 "paddingLeft": 10,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Pengujian kecenderungan terbakar</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Mendeteksi resiko kebakaran pada produk tembakau</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Evaluasi keamanan dan pengendalian kualitas</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "height": "100%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "HTMLText14710"
 },
 "paddingTop": 10,
 "paddingBottom": 10,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7B244B0_BFB6_C786_41E7_AC1B3CFAF006",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9657"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7BCD4B5_BFB6_C78E_41D4_6A5CAB367D3A",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9665"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7B9E4B2_BFB6_C78A_41E3_63AAA1249FE4",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9662"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "maps": [
  {
   "yaw": 173.82,
   "hfov": 17.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -22.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_822CCB7D_9D52_7FC1_41B6_0742F4898E19",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF, this.camera_ACD225EB_BFB6_C19A_41DA_0AC8C10D3B03); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.08,
   "image": "this.AnimatedImageResource_B563FE4E_9FF2_59C3_41C6_19CA0C152D1E",
   "yaw": 173.82,
   "pitch": -22.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 94.55,
   "hfov": 16.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -25.58,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BCA551AD_9EB2_4B41_41D8_A80CE1A3FD1B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB, this.camera_AC6D26A8_BFB6_C386_41CA_9E328454726E); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.71,
   "image": "this.AnimatedImageResource_B56C2E57_9FF2_59C1_41DF_6BF55E58A0BC",
   "yaw": 94.55,
   "pitch": -25.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 3.95,
   "hfov": 11.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -3.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BDFEB5BA_9EB2_4B40_41E0_54C1CD3D2C28",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_B54A4C61_AD9A_C3CA_41C5_5DD12AA2F035, this.video_B65FA856_AD99_43C9_41D3_0ACF290D4B23, this.playList_ACE6A135_BF4D_3E8E_41C9_63A182170F22, '90%', '90%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.81,
   "image": "this.AnimatedImageResource_B50F5C86_A08C_56C6_41DE_1BA273392127",
   "yaw": 3.95,
   "pitch": -3.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Auto Analyzer"
 }
},
{
 "maps": [
  {
   "yaw": 55.58,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -1.05,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_B1DEA00F_A08C_6DC6_4175_D54D52726BEF",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_B1AE0FD3_A08C_525E_41B3_D4822DA27D18, null, false)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_B50E9C86_A08C_56C6_41D2_23F2A783A2BB",
   "yaw": 55.58,
   "pitch": -1.05,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "NGP Linear Smoking Machine"
 }
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7BAF4B4_BFB6_C78E_41D9_788382A6918E",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9663"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "htmlText_B271BAAE_9F52_3943_41BF_AEE7AC295408",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 0,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 0,
 "paddingLeft": 10,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Liquid chromatography dengan mass spectrometry deteksi sensitif senyawa kompleks.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Kecepatan dan efisiensi analisis tinggi.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Digunakan untuk analisis berbagai senyawa kimia pada sampel uji.</SPAN></SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "HTMLText14710"
 },
 "paddingTop": 10,
 "paddingBottom": 10,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7C184B7_BFB6_C78A_41AA_332E66847AE6",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9669"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "maps": [
  {
   "yaw": -40.91,
   "hfov": 17.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -2.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8A7CE892_9D76_7943_41B6_E2BC891849E5",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_8B056FEC_9DD6_36C7_419A_BA038344555B, null, false)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.74,
   "image": "this.AnimatedImageResource_8AD312AE_9DED_C943_41D0_7B90D80CE951",
   "yaw": -40.91,
   "pitch": -2.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Ignition Propensity Tester"
 }
},
{
 "maps": [
  {
   "yaw": 161.47,
   "hfov": 16.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -25.24,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_86C0C863_9DF6_39C1_41C8_1721908AED4D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3, this.camera_A70454E6_BFB6_C78A_41DF_21ABDF84A091); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.76,
   "image": "this.AnimatedImageResource_B567DE4B_9FF2_59C1_41DD_046359E7871C",
   "yaw": 161.47,
   "pitch": -25.24,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7BD74B5_BFB6_C78E_41E3_35DA1BAE0140",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9664"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "viewer_uidA7B244B0_BFB6_C786_41E7_AC1B3CFAF006VideoPlayer",
 "viewerArea": "this.viewer_uidA7B244B0_BFB6_C786_41E7_AC1B3CFAF006",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "maps": [
  {
   "yaw": -102.1,
   "hfov": 15.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -34.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_806D924D_9DF6_49C1_41A3_4CF65AB184A7",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EF635_9D52_4940_41DE_62177C61378C, this.camera_AC0E4637_BFB6_C28A_41E2_57CFD6356226); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.21,
   "image": "this.AnimatedImageResource_B5656E4D_9FF2_59C1_41C9_F14F8CF7E566",
   "yaw": -102.1,
   "pitch": -34.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -34.83,
   "hfov": 16.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -24.21,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_82895AF6_9DF6_FEC0_41C8_F2BECF0B588F",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77, this.camera_ACFA461E_BFB6_C2BA_41E6_A78FD1F16DDB); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.9,
   "image": "this.AnimatedImageResource_B5652E4D_9FF2_59C1_41CD_84A970D77B3A",
   "yaw": -34.83,
   "pitch": -24.21,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 30.71,
   "hfov": 16.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -23.87,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BFAF35AB_9DF6_4B41_41D8_892A9A116E03",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C, this.camera_AC07D62A_BFB6_C29A_41BA_D0146A7DB08A); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.95,
   "image": "this.AnimatedImageResource_B562AE4D_9FF2_59C1_41B5_F7D14CF312C4",
   "yaw": 30.71,
   "pitch": -23.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 20.42,
   "hfov": 18.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -13.23,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BE3AD55C_9EAE_4BC7_41BA_BFE7D5A5CAF7",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_9062F88A_9D55_D943_4192_62948FF5C8D9, this.camera_ACA355AC_BFB6_C19E_41C0_ADE2CD061B02); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.04,
   "image": "this.AnimatedImageResource_B56E8E4F_9FF2_59C1_41BB_0A9004CF7470",
   "yaw": 20.42,
   "pitch": -13.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 114.45,
   "hfov": 17.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -17.35,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BE971BE6_9EAE_3EC3_415F_3D045BECA709",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90602F9E_9D55_D740_41E3_6A1240018ABB, this.camera_ACAB95B9_BFB6_C186_41D7_1E054BCD8683); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.69,
   "image": "this.AnimatedImageResource_B56E5E4F_9FF2_59C1_41DA_F1468764473F",
   "yaw": 114.45,
   "pitch": -17.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -40.37,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -0.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BFBCFB0D_9EAD_DF41_41E2_730D32CDB4BB",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4, this.camera_AC9AD59F_BFB6_C1BA_41E7_BFA5E22A1CE9); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_B56FEE4F_9FF2_59C1_41DD_4ED3E8A2C65D",
   "yaw": -40.37,
   "pitch": -0.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 178.97,
   "hfov": 15.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_4_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -34.85,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BF15C59B_9EB2_4B41_41C8_07B8B7CB8333",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08, this.camera_AC94F593_BFB6_C18A_41DE_482105DB961D); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.21,
   "image": "this.AnimatedImageResource_B56E8E50_9FF2_59DF_41CE_D9CE420D27F9",
   "yaw": 178.97,
   "pitch": -34.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -103.65,
   "hfov": 11.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.74,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_B2119AD7_9F52_3EC1_4199_589AE36DFF18",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_B26A5AAE_9F52_3943_41C3_476664E4206E, null, false)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.82,
   "image": "this.AnimatedImageResource_AEC882A9_9F52_4940_41A8_B8484FD1EAB6",
   "yaw": -103.65,
   "pitch": 3.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "LC-MS/MS"
 }
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7B414B1_BFB6_C786_41C0_E88166D59A11",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9659"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "viewer_uidA7B414B1_BFB6_C786_41C0_E88166D59A11VideoPlayer",
 "viewerArea": "this.viewer_uidA7B414B1_BFB6_C786_41C0_E88166D59A11",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "maps": [
  {
   "yaw": -135.39,
   "hfov": 17.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -14.95,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BFA14B7A_9EB2_3FC3_41DF_410C7B4346D2",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90613180_9D55_CB40_41E2_7B563653B381, this.camera_ACF10611_BFB6_C286_41E2_E8D711316CF6); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.91,
   "image": "this.AnimatedImageResource_B56E4E55_9FF2_59C1_41DA_D358DC3C37C3",
   "yaw": -135.39,
   "pitch": -14.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 49.57,
   "hfov": 11.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 8.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BC8BB3CC_9EB6_CEC7_41CA_F111EEC1D172",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_AED8C4A9_BF4D_4786_41E4_B24050D49360, this.video_AEBD2E2A_BF4D_429A_41E7_17776333A6ED, this.playList_A7BB24B4_BFB6_C78E_41D8_A7ACBF5A667F, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.72,
   "image": "this.AnimatedImageResource_B5114C85_A08C_56BA_41E2_EFA4A38E5049",
   "yaw": 49.57,
   "pitch": 8.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "GC-MS"
 }
},
{
 "maps": [
  {
   "yaw": 128.18,
   "hfov": 17.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0_HS_2_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -21.12,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BC370988_9EB6_3B4F_41CD_0210AE2A0F7C",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.29,
   "image": "this.AnimatedImageResource_B56FFE56_9FF2_59C3_41DA_40E5EA7C88D7",
   "yaw": 128.18,
   "pitch": -21.12,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7B6B4B2_BFB6_C78A_41C5_EED1745FFAA3",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9661"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "maps": [
  {
   "yaw": 9.4,
   "hfov": 11.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -6.25,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8F8CFC18_9D76_D94F_41D0_B48A04BA132B",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907E5E80_9D52_393F_41E3_3D796633E7B4, this.camera_AC39D668_BFB6_C286_41C4_20878D359B3C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.77,
   "image": "this.AnimatedImageResource_8AD0A2AB_9DED_C941_41CB_142E94A7BD6C",
   "yaw": 9.4,
   "pitch": -6.25,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -175.54,
   "hfov": 15.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.45,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8E4070D2_9D75_CAC3_41D1_5761954EDA6C",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720, this.camera_AC429675_BFB6_C28E_41E4_78EC7191F31A); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.64,
   "image": "this.AnimatedImageResource_8AD0F2AB_9DED_C941_41C6_B3558EDDE7D4",
   "yaw": -175.54,
   "pitch": -32.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -4.98,
   "hfov": 17.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -20.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_82C58862_9D52_79C3_41E2_AF8567AE63C3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2, this.camera_ACE64605_BFB6_C28E_41E5_C3B40955CE53); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.37,
   "image": "this.AnimatedImageResource_B5636E4E_9FF2_59C3_41DC_EC106EFC3C80",
   "yaw": -4.98,
   "pitch": -20.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 107.59,
   "hfov": 17.37,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -20.44,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BCA66D2C_9D52_3B47_419E_089631A7ECF3",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EF635_9D52_4940_41DE_62177C61378C, this.camera_ACDD35F8_BFB6_C186_41E2_88E605F71753); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.37,
   "image": "this.AnimatedImageResource_B5632E4E_9FF2_59C3_41DC_BD6801CB32B0",
   "yaw": 107.59,
   "pitch": -20.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -44.67,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.45,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_B1F1851E_9F56_CB43_41E3_3EA6C9420A54",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_BF907195_A69E_C186_41C0_48E30CF416F5, this.video_BC41B6D8_A699_438E_4192_9F157AD863FC, this.playList_ACF1A129_BF4D_3E86_41E5_EC2961156F4C, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_8D326CF2_9FB4_365E_41E2_99EC1308A483",
   "yaw": -44.67,
   "pitch": 1.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Air Permeability Tester"
 }
},
{
 "maps": [
  {
   "yaw": 27.39,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_1_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.11,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_90C64812_9F97_DDDE_41E2_CE66D94B58C1",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_BD1CE37A_A2A7_45B9_41C3_7679DA9AB5C5, this.video_BD82AAE9_A2A7_C4DA_41E2_E00AC1A3C866, this.playList_ACF15129_BF4D_3E86_419A_C22578B6EE8E, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_8D322CF2_9FB4_365E_41D2_7C2A8C1FCF7A",
   "yaw": 27.39,
   "pitch": 1.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Quality Testing Module"
 }
},
{
 "id": "viewer_uidA7B9E4B2_BFB6_C78A_41E3_63AAA1249FE4VideoPlayer",
 "viewerArea": "this.viewer_uidA7B9E4B2_BFB6_C78A_41E3_63AAA1249FE4",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "maps": [
  {
   "yaw": -90.09,
   "hfov": 17.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_87512DAD_9DFE_7B41_41E2_E24C126CE6DC",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3, this.camera_AB99A6DB_BFB6_C3BA_41D6_4847C3D3ADEE); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.72,
   "image": "this.AnimatedImageResource_B5673E4C_9FF2_59C7_41CF_880521A7595C",
   "yaw": -90.09,
   "pitch": -17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -0.86,
   "hfov": 18.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -12.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_877D3A68_9DFE_39C0_41E0_BD9C4F7E78B9",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EF635_9D52_4940_41DE_62177C61378C, this.camera_ABA076E8_BFB6_C386_41DC_2B98FA1779EE); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.09,
   "image": "this.AnimatedImageResource_B564AE4C_9FF2_59C7_41DD_CBE3625C7211",
   "yaw": -0.86,
   "pitch": -12.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 17.89,
   "hfov": 7.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 1.27,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_B7F03209_9FF3_C940_41D6_59EF0AA0DC74",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.72,
   "image": "this.AnimatedImageResource_B7F912F5_9FF2_4EC0_41BB_5233CA31A23C",
   "yaw": 17.89,
   "pitch": 1.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "id": "viewer_uidA7BE04B6_BFB6_C78A_41E5_DB7D5346A348VideoPlayer",
 "viewerArea": "this.viewer_uidA7BE04B6_BFB6_C78A_41E5_DB7D5346A348",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "maps": [
  {
   "yaw": 12.53,
   "hfov": 17.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -14.26,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8E689493_9D72_C940_41CF_E9513E63328A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3, this.camera_AC1B6643_BFB6_C28A_41E7_D08A6436A710); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.96,
   "image": "this.AnimatedImageResource_8AD132AC_9DED_C947_41D6_D69DA5F8D004",
   "yaw": 12.53,
   "pitch": -14.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -175.54,
   "hfov": 15.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.45,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_89F05638_9D72_494F_4192_E7073D503EAA",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756, this.camera_AC22364F_BFB6_C29A_41E7_B567F25DEB43); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.64,
   "image": "this.AnimatedImageResource_8AD182AC_9DED_C947_41CD_9C60E21222B2",
   "yaw": -175.54,
   "pitch": -32.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -81.3,
   "hfov": 15.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 16.76,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8981F292_9D72_4940_41D5_2B73E994870A",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08, this.camera_AC2F065C_BFB6_C2BE_41DF_02B16561AD4B); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.9,
   "image": "this.AnimatedImageResource_8AD1D2AC_9DED_C947_41B1_F9499DABA1F6",
   "yaw": -81.3,
   "pitch": 16.76,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "data": {
  "label": "Circle Arrow 04 Right-Up"
 },
 "enabledInCardboard": true
},
{
 "id": "viewer_uidA7B124AE_BFB6_C79A_41CB_DE322B5CEC11VideoPlayer",
 "viewerArea": "this.viewer_uidA7B124AE_BFB6_C79A_41CB_DE322B5CEC11",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7BE04B6_BFB6_C78A_41E5_DB7D5346A348",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9668"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "maps": [
  {
   "yaw": -79.79,
   "hfov": 17.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -15.63,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BC1F53B8_9EB6_4F4F_41E3_997B525047D1",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_90613180_9D55_CB40_41E2_7B563653B381, this.camera_ABB9D701_BFB6_C286_41DA_868574401064); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.85,
   "image": "this.AnimatedImageResource_B56F6E56_9FF2_59C3_4197_60366C0744C4",
   "yaw": -79.79,
   "pitch": -15.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -7.72,
   "hfov": 17.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_1_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -17,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BC7B8EDB_9EB6_36C1_41D6_DEC7235BDBAC",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907E7820_9D55_F940_41D6_BCB778E30947, this.camera_ABAC56F4_BFB6_C38E_41DC_7C9E53DE6735); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.72,
   "image": "this.AnimatedImageResource_B56CCE56_9FF2_59C3_41B8_D18735CCD0EC",
   "yaw": -7.72,
   "pitch": -17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 35.33,
   "hfov": 11.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 4.79,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_B18E6492_A094_76DE_41D1_3D4C4ADC4623",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_AC4EA3DC_BF4A_C1BD_41B2_ECD604CDADF2, this.video_AB405B64_BFB5_428E_41D8_ADB2C6070666, this.playList_A7BDB4B5_BFB6_C78E_41D3_EF9DF7859555, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.8,
   "image": "this.AnimatedImageResource_B2C4C2DF_A094_5246_41DD_A5DA5A320D56",
   "yaw": 35.33,
   "pitch": 4.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "HPLC"
 }
},
{
 "maps": [
  {
   "yaw": -118.97,
   "hfov": 11.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_5_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 6.94,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BD00FAC0_A7E9_C3FE_419C_A506EADE35D2",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_BCA56488_A2A7_4359_41D8_6BAB8500D113, this.video_BB37156B_A2A6_CDDE_41DD_94F2AB6288FE, this.playList_ACE4F134_BF4D_3E8E_41DC_8218407C3E08, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.76,
   "image": "this.AnimatedImageResource_88D062B8_AD99_C4BA_41E1_9AF788076B5C",
   "yaw": -118.97,
   "pitch": 6.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Ion Chromatography"
 }
},
{
 "maps": [
  {
   "yaw": -59.28,
   "hfov": 11.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_6_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.61,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BDD841F9_A2E9_44BA_41E0_3979A7EB21BF",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_ACD5FD64_BF4B_C68E_41C4_7C0DA07E8CD5, this.video_ADECE224_BF4B_428E_41E1_CC5812763614, this.playList_A7BC44B6_BFB6_C78A_41E3_3E30BD630005, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.82,
   "image": "this.AnimatedImageResource_88D722B8_AD99_C4BA_41E0_2D7FE4721CD3",
   "yaw": -59.28,
   "pitch": 3.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "karl Fischer Titrator"
 }
},
{
 "maps": [
  {
   "yaw": 175.88,
   "hfov": 18.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -12.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_86EF6CE0_9DFD_DAFF_41C5_7B47EFE3571D",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_906FDE4D_9D52_59C0_41C0_337FE3031441, this.camera_ACBFA5D2_BFB6_C18A_41DE_8FF72556ECE2); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.07,
   "image": "this.AnimatedImageResource_B5646E4C_9FF2_59C7_41D5_129AD2F396CB",
   "yaw": 175.88,
   "pitch": -12.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -86,
   "hfov": 11.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 3.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_86CD7B43_9DF2_3FC1_41C7_2E5CDE675610",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854, this.camera_ACB4F5C5_BFB6_C18E_41E2_5D1C101913C2); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.82,
   "image": "this.AnimatedImageResource_B5643E4C_9FF2_59C7_41CD_0B5866521669",
   "yaw": -86,
   "pitch": 3.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": 150.38,
   "hfov": 11.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -3.22,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_81A1E5D5_9DF2_4AC1_41DF_990A9B39176E",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF, this.camera_ACC8E5DF_BFB6_C1BA_41E3_D35255A84906); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.82,
   "image": "this.AnimatedImageResource_B5658E4C_9FF2_59C7_41E1_DC6C27E37142",
   "yaw": 150.38,
   "pitch": -3.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7BC04B6_BFB6_C78A_41DC_19AE3B6E9D6E",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9666"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "viewer_uidA7C184B7_BFB6_C78A_41AA_332E66847AE6VideoPlayer",
 "viewerArea": "this.viewer_uidA7C184B7_BFB6_C78A_41AA_332E66847AE6",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "transparencyActive": true,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "borderSize": 0,
 "maxWidth": 58,
 "maxHeight": 58,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 58,
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "data": {
  "name": "IconButton VR"
 },
 "paddingTop": 0,
 "visible": false,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "cursor": "hand",
 "transparencyActive": true,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "width": 100,
 "right": 30,
 "borderSize": 0,
 "maxWidth": 49,
 "maxHeight": 37,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "bottom": 8,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "shadow": false,
 "mode": "push",
 "height": 75,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton VR"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "borderSize": 0,
 "maxWidth": 58,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "maxHeight": 58,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "shadow": false,
 "mode": "toggle",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 58,
 "paddingRight": 0,
 "data": {
  "name": "IconButton HS "
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "borderSize": 0,
 "maxWidth": 58,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "maxHeight": 58,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "shadow": false,
 "mode": "toggle",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 58,
 "paddingRight": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7B724B2_BFB6_C78A_41D4_A641592656C2",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9660"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "maps": [
  {
   "yaw": -12.55,
   "hfov": 11.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -2.82,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8FB387DF_9D76_76C1_41E1_02937EB0E142",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756, this.camera_AC59F68F_BFB6_C39A_41D9_FD73B7FF477D); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.83,
   "image": "this.AnimatedImageResource_8ACF32AA_9DED_C943_41D0_EF73CC721DEE",
   "yaw": -12.55,
   "pitch": -2.82,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Door 01"
 },
 "enabledInCardboard": true
},
{
 "id": "viewer_uidA7BF54B6_BFB6_C78A_41B9_3EC3F82CD447VideoPlayer",
 "viewerArea": "this.viewer_uidA7BF54B6_BFB6_C78A_41B9_3EC3F82CD447",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7B124AE_BFB6_C79A_41CB_DE322B5CEC11",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9656"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "viewer_uidA7BD74B5_BFB6_C78E_41E3_35DA1BAE0140VideoPlayer",
 "viewerArea": "this.viewer_uidA7BD74B5_BFB6_C78E_41E3_35DA1BAE0140",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "id": "viewer_uidA7B4A4B0_BFB6_C786_41C8_39BBCEC495DFVideoPlayer",
 "viewerArea": "this.viewer_uidA7B4A4B0_BFB6_C786_41C8_39BBCEC495DF",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "id": "htmlText_B1B23FD3_A08C_525E_41CB_6C031FEBFFC2",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 0,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 0,
 "paddingLeft": 10,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Memisahkan campuran komponen yang ada dalam larutan.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Menggunakan detektor UV dan FLD</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:16px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:16px;\"># Digunakan untuk analisa phenol pada produk tembakau dan senyawa lainnya</SPAN></SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "HTMLText14710"
 },
 "paddingTop": 10,
 "paddingBottom": 10,
 "scrollBarOpacity": 0.5
},
{
 "id": "viewer_uidA7BC04B6_BFB6_C78A_41DC_19AE3B6E9D6EVideoPlayer",
 "viewerArea": "this.viewer_uidA7BC04B6_BFB6_C78A_41DC_19AE3B6E9D6E",
 "class": "VideoPlayer",
 "displayPlaybackBar": true
},
{
 "maps": [
  {
   "yaw": -95.58,
   "hfov": 18.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_0_0_0_map.gif",
      "width": 28,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -12.89,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_822B964B_9D55_C9C1_41C3_D4CC7FFBEC12",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854, this.camera_AC7606B5_BFB6_C38E_41D7_27C772A209DC); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 18.07,
   "image": "this.AnimatedImageResource_B5609E4E_9FF2_59C3_41E2_3FDC0019D82F",
   "yaw": -95.58,
   "pitch": -12.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Circle Arrow 02a"
 },
 "enabledInCardboard": true
},
{
 "maps": [
  {
   "yaw": -67.47,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BDD4B3B5_9D56_CF41_4191_872AA0128CB4",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_B277F2DE_A6E9_4382_41D5_4380D8A43CDE, this.video_B338FE47_A6E9_C282_41AC_577A1523BAD1, this.playList_ACF3812F_BF4D_3E9A_41D3_05EDDD9E4E3C, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_B5141C7D_A08C_564A_41D8_E70BDA9F2BB0",
   "yaw": -67.47,
   "pitch": 0.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Linear Smoking Machine"
 }
},
{
 "maps": [
  {
   "yaw": 74.32,
   "hfov": 11.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.34,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_BD8C1CAC_9D56_F947_41D6_87A2B5A0DAF4",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_AF30DBD4_BF4B_C18E_41C9_2262E76A454E, this.video_B09A8371_BF4B_4286_41C9_A7817D0DFB3C, this.playList_ACEF7130_BF4D_3E86_41D1_6064725058A5, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_B5144C82_A08C_56BE_41DC_A304C8A9283F",
   "yaw": 74.32,
   "pitch": 0.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Side Stream Smoking Machine"
 }
},
{
 "maps": [
  {
   "yaw": 38.47,
   "hfov": 8.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": 0.71,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "id": "overlay_8270FF37_9D56_7741_41D5_F3692915DF48",
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showPopupMedia(this.window_AF8A37E2_BF55_418A_41D0_7DCA36663156, this.video_AE445E03_BF55_428A_41E6_975DE2211CA9, this.playList_ACE83130_BF4D_3E86_41DC_F7D67AD466EB, '70%', '70%', false, true)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.88,
   "image": "this.AnimatedImageResource_B513FC83_A08C_56BE_41CA_1858FA63332C",
   "yaw": 38.47,
   "pitch": 0.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "data": {
  "label": "Rotary Smoking Machine"
 }
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "viewer_uidA7B4A4B0_BFB6_C786_41C8_39BBCEC495DF",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 100,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "ViewerArea9658"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "1.11vmin",
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarVisible": "rollOver",
 "width": 110,
 "scrollBarMargin": 2,
 "borderSize": 0,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "layout": "horizontal",
 "right": "0%",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "top": "0%",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 110,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "button menu sup"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "scrollBarMargin": 2,
 "right": "0%",
 "borderSize": 0,
 "width": "91.304%",
 "layout": "vertical",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "paddingRight": 0,
 "height": "85.959%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "-button set"
 },
 "paddingTop": 0,
 "gap": 3,
 "visible": false,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "fontFamily": "Bebas Neue Bold",
 "id": "Label_0DD14F09_1744_0507_41AA_D8475423214A",
 "left": 0,
 "fontColor": "#FFFFFF",
 "width": 273.6,
 "borderSize": 0,
 "maxWidth": 7000,
 "maxHeight": 7000,
 "horizontalAlign": "left",
 "text": "FILTRONA",
 "textShadowHorizontalLength": 0,
 "backgroundOpacity": 0,
 "class": "Label",
 "minHeight": 1,
 "textShadowColor": "#000000",
 "textShadowBlurRadius": 10,
 "textShadowVerticalLength": 0,
 "shadow": false,
 "borderRadius": 0,
 "top": 5,
 "fontSize": 90,
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 74,
 "paddingRight": 0,
 "verticalAlign": "top",
 "fontStyle": "normal",
 "data": {
  "name": "text 1"
 },
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "bold",
 "visible": false,
 "paddingBottom": 0,
 "textShadowOpacity": 1
},
{
 "fontFamily": "Bebas Neue Book",
 "id": "Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2",
 "left": 0,
 "fontColor": "#FFFFFF",
 "width": 388,
 "borderSize": 0,
 "textShadowColor": "#000000",
 "horizontalAlign": "left",
 "text": "scientific services",
 "textShadowHorizontalLength": 0,
 "backgroundOpacity": 0,
 "class": "Label",
 "minHeight": 1,
 "bottom": 0,
 "textShadowBlurRadius": 10,
 "textShadowVerticalLength": 0,
 "shadow": false,
 "borderRadius": 0,
 "fontSize": 41,
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 46,
 "paddingRight": 0,
 "verticalAlign": "top",
 "fontStyle": "normal",
 "data": {
  "name": "text 2"
 },
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "normal",
 "visible": false,
 "paddingBottom": 0,
 "textShadowOpacity": 1
},
{
 "id": "Image_8DDC27A5_9D52_D741_41CD_D044CFEE87FD",
 "left": "0%",
 "maxWidth": 2083,
 "borderSize": 0,
 "width": "24.55%",
 "maxHeight": 551,
 "url": "skin/Image_8DDC27A5_9D52_D741_41CD_D044CFEE87FD.png",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "Image",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "top": "4.36%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "26.316%",
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image4809"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "maxWidth": 3000,
 "right": "0%",
 "borderSize": 0,
 "maxHeight": 2,
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "Image",
 "minHeight": 1,
 "bottom": 53,
 "shadow": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 2,
 "paddingRight": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "white line"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": 1199,
 "scrollBarMargin": 2,
 "borderSize": 0,
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52"
 ],
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 30,
 "propagateClick": true,
 "height": 51,
 "paddingRight": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "-button set container"
 },
 "paddingTop": 0,
 "gap": 3,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "10%",
 "borderSize": 0,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "top": "5%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "5%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "scrollBarMargin": 2,
 "right": "10%",
 "borderSize": 0,
 "layout": "vertical",
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "80%",
 "shadow": false,
 "borderRadius": 0,
 "top": "5%",
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "10%",
 "borderSize": 0,
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "top": "5%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "5%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "scrollBarMargin": 2,
 "right": "10%",
 "borderSize": 0,
 "layout": "vertical",
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "80%",
 "shadow": false,
 "borderRadius": 0,
 "top": "5%",
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "layout": "vertical",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "top": "7%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "7%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "10%",
 "borderSize": 0,
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "top": "5%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "5%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "scrollBarMargin": 2,
 "right": "10%",
 "borderSize": 0,
 "layout": "vertical",
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "80%",
 "top": "5%",
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer"
 ],
 "layout": "vertical",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "top": "7%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "7%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "layout": "vertical",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "top": "7%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "7%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "15%",
 "borderSize": 0,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "layout": "vertical",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "top": "7%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "7%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadowColor": "#000000",
 "right": "10%",
 "borderSize": 0,
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "top": "5%",
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "5%",
 "shadow": true,
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "gap": 10,
 "shadowHorizontalLength": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "scrollBarMargin": 2,
 "right": "10%",
 "borderSize": 0,
 "layout": "vertical",
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "bottom": "80%",
 "top": "5%",
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0_HS_0_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B5167C7C_A08C_564A_41C1_3BA6C325721B",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_906C62E2_9D56_4EC3_41D7_07728EE8DD77_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5623E4D_9FF2_59C1_41E0_84C8166B58AF",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B567BE4B_9FF2_59C1_41D8_63C8FCEB6163",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E9D51_9D52_5BC1_41E3_9CA9DC7D3551_0_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B17144DC_A074_D64A_41D3_9B4180E019C1",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0_HS_0_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B50E2C87_A08C_56C6_41DA_C85A75C4BDC0",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B50E5C87_A08C_56C6_41DC_C7EB5FEC4E67",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90102752_9D55_D7C0_41AD_B3B5B679A4F4_0_HS_3_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56A5E57_9FF2_59C1_41D4_92B19DDB527F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD242AC_9DED_C947_41DD_F01F584F7904",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD292AD_9DED_C941_41B6_1FE579F5A9B5",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD2C2AD_9DED_C941_41E2_E4462FB8B4BC",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907ED657_9D52_49C1_41E0_3BCDCC108EE3_0_HS_3_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD332AD_9DED_C941_41E1_8E5BEDBC5B92",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5615E4F_9FF2_59C1_41E2_024685967470",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907C3B1D_9D56_5F41_41D0_3AA0DE5E0E08_0_HS_1_0.png",
   "width": 536,
   "height": 804,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5612E4F_9FF2_59C1_41C9_18C4CE36528F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_906D9A6F_9D56_39C0_41AB_5254AF7EF00C_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B563FE4E_9FF2_59C3_41C6_19CA0C152D1E",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56C2E57_9FF2_59C1_41DF_6BF55E58A0BC",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B50F5C86_A08C_56C6_41DE_1BA273392127",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E7820_9D55_F940_41D6_BCB778E30947_0_HS_3_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B50E9C86_A08C_56C6_41D2_23F2A783A2BB",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0_HS_0_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_8AD312AE_9DED_C943_41D0_7B90D80CE951",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90631E96_9D55_D943_41E1_075253E49390_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B567DE4B_9FF2_59C1_41DD_046359E7871C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5656E4D_9FF2_59C1_41C9_F14F8CF7E566",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5652E4D_9FF2_59C1_41CD_84A970D77B3A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_93BBA2DA_9D56_4EC0_41E2_E0D5EDC261FF_0_HS_2_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B562AE4D_9FF2_59C1_41B5_F7D14CF312C4",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56E8E4F_9FF2_59C1_41BB_0A9004CF7470",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56E5E4F_9FF2_59C1_41DA_F1468764473F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56FEE4F_9FF2_59C1_41DD_4ED3E8A2C65D",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_4_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56E8E50_9FF2_59DF_41CE_D9CE420D27F9",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90613180_9D55_CB40_41E2_7B563653B381_0_HS_5_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_AEC882A9_9F52_4940_41A8_B8484FD1EAB6",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56E4E55_9FF2_59C1_41DA_D358DC3C37C3",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0_HS_1_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B5114C85_A08C_56BA_41E2_EFA4A38E5049",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_9062F88A_9D55_D943_4192_62948FF5C8D9_0_HS_2_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56FFE56_9FF2_59C3_41DA_40E5EA7C88D7",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD0A2AB_9DED_C941_41CB_142E94A7BD6C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EA6EF_9D52_36C1_41D2_3B20E121D756_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD0F2AB_9DED_C941_41C6_B3558EDDE7D4",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5636E4E_9FF2_59C3_41DC_EC106EFC3C80",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5632E4E_9FF2_59C3_41DC_BD6801CB32B0",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_1_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_8D326CF2_9FB4_365E_41E2_99EC1308A483",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EFDAA_9D52_7B43_419C_6DAC8E978854_1_HS_3_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_8D322CF2_9FB4_365E_41D2_7C2A8C1FCF7A",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5673E4C_9FF2_59C7_41CF_880521A7595C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B564AE4C_9FF2_59C7_41DD_CBE3625C7211",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_906FDE4D_9D52_59C0_41C0_337FE3031441_0_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B7F912F5_9FF2_4EC0_41BB_5233CA31A23C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD132AC_9DED_C947_41D6_D69DA5F8D004",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD182AC_9DED_C947_41CD_9C60E21222B2",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E5E80_9D52_393F_41E3_3D796633E7B4_0_HS_2_0.png",
   "width": 536,
   "height": 804,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8AD1D2AC_9DED_C947_41B1_F9499DABA1F6",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56F6E56_9FF2_59C3_4197_60366C0744C4",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_1_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B56CCE56_9FF2_59C3_41B8_D18735CCD0EC",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_4_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B2C4C2DF_A094_5246_41DD_A5DA5A320D56",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_5_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_88D062B8_AD99_C4BA_41E1_9AF788076B5C",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_90602F9E_9D55_D740_41E3_6A1240018ABB_0_HS_6_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_88D722B8_AD99_C4BA_41E0_2D7FE4721CD3",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5646E4C_9FF2_59C7_41D5_129AD2F396CB",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0_HS_1_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5643E4C_9FF2_59C7_41CD_0B5866521669",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EF635_9D52_4940_41DE_62177C61378C_0_HS_2_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5658E4C_9FF2_59C7_41E1_DC6C27E37142",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907E7F38_9D55_F74F_41C0_7FCCD554B720_0_HS_0_0.png",
   "width": 800,
   "height": 1200,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_8ACF32AA_9DED_C943_41D0_EF73CC721DEE",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_0_0.png",
   "width": 1080,
   "height": 900,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 24,
 "id": "AnimatedImageResource_B5609E4E_9FF2_59C3_41E2_3FDC0019D82F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_1_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B5141C7D_A08C_564A_41D8_E70BDA9F2BB0",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_2_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B5144C82_A08C_56BE_41DC_A304C8A9283F",
 "class": "AnimatedImageResource"
},
{
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_907EC518_9D52_4B40_41D1_B60E6A7161C2_0_HS_3_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "rowCount": 6,
 "frameCount": 22,
 "id": "AnimatedImageResource_B513FC83_A08C_56BE_41CA_1858FA63332C",
 "class": "AnimatedImageResource"
},
{
 "transparencyActive": true,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "borderSize": 0,
 "maxWidth": 60,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "shadow": false,
 "mode": "toggle",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 60,
 "paddingRight": 0,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "data": {
  "name": "image button menu"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "width": 58,
 "borderSize": 0,
 "maxWidth": 58,
 "maxHeight": 58,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 58,
 "paddingRight": 0,
 "click": "this.shareTwitter(window.location.href)",
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "data": {
  "name": "IconButton TWITTER"
 },
 "paddingTop": 0,
 "visible": false,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "transparencyActive": true,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "width": 58,
 "borderSize": 0,
 "maxWidth": 58,
 "maxHeight": 58,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 1,
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": true,
 "height": 58,
 "paddingRight": 0,
 "click": "this.shareFacebook(window.location.href)",
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "data": {
  "name": "IconButton FB"
 },
 "paddingTop": 0,
 "visible": false,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "Button house info"
 },
 "iconWidth": 0,
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "fontColor": "#FFFFFF",
 "pressedBackgroundOpacity": 1,
 "width": 120,
 "shadowColor": "#000000",
 "rollOverShadow": false,
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0,
 "class": "Button",
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconHeight": 0,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "height": 40,
 "paddingRight": 0,
 "fontSize": 12,
 "backgroundColor": [
  "#000000"
 ],
 "label": "HOUSE INFO",
 "fontStyle": "normal",
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "bold",
 "gap": 5,
 "visible": false,
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ]
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "Button panorama list"
 },
 "iconWidth": 32,
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "fontColor": "#FFFFFF",
 "pressedBackgroundOpacity": 1,
 "width": 130,
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0,
 "class": "Button",
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "height": 40,
 "paddingRight": 0,
 "fontSize": 12,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "PANORAMA LIST",
 "fontStyle": "normal",
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "bold",
 "gap": 5,
 "visible": false,
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ]
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "Button location"
 },
 "iconWidth": 32,
 "id": "Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
 "fontColor": "#FFFFFF",
 "pressedBackgroundOpacity": 1,
 "width": 90,
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0,
 "class": "Button",
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "height": 40,
 "paddingRight": 0,
 "fontSize": 12,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "LOCATION",
 "fontStyle": "normal",
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "bold",
 "gap": 5,
 "visible": false,
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ]
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "Button floorplan"
 },
 "iconWidth": 32,
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "fontColor": "#FFFFFF",
 "pressedBackgroundOpacity": 1,
 "width": 103,
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0,
 "class": "Button",
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "height": 40,
 "paddingRight": 0,
 "fontSize": 12,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "FLOORPLAN",
 "fontStyle": "normal",
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "bold",
 "gap": 5,
 "visible": false,
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ]
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "Button photoalbum"
 },
 "iconWidth": 32,
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "fontColor": "#FFFFFF",
 "pressedBackgroundOpacity": 1,
 "width": 112,
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0,
 "class": "Button",
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "height": 40,
 "paddingRight": 0,
 "fontSize": 12,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "PHOTOALBUM",
 "fontStyle": "normal",
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "bold",
 "gap": 5,
 "visible": false,
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ]
},
{
 "fontFamily": "Montserrat",
 "data": {
  "name": "Button realtor"
 },
 "iconWidth": 32,
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "fontColor": "#FFFFFF",
 "pressedBackgroundOpacity": 1,
 "width": 90,
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "horizontalAlign": "center",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0,
 "class": "Button",
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "height": 40,
 "paddingRight": 0,
 "fontSize": 12,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "label": "ROOM",
 "fontStyle": "normal",
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "bold",
 "gap": 5,
 "visible": false,
 "cursor": "hand",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ]
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "85%",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "layout": "absolute",
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "-left"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "50%",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 460,
 "paddingLeft": 50,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 50,
 "height": "100%",
 "scrollBarColor": "#0069A3",
 "overflow": "visible",
 "data": {
  "name": "-right"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 20,
 "scrollBarOpacity": 0.51
},
{
 "transparencyActive": false,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "85%",
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "layout": "absolute",
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "-left"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "50%",
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 460,
 "paddingLeft": 50,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 50,
 "height": "100%",
 "scrollBarColor": "#0069A3",
 "overflow": "visible",
 "data": {
  "name": "-right"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 20,
 "scrollBarOpacity": 0.51
},
{
 "transparencyActive": false,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": 140,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "scrollBarVisible": "rollOver",
 "itemThumbnailShadow": false,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "paddingBottom": 70,
 "width": "100%",
 "rollOverItemLabelFontColor": "#04A3E1",
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "horizontalAlign": "center",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelFontFamily": "Montserrat",
 "itemThumbnailOpacity": 1,
 "backgroundOpacity": 0.05,
 "itemMaxHeight": 1000,
 "minHeight": 1,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemHorizontalAlign": "center",
 "shadow": false,
 "itemLabelPosition": "bottom",
 "itemBorderRadius": 0,
 "itemPaddingLeft": 3,
 "backgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "minWidth": 1,
 "itemThumbnailBorderRadius": 0,
 "propagateClick": false,
 "height": "100%",
 "paddingRight": 70,
 "itemWidth": 220,
 "itemPaddingRight": 3,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "selectedItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "selectedItemLabelFontWeight": "bold",
 "itemMinHeight": 50,
 "itemOpacity": 1,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemBackgroundColorRatios": [],
 "backgroundColorDirection": "vertical",
 "itemBackgroundOpacity": 0,
 "scrollBarMargin": 2,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "borderSize": 0,
 "itemVerticalAlign": "top",
 "itemLabelTextDecoration": "none",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemLabelFontWeight": "normal",
 "class": "ThumbnailGrid",
 "scrollBarWidth": 10,
 "itemThumbnailHeight": 125,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 14,
 "itemHeight": 156,
 "borderRadius": 5,
 "rollOverItemThumbnailShadow": true,
 "itemMinWidth": 50,
 "selectedItemThumbnailShadow": true,
 "paddingLeft": 70,
 "backgroundColorRatios": [
  0
 ],
 "itemLabelFontColor": "#666666",
 "itemBackgroundColorDirection": "vertical",
 "scrollBarColor": "#04A3E1",
 "data": {
  "name": "ThumbnailList"
 },
 "paddingTop": 10,
 "gap": 26,
 "itemThumbnailWidth": 220,
 "itemLabelGap": 7,
 "itemPaddingBottom": 3,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "85%",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "layout": "absolute",
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "-left"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "15%",
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 400,
 "paddingLeft": 50,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 50,
 "height": "100%",
 "scrollBarColor": "#0069A3",
 "overflow": "visible",
 "data": {
  "name": "-right"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 20,
 "scrollBarOpacity": 0.51
},
{
 "transparencyActive": false,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": 140,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "paddingBottom": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "toolTipPaddingBottom": 4,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 1,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "Floor Plan"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "9px",
 "toolTipTextShadowColor": "#000000"
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": 140,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Container photo"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "layout": "absolute",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "data": {
  "name": "Container photo"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "55%",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "layout": "absolute",
 "horizontalAlign": "center",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "-left"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "45%",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 1,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 460,
 "paddingLeft": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 60,
 "height": "100%",
 "scrollBarColor": "#0069A3",
 "overflow": "visible",
 "data": {
  "name": "-right"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 20,
 "scrollBarOpacity": 0.51
},
{
 "transparencyActive": false,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "maxWidth": 2000,
 "borderSize": 0,
 "width": "100%",
 "maxHeight": 1000,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "Image",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "top": "0%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "100%",
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "layout": "horizontal",
 "horizontalAlign": "right",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 0,
 "scrollBarWidth": 10,
 "height": 60,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 520,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 100,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#E73B2C",
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 30,
 "scrollBarOpacity": 0.79
},
{
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": 370,
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": 40,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "toolTipFontSize": "9px",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "right": 0,
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "minWidth": 1,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "class": "ViewerArea",
 "bottom": 0,
 "top": 0,
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "Viewer info 1"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "toolTipTextShadowColor": "#000000"
},
{
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "top": "0%",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container arrows"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "layout": "horizontal",
 "horizontalAlign": "right",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 0,
 "scrollBarWidth": 10,
 "height": 60,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 520,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 100,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#E73B2C",
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 30,
 "scrollBarOpacity": 0.79
},
{
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": 370,
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": 40,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": "77.115%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 100,
 "scrollBarWidth": 10,
 "shadow": false,
 "borderRadius": 0,
 "top": "0%",
 "minWidth": 1,
 "paddingLeft": 80,
 "propagateClick": false,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.01vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.01vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "HTMLText54192"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "transparencyActive": false,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "100%",
 "right": 20,
 "maxHeight": 60,
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "shadow": false,
 "mode": "push",
 "top": 20,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "paddingRight": 0,
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "left": "0%",
 "right": "0%",
 "borderSize": 0,
 "insetBorder": false,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "scrollEnabled": true,
 "backgroundOpacity": 1,
 "top": "0%",
 "class": "WebFrame",
 "minHeight": 1,
 "bottom": "0%",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "borderRadius": 0,
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "layout": "horizontal",
 "horizontalAlign": "right",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 0,
 "scrollBarWidth": 10,
 "height": 60,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 520,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 100,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#E73B2C",
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 30,
 "scrollBarOpacity": 0.79
},
{
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": 370,
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": 40,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": "77.115%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 100,
 "scrollBarWidth": 10,
 "shadow": false,
 "borderRadius": 0,
 "top": "0%",
 "minWidth": 1,
 "paddingLeft": 80,
 "propagateClick": false,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.01vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.01vh;font-family:'Bebas Neue Bold';\">FLOORPLAN:</SPAN></SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "HTMLText54192"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "transparencyActive": false,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "100%",
 "right": 20,
 "maxHeight": 60,
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "shadow": false,
 "mode": "push",
 "top": 20,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "paddingRight": 0,
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "width": "77.115%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 100,
 "scrollBarWidth": 10,
 "shadow": false,
 "borderRadius": 0,
 "top": "0%",
 "minWidth": 1,
 "paddingLeft": 80,
 "propagateClick": false,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.01vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.01vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#000000",
 "data": {
  "name": "HTMLText54192"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "transparencyActive": false,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "100%",
 "right": 20,
 "maxHeight": 60,
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "shadow": false,
 "mode": "push",
 "top": 20,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg",
 "paddingRight": 0,
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "toolTipFontSize": "9px",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 1,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "class": "ViewerArea",
 "top": "0%",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "Viewer photoalbum + text 1"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "toolTipTextShadowColor": "#000000"
},
{
 "cursor": "hand",
 "transparencyActive": false,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "maxWidth": 60,
 "borderSize": 0,
 "width": "14.22%",
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "bottom": "20%",
 "shadow": false,
 "mode": "push",
 "top": "20%",
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton <"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "cursor": "hand",
 "transparencyActive": false,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "maxWidth": 60,
 "right": 10,
 "borderSize": 0,
 "width": "14.22%",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "bottom": "20%",
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "shadow": false,
 "mode": "push",
 "top": "20%",
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton >"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "toolTipFontSize": "9px",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "height": "100%",
 "minWidth": 1,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "paddingRight": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipFontColor": "#606060",
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowHorizontalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "toolTipShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundOpacity": 1,
 "transitionDuration": 500,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBottom": 2,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "class": "ViewerArea",
 "top": "0%",
 "progressBorderSize": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "transitionMode": "blending",
 "progressBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "paddingTop": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingBottom": 0,
 "toolTipTextShadowColor": "#000000"
},
{
 "cursor": "hand",
 "transparencyActive": false,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxWidth": 60,
 "borderSize": 0,
 "width": "14.22%",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "bottom": "20%",
 "shadow": false,
 "mode": "push",
 "top": "20%",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton <"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "cursor": "hand",
 "transparencyActive": false,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxWidth": 60,
 "right": 10,
 "borderSize": 0,
 "width": "14.22%",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "bottom": "20%",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "shadow": false,
 "mode": "push",
 "top": "20%",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "paddingRight": 0,
 "data": {
  "name": "IconButton >"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "transparencyActive": false,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxWidth": 60,
 "borderSize": 0,
 "width": "10%",
 "right": 20,
 "maxHeight": 60,
 "horizontalAlign": "right",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 50,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "shadow": false,
 "mode": "push",
 "top": 20,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 50,
 "paddingLeft": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "paddingRight": 0,
 "height": "10%",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "maxWidth": 2000,
 "borderSize": 0,
 "width": "100%",
 "maxHeight": 1000,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "Image",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "top": "0%",
 "verticalAlign": "bottom",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "100%",
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "layout": "horizontal",
 "horizontalAlign": "right",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 0,
 "scrollBarWidth": 10,
 "height": 60,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 20,
 "gap": 0,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "layout": "vertical",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 520,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 100,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "100%",
 "scrollBarColor": "#E73B2C",
 "overflow": "scroll",
 "data": {
  "name": "Container text"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 30,
 "scrollBarOpacity": 0.79
},
{
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": 370,
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "height": 40,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "paddingRight": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container space"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.58vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.5vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.5vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.25vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.25vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.71vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.71vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.71vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.71vh;font-family:'Bebas Neue Bold';\"><B>lorem ipsum:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.52vh;font-family:'Bebas Neue Bold';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#04A3E1",
 "data": {
  "name": "HTMLText"
 },
 "paddingTop": 0,
 "paddingBottom": 20,
 "scrollBarOpacity": 0.5
},
{
 "fontFamily": "Bebas Neue Bold",
 "backgroundColorDirection": "vertical",
 "iconWidth": 32,
 "height": "9%",
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "layout": "horizontal",
 "shadowSpread": 1,
 "width": "46%",
 "shadowBlurRadius": 6,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0.7,
 "class": "Button",
 "minHeight": 1,
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "propagateClick": false,
 "backgroundColor": [
  "#04A3E1"
 ],
 "paddingRight": 0,
 "fontSize": "3vh",
 "fontStyle": "normal",
 "label": "lorem ipsum",
 "gap": 5,
 "data": {
  "name": "Button"
 },
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "normal",
 "cursor": "hand",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1
},
{
 "transparencyActive": true,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "maxWidth": 150,
 "borderSize": 0,
 "width": "12%",
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "maxHeight": 150,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 70,
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 70,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "8%",
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png",
 "data": {
  "name": "IconButton <"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "scrollBarVisible": "rollOver",
 "width": "80%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "layout": "absolute",
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "Container",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "contentOpaque": false,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "30%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "Container separator"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "transparencyActive": true,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "maxWidth": 150,
 "borderSize": 0,
 "width": "12%",
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "maxHeight": 150,
 "horizontalAlign": "center",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "minHeight": 70,
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 70,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "8%",
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png",
 "data": {
  "name": "IconButton >"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "paddingBottom": 0
},
{
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.58vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.5vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.5vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.25vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.25vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></DIV><p STYLE=\"margin:0; line-height:2.71vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.71vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Nam sed faucibus est.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Ut eget lorem sed leo.</SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#04A3E1",
 "data": {
  "name": "HTMLText"
 },
 "paddingTop": 0,
 "paddingBottom": 20,
 "scrollBarOpacity": 0.5
},
{
 "fontFamily": "Bebas Neue Bold",
 "backgroundColorDirection": "vertical",
 "iconWidth": 32,
 "height": "9%",
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "borderSize": 0,
 "rollOverBackgroundOpacity": 1,
 "layout": "horizontal",
 "shadowSpread": 1,
 "width": "46%",
 "shadowBlurRadius": 6,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0.7,
 "class": "Button",
 "minHeight": 1,
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "propagateClick": false,
 "backgroundColor": [
  "#04A3E1"
 ],
 "paddingRight": 0,
 "fontSize": "3vh",
 "fontStyle": "normal",
 "label": "lorem ipsum",
 "gap": 5,
 "data": {
  "name": "Button"
 },
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "normal",
 "cursor": "hand",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1
},
{
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.58vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.5vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.25vh;font-family:'Bebas Neue Bold';\">address line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.25vh;font-family:'Bebas Neue Bold';\">address line 2</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.01vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac.</SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#04A3E1",
 "data": {
  "name": "HTMLText"
 },
 "paddingTop": 0,
 "paddingBottom": 20,
 "scrollBarOpacity": 0.5
},
{
 "fontFamily": "Bebas Neue Bold",
 "iconWidth": 32,
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "fontColor": "#FFFFFF",
 "backgroundColorDirection": "vertical",
 "shadowColor": "#000000",
 "borderSize": 0,
 "width": 207,
 "layout": "horizontal",
 "shadowSpread": 1,
 "rollOverBackgroundOpacity": 1,
 "shadowBlurRadius": 6,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundOpacity": 0.7,
 "class": "Button",
 "minHeight": 1,
 "height": 59,
 "iconHeight": 32,
 "shadow": false,
 "mode": "push",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "propagateClick": false,
 "backgroundColor": [
  "#04A3E1"
 ],
 "paddingRight": 0,
 "fontSize": 34,
 "fontStyle": "normal",
 "label": "lorem ipsum",
 "gap": 5,
 "data": {
  "name": "Button"
 },
 "paddingTop": 0,
 "textDecoration": "none",
 "fontWeight": "normal",
 "visible": false,
 "cursor": "hand",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1
},
{
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.58vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.09vh;font-family:'Bebas Neue Bold';\">real estate agent</SPAN></SPAN></DIV></div>",
 "height": "45%",
 "scrollBarColor": "#04A3E1",
 "data": {
  "name": "HTMLText18899"
 },
 "paddingTop": 0,
 "paddingBottom": 10,
 "scrollBarOpacity": 0.5
},
{
 "backgroundColorDirection": "vertical",
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "width": "100%",
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "layout": "horizontal",
 "horizontalAlign": "left",
 "backgroundOpacity": 0.3,
 "class": "Container",
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadow": false,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "height": "80%",
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "data": {
  "name": "- content"
 },
 "paddingTop": 0,
 "gap": 10,
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
},
{
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "maxWidth": 200,
 "borderSize": 0,
 "width": "25%",
 "maxHeight": 200,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "horizontalAlign": "left",
 "backgroundOpacity": 0,
 "class": "Image",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "minWidth": 1,
 "paddingLeft": 0,
 "propagateClick": false,
 "paddingRight": 0,
 "height": "100%",
 "scaleMode": "fit_inside",
 "data": {
  "name": "agent photo"
 },
 "paddingTop": 0,
 "paddingBottom": 0
},
{
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "scrollBarVisible": "rollOver",
 "width": "75%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "minHeight": 1,
 "shadow": false,
 "borderRadius": 0,
 "minWidth": 1,
 "paddingLeft": 10,
 "propagateClick": false,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.25vh;font-family:'Bebas Neue Bold';\">john doe</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.03vh;font-family:'Bebas Neue Bold';\">licensed real estate salesperson</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.76vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.76vh;font-family:'Bebas Neue Bold';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.76vh;font-family:'Bebas Neue Bold';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.76vh;font-family:'Bebas Neue Bold';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.95vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.95vh;font-family:Arial, Helvetica, sans-serif;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></DIV></div>",
 "height": "100%",
 "scrollBarColor": "#04A3E1",
 "data": {
  "name": "HTMLText19460"
 },
 "paddingTop": 0,
 "paddingBottom": 10,
 "scrollBarOpacity": 0.5
}],
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
