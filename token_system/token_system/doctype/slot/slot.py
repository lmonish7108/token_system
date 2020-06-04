# -*- coding: utf-8 -*-
# Copyright (c) 2020, Monish Lalchandani and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import json

class Slot(Document):
	pass

		# def insert(self, ignore_permissions=None, ignore_links=None, ignore_if_duplicate=False,
		# 			ignore_mandatory=None, set_name=None, set_child_names=True):
			
		# 	print
		# 	data_dict = json.loads(frappe.form_dict.data) or {}
		# 	if data_dict["web_form_name"] == "bulk-slot-generation":
		# 		starting_at = 10
		# 		print("hehere")
		# 		for _ in range(8):
		# 			print(_)
		# 			try:
		# 				docu = frappe.get_doc({
		# 					"doctype": "Slot",
		# 					"title": data_dict.title,
		# 					"date": data_dict.date,
		# 					"starting_at": starting_at,
		# 					"ending_at": starting_at + 1
		# 				})
		# 				print(docu)
		# 				starting_at += 1
		# 				doc.insert()
		# 			except Exception as e:
		# 				continue
		# 	super(Slot, self).insert()
		# 		