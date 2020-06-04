frappe.ready(function(){

	var cur_date = "{{cur_slot}}";
	var starting_at = "{{starting_at}}".padStart(2, "0");
	var ending_at = "{{ending_at}}".padStart(2, "0");

	var query_date = cur_date + "-" + starting_at + "-" + ending_at;
	console.log(query_date)

	$.ajax({
		url: '/api/resource/Window?filters=[["slot",">=","' + query_date + '"]]&fields=["slot"]',
	})
	.done(function( res ) {
		res.data.forEach(function(slot, index){
			$("#window-list").append('<div class="alert alert-primary" role="alert">'+ slot.slot +'</div>');
		});

		$("#window-list .alert-primary").click(function(){
			var kanban_board_name = $(this).text();
			$.ajax({
				url: '/api/resource/Kanban%20Board?fields=["kanban_board_name"]'
			}).done(function(res){
				res.data.forEach(function(board, idx){
					if(board.kanban_board_name == "kanban-"+kanban_board_name){
						window.location = '/desk#List/Token/Kanban/kanban-'+ kanban_board_name
					}
					return true;
				})	
				fetch('/api/resource/Kanban Board', {
				    method: 'POST',
				    headers: {
				        'Accept': 'application/json',
				        'Content-Type': 'application/json',
				    },
				    body: JSON.stringify({
						csrf_token: frappe.csrf_token,
				        kanban_board_name: "kanban-"+kanban_board_name,
				        reference_doctype: 'Token',
						field_name: 'current_phase',
						columns: [
							{
								"column_name": "InQueue",
								"status": "Active",
								"indicator": "yellow",
							},
							{
								"column_name": "Executing",
								"status": "Active",
								"indicator": "green",
							},
							{
								"column_name": "Fulfilled",
								"status": "Active",
								"indicator": "blue",
							},
							{
								"column_name": "Expired",
								"status": "Active",
								"indicator": "darkgrey",
							},
							{
								"column_name": "Rejected",
								"status": "Active",
								"indicator": "red",
							},
							{
								"column_name": "Postponed",
								"status": "Active",
								"indicator": "orange",
							},
						],
						filters: "[[\"Token\",\"slot\",\"=\",\""+kanban_board_name+"\",false]]"

				    })
				})
				.then(r => r.json())
				.then(r => {
				    console.log(r);
				    window.location = '/desk#List/Token/Kanban/kanban-'+ kanban_board_name;
				})
			});
		});
		
	});

});

