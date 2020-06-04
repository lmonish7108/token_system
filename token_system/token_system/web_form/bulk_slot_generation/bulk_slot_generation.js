frappe.ready(function() {
	frappe.web_form.after_load = () => {
		$(".web-form-actions").html("");
		$(".web-form-footer.pull-right").html("");
		frappe.web_form.add_button_to_header("Generate", "primary", ()=>{
			var doc_values = frappe.web_form.get_values();

			if (!doc_values) return;


			for (var i=9; i < 18; i ++){

				let ending_at = i + 1;

				doc_values["csrf_token"] = frappe.csrf_token;
				doc_values["starting_at"] = i.toString().padStart(2, "0");
				doc_values["ending_at"] = ending_at.toString();
				data_dict = JSON.stringify(doc_values);

				
				fetch('http://token.local.com:8000/api/resource/Slot', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: data_dict
				})
				.then(r => r.json())
				.then(r => {
				})
			}

		});
	}
})