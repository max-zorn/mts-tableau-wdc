(function () {
	var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
		var cols_store = [{
			id: 'id',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'attach_notify',
			dataType: tableau.dataTypeEnum.bool
			}, {
			id: 'status',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'state',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'type',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'net_check',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'contract_id',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'activated_at',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'imsi',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'iccid',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'apn',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'imei',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'msisdn',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'device_name',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'mode',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'pdp_context',
			dataType: tableau.dataTypeEnum.bool
			}, {
			id: 'tariff',
			dataType: tableau.dataTypeEnum.float
			}, {
			id: 'ext_id',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'last_ip',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'has_locked_directions',
			dataType: tableau.dataTypeEnum.bool
			}, {
			id: 'control_name',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'counter200',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'counter200_end',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'counter106_end',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'counter106',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'refresh_date',
			dataType: tableau.dataTypeEnum.int
		}];

		var tableSchema_store = {
			id: "store",
			alias: "store list info",
			columns: cols_store
		};

		var cols_simCards = [{
			id: 'id',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'status',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'state',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'type',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'net_check',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'contract_id',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'activated_at',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'imsi',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'iccid',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'apn',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'imei',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'msisdn',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'device_name',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'mode',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'pdp_context',
			dataType: tableau.dataTypeEnum.bool
			}, {
			id: 'tariff',
			dataType: tableau.dataTypeEnum.float
			}, {
			id: 'ext_id',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'last_ip',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'has_locked_directions',
			dataType: tableau.dataTypeEnum.bool
			}, {
			id: 'control_name',
			dataType: tableau.dataTypeEnum.string
			}, {
			id: 'counter200',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'counter106',
			dataType: tableau.dataTypeEnum.int
			}, {
			id: 'refresh_date',
			dataType: tableau.dataTypeEnum.int
		}];

		var tableSchema_simCards = {
			id: "sim_cards",
			alias: "sim cards info",
			columns: cols_simCards
		};

		schemaCallback([tableSchema_store, tableSchema_simCards]);
	};

	myConnector.getData = function(table, doneCallback) {
        var tempdata = JSON.parse(tableau.connectionData),
        	proxy = 'https://cors-anywhere.herokuapp.com/';
		if (table.tableInfo.id == 'store') {
			async function f1() {
  				var tableData = [];
  				var last_page = 1;
  				await $.ajax({
       				url: proxy + "m2m-manager.mts.ru/api/v0/dashboards/" + tempdata.dashboard_id + "/sim_cards/list_store",
       				headers: {
					    "X-Requested-With": "XMLHttpReques",
					    "Content-Type": "application/json",
					    "Authorization":"Bearer " + tableau.password
				    },
    				type: "GET",
			       	dataType: "json",
			       	data: {
		                "page": 1,
		                "last_page": 1,
		                "per_page": 100
			        },
    				success: function(resp) {
        				last_page = resp.data.paginator.last_page;
    				},
				    error: function () {
				           console.log("error");
				    }
	   			});

	  			for (var j = 1; j < last_page + 1; j++) {
	   				await $.ajax({
	       				url: proxy + "m2m-manager.mts.ru/api/v0/dashboards/" + tempdata.dashboard_id + "/sim_cards/list_store",
	       				headers: {
						    "X-Requested-With": "XMLHttpReques",
						    "Content-Type": "application/json",
						    "Authorization":"Bearer " + tableau.password
					    },
	    				type: "GET",
				       	dataType: "json",
				       	data: {
			                "page": j,
			                "last_page": j-1,
			                "per_page": 100
				        },
	    				success: function(resp) {
	        				var feat = resp.data.items;
	     					for (var i = 0, len = feat.length; i < len; i++) {
	     						for (var x = 0, lenx = feat[i].counters.length; x < lenx; x++) {
	     							if (feat[i].counters[x].direction_id == 200) {
	     								var counter200 = feat[i].counters[x].amount
	     								var counter200_end = feat[i].counters[x].period_end
	     							}
	     							if (feat[i].counters[x].direction_id == 106) {
	     								var counter106 = feat[i].counters[x].amount
	     								var counter106_end = feat[i].counters[x].period_end
	     							}
	     						}
							    tableData.push({
							        "id": feat[i].id,
							        "attach_notify": feat[i].attach_notify,
							        "status": feat[i].status,
							        "state": feat[i].state,
							        "type": feat[i].type,
							        "net_check": feat[i].net_check,
							        "contract_id": feat[i].contract_id,
							        "activated_at": feat[i].activated_at,
							        "imsi": feat[i].sim.imsi,
							        "iccid": feat[i].sim.iccid,
							        "apn": feat[i].sim.apn,
							        "imei": feat[i].sim.imei,
							        "msisdn": feat[i].sim.msisdn,
							        "device_name": feat[i].sim.device_name,
							        "mode": feat[i].sim.mode,
							        "pdp_context": feat[i].sim.pdp_context,
							        "tariff": feat[i].sim.tariff,
							        "ext_id": feat[i].sim.ext_id,
							        "last_ip": feat[i].sim.last_ip,
							        "has_locked_directions": feat[i].has_locked_directions,
							        "control_name": feat[i].control_name,
							        "counter200": counter200,
							        "counter200_end": counter200_end,
							        "counter106": counter106,
							        "counter106_end": counter106_end,
							        "refresh_date": Date.now(),
						    	});
     						}
     						console.log("final:", tableData);
    					},
				    	error: function () {
				    	       console.log("error");
				    	}
   					});      
  				};
 				table.appendRows(tableData);
				doneCallback(); 
			}
			f1()
		}

		if (table.tableInfo.id == 'sim_cards') {
			async function f2() {
  				var tableData = [];
  				var last_page = 1;
  				await $.ajax({
   					url: proxy + "m2m-manager.mts.ru/api/v0/dashboards/" + tempdata.dashboard_id + "/sim_cards",
   					headers: {
					    "X-Requested-With": "XMLHttpReques",
					    "Content-Type": "application/json",
					    "Authorization":"Bearer " + tableau.password
				    },
    				type: "GET",
			       	dataType: "json",
			       	data: {
		                "page": 1,
		                "last_page": 1,
		                "per_page": 100
			        },
    				success: function(resp) {
        				last_page = resp.data.paginator.last_page;
    				},
				    error: function () {
				           console.log("error");
				    }
	   			});

  				for (var j = 1; j < last_page + 1; j++) {
   					await $.ajax({
       					url: proxy + "m2m-manager.mts.ru/api/v0/dashboards/" + tempdata.dashboard_id + "/sim_cards",
       					headers: {
						    "X-Requested-With": "XMLHttpReques",
						    "Content-Type": "application/json",
						    "Authorization":"Bearer " + tableau.password
					    },
	    				type: "GET",
				       	dataType: "json",
				       	data: {
			                "page": j,
			                "last_page": j-1,
			                "per_page": 100
				        },
	    				success: function(resp) {
	        				var feat = resp.data.items;
	     					for (var i = 0, len = feat.length; i < len; i++) {
	     						for (var x = 0, lenx = feat[i].counters.length; x < lenx; x++) {
	     							if (feat[i].counters[x].direction_id == 200) {
	     								var counter200 = feat[i].counters[x].amount
	     							}
	     							if (feat[i].counters[x].direction_id == 106) {
	     								var counter106 = feat[i].counters[x].amount
     								}
     							}
							    tableData.push({
							        "id": feat[i].id,
							        "status": feat[i].status,
							        "state": feat[i].state,
							        "type": feat[i].type,
							        "net_check": feat[i].net_check,
							        "contract_id": feat[i].contract_id,
							        "activated_at": feat[i].activated_at,
							        "imsi": feat[i].sim.imsi,
							        "iccid": feat[i].sim.iccid,
							        "apn": feat[i].sim.apn,
							        "imei": feat[i].sim.imei,
							        "msisdn": feat[i].sim.msisdn,
							        "device_name": feat[i].sim.device_name,
							        "mode": feat[i].sim.mode,
							        "pdp_context": feat[i].sim.pdp_context,
							        "tariff": feat[i].sim.tariff,
							        "ext_id": feat[i].sim.ext_id,
							        "last_ip": feat[i].sim.last_ip,
							        "has_locked_directions": feat[i].has_locked_directions,
							        "control_name": feat[i].control_name,
							        "counter200": counter200,
							        "counter106": counter106,
							        "refresh_date": Date.now(),
						   		});
     						}
     						console.log("final:", tableData);
    					},
				    	error: function () {
				    	       console.log("error");
				    	}
					});      
  				};
				table.appendRows(tableData);
				doneCallback(); 
			}
			f2()
		}
	};

	tableau.registerConnector(myConnector);

	$(document).ready(function () {
	    $("#submitButton").click(function () {
	    	tableau.connectionName = "m2m-manager mts";
	    	tableau.password = $("#input_token").val();
	    	tableau.connectionData = JSON.stringify({dashboard_id: $("#dashboard_id").val()})
	        tableau.submit();
	    });
	});
})();