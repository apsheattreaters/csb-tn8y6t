function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
download(jsonData, "json.txt", "text/plain");

// [{
// 	"version": "1.1",
// 	"TranDtls": {
// 		"TaxSch": "GST",
// 		"SupTyp": "B2B",
// 		"IgstOnIntra": "N",
// 		"RegRev": null,
// 		"EcmGstin": null
// 	},
// 	"DocDtls": {
// 		"typ": "INV",
// 		"No": "2324000691",
// 		"Dt": "20/06/2023"
// 	},
// 	"SellerDtls": {
// 		"Gstin": "27AAPPR5813B1ZM",
// 		"LglNm": "SAMARTH ENGINEERING",
// 		"TrdNm": null,
// 		"Addr1": "Survey No.81/5,Dangat Estate,,  Near Agarwal Godown,Shivane.",
// 		"Addr2": "Survey No.81/5,Dangat Estate,,  Near Agarwal Godown,Shivane.",
// 		"Loc": "PUNE",
// 		"Pin": 411023,
// 		"Stcd": "27",
// 		"Ph": null,
// 		"Em": null
// 	},
// 	"BuyerDtls": {
// 		"Gstin": "33AABCC4615K1ZW",
// 		"LglNm": "CATERPILLAR INDIA PRIVATE LIMITED",
// 		"TrdNm": null,
// 		"Pos": "33",
// 		"Addr1": "POWER SYSTEMS DIVISION,Matha",
// 		"Addr2": "POWER SYSTEMS DIVISION,Matha",
// 		"Loc": "HOSUR",
// 		"Pin": 635109,
// 		"Stcd": "33",
// 		"Ph": null,
// 		"Em": null
// 	},
// 	"DispDtls": null,
// 	"ShipDtls": null,
// 	"ValDtls": {
// 		"Assval": 65791,
// 		"IgstVal": 11842.38,
// 		"CgstVal": 0,
// 		"SgstVal": 0,
// 		"CesVal": 0,
// 		"StCesVal": 0,
// 		"Discount": 0,
// 		"OthChrg": 0,
// 		"RndOffAmt": 0,
// 		"TotInvVal": 77633
// 	},
// 	"EwbDtls": null,
// 	"itemList": [{
// 		"SlNo": "1",
// 		"PrdDesc": "6N7145  02 BONNET-CLR INLET",
// 		"IsServc": "N",
// 		"HsnCd": "84803000",
// 		"Qty": 40,
// 		"Unit": "Nos",
// 		"UnitPrice": 1644.77,
// 		"TotAmt": 65791,
// 		"Discount": 0,
// 		"PreTaxVal": 0,
// 		"AssAmt": 65791,
// 		"GstRt": 28,
// 		"IgstAmt": 11842.38,
// 		"CgstAmt": 0,
// 		"SgstAmt": 0,
// 		"CesRt": 0,
// 		"CesAmt": 0,
// 		"CesNonAdvlAmt": 0,
// 		"StateCesRt": 0,
// 		"StateCesAmt": 0,
// 		"StateCesNonAdvlAmt": 0,
// 		"OthChrg": 0,
// 		"TotItemVal": 77633,
// 		"BchDtls": null
// 	}]
// }]
