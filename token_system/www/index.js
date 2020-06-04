frappe.ready(function(){

	var cur_slot = "{{cur_slot}}";

	var window_list;

	fetch('/api/resource/Window?filters=[["slot",">=","'+ cur_slot +'"]]&fields=["name", "slot"]', {
	    method: 'GET',
	    headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	    },
	})
	.then(r => r.json())
	.then(r => {
	    window_list = r.data;
	    console.log(window_list);
	    window_list.forEach(function(window, idx){
	    	fetch('/api/resource/Token?filters=[["slot","=","'+ window.slot +'"],["current_phase","=","Executing"]]', {
			    method: 'GET',
			    headers: {
			        'Accept': 'application/json',
			        'Content-Type': 'application/json',
			    },
			})
			.then(res => res.json())
			.then(res => {
				console.log(res);
				if (res.data.length){
				    token_html = "";
				    res.data.forEach(function(token, idx){
				    	token_html += "<p>" + token.name + "</p>"
				    });
				    $("#window-list").append('<div class="alert alert-primary" role="alert">' +
		    		'<h3>'+window.slot+ '</h3><h4>Current Token:</h4>' + token_html +'</div>');
				}
			});
	    });

		    
	});

})