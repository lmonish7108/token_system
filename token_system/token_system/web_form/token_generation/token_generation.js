frappe.ready(function() {

	let d = new frappe.ui.Dialog({
	    title: 'Slots timings are 1 hour each from 9 am to 6 pm.',
	    fields: [
	        {
	            label: 'Select date',
	            fieldname: 'slot_date',
	            fieldtype: 'Date',
	            onchange: function(){
	            	
	            }
	        },
	        
	        {
	            label: 'Select Slot',
	            fieldname: 'slot_option',
	            fieldtype: 'Select',
	            options: "09-10\n10-11\n11-12\n12-13\n13-14\n14-15\n15-16\n16-17\n17-18",
	        }
	    ],
	    primary_action_label: 'Check availability',
	    primary_action(values) {
	    	if(!values.slot_date){
				frappe.msgprint("Please choose a date");
	    	}
			if(!values.slot_option){
	    		frappe.msgprint("Please choose a slot");
	    	}

			frappe.call({
				method: 'frappe.client.get_value',
				args: {
					'doctype': 'Token',
					'filters': {
						"slot": values.slot_date + "-" + values.slot_option,
						"current_phase": ["in", ["InQueue", "Executing"]]
					},
					'fieldname': [
						'count(slot) as count',
						'slot'
					]
				},
				callback: function(r) {
					if (!r.exc) {
						console.log(r.message);
						if(r.message.count < 5 && r.message.slot){
							d.hide();
							frappe.msgprint("Slot is available.");
							frappe.web_form.set_value("slot", values.slot_date + "-" + values.slot_option);
						}
						if(!r.message.slot){
							d.hide();
							frappe.call({
								method: 'frappe.client.get_value',
								args: {
									'doctype': 'Slot',
									'filters': {
										"name": values.slot_date + "-" + values.slot_option,
									},
									'fieldname': [
										'name'
									]
								},
								callback: function(res) {
									if (!res.exc) {
										if(res.message){
											d.hide();
											frappe.msgprint("Slot is available.");
											frappe.web_form.set_value("slot", values.slot_date + "-" + values.slot_option);
										}
										else{
											frappe.msgprint("Slot is not generated yet.")
										}
									}
								}
							});
						}
					}
				}
			});

	    }
	});

	$(document).on('frappe.ui.Dialog:shown', () => {
		let today = new Date();
		$(".modal-content input").datepicker({
			minDate: today
		});
	});

	frappe.web_form.after_load = () => {
		frappe.web_form.add_button_to_header("Change Slot?", "primary",() =>{
			d.show();
		});
		frappe.web_form.set_value("slot", "{{current_slot}}");
		frappe.web_form.handle_success = function(response){
			window.open(`/printview?
			doctype=${response.doctype}
			&name=${response.name}
			&format="Standard"`, '_blank');
		}
	}

});
