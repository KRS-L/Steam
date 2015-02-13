// ==UserScript==
// @name Steam Inventory to SubID
// @description Resolves the SubID for gifts in your inventory and takes you to the relevant page on SteamDB.
// @namespace steam_inventory_to_subid
// @include http*://steamcommunity.com/id/*/inventory*
// @include http*://steamcommunity.com/profiles/*/inventory*
// @version 1.1
// @author KRS_L
// @grant none
// ==/UserScript==

window.addEventListener('load', function () {
	try {
		if (window.g_bViewingOwnProfile) {
			var loadingIcon = "data:image/gif;base64,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";
			var steamdbIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNIDYzLjkgMCBDIDMwLjUgMCAzLjEgMTEuOSAwLjEgMjcuMSBsIDM1LjYgNi43IGMgMi45IC0wLjkgNi4yIC0xLjMgOS42IC0xLjMgbCAxNi43IC0xMCBjIC0wLjIgLTIuNSAxLjMgLTUuMSA0LjcgLTcuMiA0LjggLTMuMSAxMi4zIC00LjggMTkuOSAtNC44IDUuMiAtMC4xIDEwLjUgMC43IDE1IDIuMiAxMS4yIDMuOCAxMy43IDExLjEgNS43IDE2LjMgLTUuMSAzLjMgLTEzLjMgNSAtMjEuNCA0LjggbCAtMjIgNy45IGMgLTAuMiAxLjYgLTEuMyAzLjEgLTMuNCA0LjUgLTUuOSAzLjggLTE3LjQgNC43IC0yNS42IDEuOSAtMy42IC0xLjIgLTYgLTMgLTcgLTQuOCBMIDIuNSAzOC40IEMgNC44IDQyIDguNSA0NS4zIDEzLjMgNDguMiA1IDUzIDAgNTkgMCA2NS41IDAgNzEuOSA0LjggNzcuOCAxMi45IDgyLjYgNC44IDg3LjMgMCA5My4yIDAgOTkuNiAwIDExNS4zIDI4LjYgMTI4IDY0IDEyOCA5OS4zIDEyOCAxMjggMTE1LjMgMTI4IDk5LjYgMTI4IDkzLjIgMTIzLjIgODcuMyAxMTUuMSA4Mi42IDEyMy4yIDc3LjggMTI4IDcxLjkgMTI4IDY1LjUgMTI4IDU5IDEyMyA1Mi45IDExNC42IDQ4LjEgMTIyLjkgNDMgMTI3LjkgMzYuNyAxMjcuOSAyOS45IDEyNy45IDEzLjQgOTkuMiAwIDYzLjkgMCBaIG0gMjIuOCAxNC4yIGMgLTUuMiAwLjEgLTEwLjIgMS4yIC0xMy40IDMuMyAtNS41IDMuNiAtMy44IDguNSAzLjggMTEuMSA3LjYgMi42IDE4LjEgMS44IDIzLjYgLTEuOCA1LjUgLTMuNiAzLjggLTguNSAtMy44IC0xMSAtMy4xIC0xIC02LjcgLTEuNSAtMTAuMiAtMS41IHogbSAwLjMgMS43IGMgNy40IDAgMTMuMyAyLjggMTMuMyA2LjIgMCAzLjQgLTUuOSA2LjIgLTEzLjMgNi4yIC03LjQgMCAtMTMuMyAtMi44IC0xMy4zIC02LjIgLTAgLTMuNCA1LjkgLTYuMiAxMy4zIC02LjIgeiBtIC00MS43IDE4LjUgMCAwIGMgLTEuNiAwLjEgLTMuMSAwLjIgLTQuNiAwLjQgbCA5LjEgMS43IGEgMTAuOCA1IDAgMSAxIC04LjEgOS4zIGwgLTguOSAtMS43IGMgMSAwLjkgMi40IDEuNyA0LjMgMi40IDYuNCAyLjIgMTUuNCAxLjUgMjAgLTEuNSA0LjYgLTMgMy4yIC03LjIgLTMuMiAtOS4zIC0yLjYgLTAuOSAtNS43IC0xLjMgLTguNiAtMS4zIHogbSA2My43IDE2LjYgMCA5LjMgYyAwIDExIC0yMC4yIDE5LjkgLTQ1IDE5LjkgLTI0LjkgMCAtNDUgLTguOSAtNDUgLTE5LjkgbCAwIC05LjIgYyAxMS41IDUuMyAyNy40IDguNiA0NC45IDguNiAxNy42IDAgMzMuNiAtMy4zIDQ1LjIgLTguNyB6IG0gMCAzNC42IDAgOC44IGMgMCAxMSAtMjAuMiAxOS45IC00NSAxOS45IC0yNC45IDAgLTQ1IC04LjkgLTQ1IC0xOS45IGwgMCAtOC44IGMgMTEuNiA1LjEgMjcuNCA4LjIgNDUgOC4yIDE3LjYgMCAzMy41IC0zLjEgNDUgLTguMiB6IiBzdHlsZT0iZmlsbDojRkZGOyIvPjwvc3ZnPg==";

			window.getSteamDB = function (giftID) {
				$('steamdbicon' + giftID).src = loadingIcon;
				new Ajax.Request("http://steamcommunity.com/gifts/" + giftID + "/validateunpack", {
					method : 'post',
					parameters : {
						sessionid : window.g_sessionID
					},
					onSuccess : function (transport) {
						var subID = transport.responseJSON.packageid;
						var link = "https://steamdb.info/sub/" + subID;
						window.open(link, "_blank");
						$('steamdbicon' + giftID).src = steamdbIcon;
					},
					onFailure : function (transport) {
						$('steamdbicon' + giftID).src = steamdbIcon;
						alert('Please try again later');
					}
				});
			}

			function addSteamDB_Buttons() {
				var processedClassIds = [];

				if (typeof window.g_ActiveInventory.rgChildInventories == 'undefined') {
					var giftInventory = window.g_ActiveInventory.rgInventory;
				} else {
					var giftInventory = window.g_ActiveInventory.rgChildInventories[1].rgInventory;
				}
				for (var i in giftInventory) {
					var giftID = giftInventory[i].id;
					var descriptions = giftInventory[i].descriptions;
					if (typeof giftInventory[giftID].descriptions.last().enabled == 'undefined') {
						giftInventory[giftID].descriptions.push({
							type : "html",
							enabled : true,
							value : "<p><a title=\"Steam Database\" class=\"btn_small btn_grey_white_innerfade\" href=\"javascript:getSteamDB('" + giftID + "');\"><img id=\"steamdbicon" + giftID + "\" style=\"width:30px;height:30px;vertical-align:middle\" src=\"" + steamdbIcon + "\">&nbsp;SteamDB&nbsp;</a>"
						});
					}
					if (giftInventory[i].pos == 1) {
						$('iteminfo1_item_descriptors').innerHTML += "<div class=\"descriptor\"><p><a title=\"Steam Database\" class=\"btn_small btn_grey_white_innerfade\" href=\"javascript:getSteamDB('" + giftID + "');\"><img id=\"steamdbicon" + giftID + "\" style=\"width:30px;height:30px;vertical-align:middle\" src=\"" + steamdbIcon + "\">&nbsp;SteamDB&nbsp;</a></p></div>";
					}
				}
			}

			function initialize() {
				if ((typeof window.g_ActiveInventory.rgChildInventories == 'undefined' || typeof window.g_ActiveInventory.rgChildInventories[1] == 'undefined') && window.g_ActiveInventory.rgInventory == null) {
					setTimeout(initialize, 1000);
				} else {
					addSteamDB_Buttons();
				}
			}
			initialize();

		}
	} catch (e) {
		console.log("Steam Inventory to SubID: ", e);
	}
}, false);