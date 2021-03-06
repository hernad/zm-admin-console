/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2006, 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc.
 *
 * The contents of this file are subject to the Common Public Attribution License Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at: https://www..zimbra.com/license
 * The License is based on the Mozilla Public License Version 1.1 but Sections 14 and 15
 * have been added to cover use of software over a computer network and provide for limited attribution
 * for the Original Developer. In addition, Exhibit A has been modified to be consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is Zimbra Open Source Web Client.
 * The Initial Developer of the Original Code is Zimbra, Inc.  All rights to the Original Code were
 * transferred by Zimbra, Inc. to Synacor, Inc. on September 14, 2015.
 *
 * All portions of the code are Copyright (C) 2006, 2007, 2008, 2009, 2010, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
* XFormItem class: HOST PORT
* this item is used in the Admin UI to display Host name fields like Relay MTA host
* @class HostPort_XFormItem
* @constructor HostPort_XFormItem
* @author Greg Solovyev
**/
HostPort_XFormItem = function() {}
XFormItemFactory.createItemType("_HOSTPORT_", "hostport", HostPort_XFormItem, Composite_XFormItem);
HostPort_XFormItem.prototype.numCols = 3;
HostPort_XFormItem.prototype.nowrap = true;
HostPort_XFormItem.prototype._serverPart = "";
HostPort_XFormItem.prototype._portPart = "";

HostPort_XFormItem.prototype.items = [
	{type:_TEXTFIELD_, width:"200px", forceUpdate:true, ref:".", labelLocation:_NONE_, label:null,
		visibilityChecks:[],enableDisableChecks:[],
		required:true,
		getDisplayValue:function (itemVal) {
			var val = "";
			if(itemVal) {
				var URLChunks = itemVal.split(":");
				if(URLChunks.length >= 2) {
					val = URLChunks[0];
				} else {
					val = itemVal;
				}
				this.getParentItem()._serverPart = val;
			} 
			return val;	
		},
		elementChanged:function(serverPart, instanceValue, event) {
			this.getParentItem()._serverPart = serverPart;
			var val = "";
			if(serverPart) {
				val = serverPart;
			}
			if(this.getParentItem()._portPart) {
				val += ":";
				val += this.getParentItem()._portPart;				
			}
			this.getForm().itemChanged(this.getParentItem(), val, event);
		},
		onClick: "Super_HostPort_XFormItem.handleClick",
		onMouseout: "Super_HostPort_XFormItem.handleMouseout"
	},
	{type:_OUTPUT_, width:"5px", labelLocation:_NONE_, label:null,value:":"},
	{type:_TEXTFIELD_,width:"40px",forceUpdate:true, ref:".", labelLocation:_NONE_, label:null,
		visibilityChecks:[],enableDisableChecks:[],
		getDisplayValue:function (itemVal) {
			var val = "";
			if(itemVal) {
				var URLChunks = itemVal.split(":");
				if(URLChunks.length == 2) {
					val = URLChunks[1];
				} else {
					val = "";
				}
				this.getParentItem()._portPart = val;
			} 
			return val;	
		},
		elementChanged:function(portPart, instanceValue, event) {
			this.getParentItem()._portPart = portPart;
			var val = "";
			if(this.getParentItem()._serverPart) {
				val = this.getParentItem()._serverPart;
			}
			if(portPart) {
				val +=":";
				val+=portPart;
			}
			this.getForm().itemChanged(this.getParentItem(), val, event);
		}
	}
];
