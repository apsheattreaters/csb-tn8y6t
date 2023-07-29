angular
  .module("mainModule", ["toastr"])
  .controller("mainController", function (toastr, $scope, $http, $routeParams) {
    $scope.graph = true;

    var baseUrl = "http://new-server:8080";

    if ($routeParams.inwardNo != undefined) {
      var url = baseUrl + "/inward/new/" + $routeParams.inwardNo;
      $http
        .get(url)
        .success(function (dataoutput) {
          //delete if success

          var data = dataoutput.inward;
          var party = dataoutput.party;
          var dispatchNo = $routeParams.dispatchNo;
          var recIndex = _.findLastIndex(data.dispatches, {
            dispatchNo: dispatchNo
          });
          $scope.inv = data.dispatches[recIndex].invoices[0];
          $scope.partyDc = data.partyDc;
          $scope.partyDate = data.partyDate;

          $scope.partyGST = party.partyGst;
          $scope.partyAddress = party.partyAddress;
          $scope.partyCity = party.partyCity;
          $scope.partyPin = party.partyPin;
          $scope.partyState = party.partyState;
          $scope.partyStateCode = party.partyStateCode;
          if (typeof party.partyDocType === "undefined") {
            $scope.partyDocType = "B2B";
          } else {
            $scope.partyDocType = party.partyDocType;
          }

          $scope.poNo = data.poNo;
          $scope.poDate = data.poDate;
          $scope.inv.creationDate = new Date(
            $scope.inv.creationDate
          ).toLocaleDateString("en-GB");
          $scope.inv.sgst = parseFloat($scope.inv.tax / 2);
          $scope.inv.cgst = parseFloat($scope.inv.tax / 2);
          $scope.gstRate = 6;

          $scope.date = $scope.inv.creationDate.split("/");
          if (
            new Date($scope.date[2], $scope.date[1] - 1, $scope.date[0]) <=
            new Date(2019, 09, 03)
          ) {
            $scope.gstRate = 9;
          }

          $scope.inv.total = $scope.inv.total.toFixed(0);

          $scope.component = data.component;
          callComponentInfo();
          $scope.numberToWords($scope.inv.total);
          if (
            typeof data.dispatches[recIndex].invoices[0].testCertificate.mm !==
            "undefined"
          ) {
            $scope.inv.testCertificate.mm = JSON.parse(
              "[" +
                data.dispatches[recIndex].invoices[0].testCertificate.mm +
                "]"
            );
          }

          if (
            typeof data.dispatches[recIndex].invoices[0].testCertificate.hv !==
            "undefined"
          ) {
            $scope.inv.testCertificate.hv = JSON.parse(
              "[" +
                data.dispatches[recIndex].invoices[0].testCertificate.hv +
                "]"
            );
          }

          if (
            typeof data.dispatches[recIndex].invoices[0].testCertificate.cut !==
            "undefined"
          ) {
            $scope.inv.testCertificate.cut = JSON.parse(
              "[" +
                data.dispatches[recIndex].invoices[0].testCertificate.cut +
                "]"
            );
          }
          $scope.chartConfig = initChartConfig(
            data.dispatches[recIndex].invoices[0].testCertificate
          );
          if ($scope.inv.rateKg > 0) {
            $scope.compQty = $scope.inv.qtyKgs;
            $scope.compUnit = "Kg";
            $scope.compPrice = $scope.inv.rateKg;
          }

          if ($scope.inv.rateNos > 0) {
            $scope.compQty = $scope.inv.qtyNos;
            $scope.compUnit = "Nos";
            $scope.compPrice = $scope.inv.rateNos;
          }

          $scope.compTax = parseFloat($scope.inv.tax) / 2;

          $scope.makeJson = JSON.stringify(
            [
              {
                version: "1.1",
                TranDtls: {
                  TaxSch: "GST",
                  SupTyp: "" + $scope.partyDocType,
                  IgstOnIntra: "N",
                  RegRev: null,
                  EcmGstin: null
                },
                DocDtls: {
                  typ: "INV",
                  No: "" + $scope.inv.invoiceNo,
                  Dt: $scope.inv.creationDate
                },
                SellerDtls: {
                  Gstin: "27ADLPS5295B1Z7",
                  LglNm: "APS HEAT TREATERS",
                  TrdNm: "APS HEAT TREATERS",
                  Addr1: "Gat no. 263, Post Pirangut, Tal. Mulshi",
                  Addr2: "Dist. Pune 412115",
                  Loc: "PUNE",
                  Pin: 412115,
                  Stcd: "27",
                  Ph: "9767893609",
                  Em: "apsheattreaters@gmail.com"
                },
                BuyerDtls: {
                  Gstin: "" + $scope.partyGST,
                  LglNm: $scope.inv.party,
                  TrdNm: null,
                  Pos: "27",
                  Addr1: $scope.partyAddress,
                  Loc: "" + $scope.partyState,
                  Pin: "" + $scope.partyPin,
                  Stcd: "" + $scope.partyStateCode,
                  Ph: null,
                  Em: null
                },
                DispDtls: null,
                ShipDtls: null,
                ValDtls: {
                  Assval: $scope.inv.amount,
                  IgstVal: 0,
                  CgstVal: $scope.compTax,
                  SgstVal: $scope.compTax,
                  CesVal: 0,
                  StCesVal: 0,
                  Discount: 0,
                  OthChrg: 0,
                  RndOffAmt: 0,
                  TotInvVal: parseFloat($scope.inv.total)
                },
                EwbDtls: null,
                itemList: [
                  {
                    SlNo: "1",
                    PrdDesc: $scope.component.componentName,
                    IsServc: "Y",
                    HsnCd: "998898",
                    Qty: $scope.compQty,
                    Unit: $scope.compUnit,
                    UnitPrice: $scope.compPrice,
                    TotAmt: $scope.inv.amount,
                    Discount: 0,
                    PreTaxVal: 0,
                    AssAmt: $scope.inv.amount,
                    GstRt: 12,
                    IgstAmt: 0,
                    CgstAmt: $scope.compTax,
                    SgstAmt: $scope.compTax,
                    CesRt: 0,
                    CesAmt: 0,
                    CesNonAdvlAmt: 0,
                    StateCesRt: 0,
                    StateCesAmt: 0,
                    StateCesNonAdvlAmt: 0,
                    OthChrg: 0,
                    TotItemVal: parseFloat($scope.inv.total),
                    BchDtls: null
                  }
                ]
              }
            ],
            null,
            10
          );
        })
        .error(function (data) {
          // toastr.error('Error in getting TC');
        });
    }
    // $scope.image = null;
    // $scope.imageFileName = '';

    $scope.numberToWords = function (number) {
      var fraction = Math.round(frac(number) * 100);
      var f_text = "";

      if (fraction > 0) {
        f_text = "and " + convert_number(fraction) + " paise";
      }

      $scope.inv.inWords =
        convert_number(number).toLowerCase() + " rupee " + f_text + " only";
    };

    function frac(f) {
      return f % 1;
    }

    function convert_number(number) {
      if (number < 0 || number > 999999999) {
        return "NUMBER OUT OF RANGE!";
      }
      var Gn = Math.floor(number / 10000000); /* Crore */
      number -= Gn * 10000000;
      var kn = Math.floor(number / 100000); /* lakhs */
      number -= kn * 100000;
      var Hn = Math.floor(number / 1000); /* thousand */
      number -= Hn * 1000;
      var Dn = Math.floor(number / 100); /* Tens (deca) */
      number = number % 100; /* Ones */
      var tn = Math.floor(number / 10);
      var one = Math.floor(number % 10);
      var res = "";

      if (Gn > 0) {
        res += convert_number(Gn) + " CRORE";
      }
      if (kn > 0) {
        res += (res == "" ? "" : " ") + convert_number(kn) + " LAKH";
      }
      if (Hn > 0) {
        res += (res == "" ? "" : " ") + convert_number(Hn) + " THOUSAND";
      }

      if (Dn) {
        res += (res == "" ? "" : " ") + convert_number(Dn) + " HUNDRED";
      }

      var ones = Array(
        "",
        "ONE",
        "TWO",
        "THREE",
        "FOUR",
        "FIVE",
        "SIX",
        "SEVEN",
        "EIGHT",
        "NINE",
        "TEN",
        "ELEVEN",
        "TWELVE",
        "THIRTEEN",
        "FOURTEEN",
        "FIFTEEN",
        "SIXTEEN",
        "SEVENTEEN",
        "EIGHTEEN",
        "NINETEEN"
      );
      var tens = Array(
        "",
        "",
        "TWENTY",
        "THIRTY",
        "FOURTY",
        "FIFTY",
        "SIXTY",
        "SEVENTY",
        "EIGHTY",
        "NINETY"
      );

      if (tn > 0 || one > 0) {
        if (!(res == "")) {
          res += " AND ";
        }
        if (tn < 2) {
          res += ones[tn * 10 + one];
        } else {
          res += tens[tn];
          if (one > 0) {
            res += "-" + ones[one];
          }
        }
      }

      if (res == "") {
        res = "zero";
      }
      return res;
    }

    callComponentInfo = function () {
      var url = baseUrl + "/party/" + $scope.component.partyId;
      $http
        .get(url)
        .success(function (data) {
          //delete if success
          $scope.party = data;
          $scope.partydetails = data;
        })
        .error(function (data) {
          // toastr.error('Error in getting TC');
        });
    };

    $scope.save = function () {
      var tcObject = $scope.tc;
      var url = baseUrl + "/tc";
      $http
        .put(url, tcObject)
        .success(function (data) {
          //delete if success
          toastr.success("Updated TC");
          //$scope.exportDataVariable = data;
        })
        .error(function (data) {
          toastr.error("Error in updating TC");
        });
    };

    //$scope.name = 'World';
    //$http.get('data.json')
    //    .success(function(data) {
    //        $scope.inv = data;
    //        $scope.chartConfig = initChartConfig(data);
    //    })
    //    .error(function (data, status, headers, config) {
    //        alert("error reading json");
    //    });
  })
  .directive("chart", chartDirective);
//
//.controller('MainCtrl', function($scope,$http) {
//    $scope.name = 'World';
//    $http.get('data.json')
//        .success(function(data) {
//            $scope.inv = data;
//            $scope.chartConfig = initChartConfig(data);
//        })
//        .error(function (data, status, headers, config) {
//            alert("error reading json");
//        });
//}).controller('ImageCtrl', function($scope) {
//    $scope.image = null
//    $scope.imageFileName = ''
//})
