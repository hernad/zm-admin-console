/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */

/**
* @class ZaStatusViewController 
* @contructor ZaStatusViewController
* @param appCtxt
* @param container
* @param app
* @author Roland Schemers
* @author Greg Solovyev
**/
ZaStatusViewController = function(appCtxt, container) {
	ZaController.call(this, appCtxt, container,"ZaStatusViewController");
	this._helpURL = location.pathname + ZaUtil.HELP_URL + "managing_servers/monitoring_zimbra_collaboration_suite.htm?locid="+AjxEnv.DEFAULT_LOCALE;
	this._helpButtonText = ZaMsg.helpEditDomains;
   	this._popupOperations = new Array();
	this._UICreated = false;	
}

ZaStatusViewController.prototype = new ZaController();
ZaStatusViewController.prototype.constructor = ZaStatusViewController;
ZaController.initToolbarMethods["ZaStatusViewController"] = new Array();
ZaController.initPopupMenuMethods["ZaStatusViewController"] = new Array();

ZaStatusViewController.prototype.show = function(openInNewTab) {
	try {
		this._createUI(openInNewTab);
		var statusObj = new ZaStatus();
		statusObj.load();
		var statusVector = statusObj.getStatusVector();
		this._contentView.set(statusVector);
		ZaApp.getInstance().pushView(this.getContentViewId());
		var now = new Date();
	} catch (ex) {
		this._handleException(ex, "ZaStatusViewController.prototype.show", null, false);
		return;
	}	
};

ZaStatusViewController.prototype.getAppBarAction =function () {
    if (AjxUtil.isEmpty(this._appbarOperation)) {
    	this._appbarOperation[ZaOperation.HELP]=new ZaOperation(ZaOperation.HELP,ZaMsg.TBB_Help, ZaMsg.TBB_Help_tt, "Help", "Help", new AjxListener(this, this._helpButtonListener));
    }

    return this._appbarOperation;
}

ZaStatusViewController.prototype.getAppBarOrder = function () {
    if (AjxUtil.isEmpty(this._appbarOrder)) {
    	this._appbarOrder.push(ZaOperation.HELP);
    }

    return this._appbarOrder;
}

ZaStatusViewController.prototype._createUI = function (openInNewTab) {
	try {
		var elements = new Object();
		this._contentView = new ZaServicesListView(this._container);
		this._initPopupMenu();
		if(this._popupOperations && this._popupOperations.length) {
			this._acctionMenu =  new ZaPopupMenu(this._contentView, "ActionMenu", null, this._popupOperations, ZaId.VIEW_STATUSLIST, ZaId.MENU_POP);
		}
		elements[ZaAppViewMgr.C_APP_CONTENT] = this._contentView;
		//ZaApp.getInstance().createView(ZaZimbraAdmin._STATUS, elements);
		ZaApp.getInstance().getAppViewMgr().createView(this.getContentViewId(), elements);
		this._UICreated = true;
		ZaApp.getInstance()._controllers[this.getContentViewId ()] = this ;
	} catch (ex) {
		this._handleException(ex, "ZaStatusViewController.prototype._createUI", null, false);
		return;
	}	
}

ZaStatusViewController.prototype.refreshListener = function () {
	this.show();
}

ZaStatusViewController.prototype._handleException =
function(ex, method, params, restartOnError, obj) {
	if (ex.code && ex.code == ZmCsfeException.SVC_AUTH_REQUIRED) {
		this.popupErrorDialog(ZaMsg.SERVER_ERROR, ex);
	} else {
		ZaController.prototype._handleException.call(this, ex, method, params, restartOnError, obj);
	}
}	
