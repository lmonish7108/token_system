import frappe

from datetime import datetime


def get_context(context):
	
	context["starting_at"] = datetime.today().hour
	context["ending_at"] = context["starting_at"]+1
	context["cur_slot"] = datetime.today().strftime('%Y-%m-%d')


	return context
