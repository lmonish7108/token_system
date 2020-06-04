from __future__ import unicode_literals
import datetime
import frappe

def get_context(context):
	slot_availability_list = ""
	hour_slots = [9,10,11,12,13,14,15,16,17]
	current_slot = frappe.utils.nowdate() + "-" + str(datetime.datetime.now().hour) + "-" + str(datetime.datetime.now().hour +1)

	slot_list = frappe.db.get_list("Slot", filters={
			"name": [">=", current_slot],
		}, fields=["name"], order_by="date, starting_at")

	context["current_slot"] = None
	
	for slot in slot_list:
		slot_tokens = frappe.db.get_list("Token", filters={
			"slot": slot.name,
			"current_phase": ["in", "InQueue, Executing"]
		}, fields=["count(slot) as count"])[0]
		if slot_tokens.count  < 5 and not context["current_slot"]:
			context["current_slot"] = slot.name
			break

	return context