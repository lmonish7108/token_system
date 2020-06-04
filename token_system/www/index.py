import frappe
from datetime import datetime

def get_context(context):

	cur_hour = datetime.today().hour

	starting_at = str(cur_hour) if cur_hour > 9 else "0" + str(cur_hour)
	ending_at = str(cur_hour+1) if cur_hour+1 > 9 else "0" + str(cur_hour+1)
	cur_slot = datetime.today().strftime('%Y-%m-%d') + "-" + starting_at + "-" + ending_at

	context["cur_slot"] = cur_slot

	return context