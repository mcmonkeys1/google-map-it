var contextMenu = require("sdk/context-menu");
var tabs = require("sdk/tabs");
//var prefs = require("sdk/simple-prefs").prefs;


var menuItem = contextMenu.Item({
  label: "Google Map It",
  context: contextMenu.SelectionContext(),
  contentScript: 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  self.postMessage(text);' +
                 '});',
	accessKey: "g",
  onMessage: function (selectionText) {
    selectionText = selectionText.trim()
    selectionText = encodeURI(selectionText);
    var index = tabs.activeTab.index;
  	tabs.open({
  		url: "https://maps.google.com/maps?q=" + selectionText,
			onOpen: function (tab) {
      	tab.index = index+1;
      }
  	});
  }
});
