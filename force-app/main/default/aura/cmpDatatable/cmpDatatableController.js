({
    doInit: function (cmp, event, helper) {
        console.log("init started")
        cmp.set('v.atomicChanges', []);
        cmp.set('v.draftValues', []);
        var actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' },
            { label: 'Change Owner', name: 'change_owner' },
        ]; 
        cmp.set('v.mycolumns', [
            {label: 'Contact Name', fieldName: 'contactUrl', type: 'url', typeAttributes: { label: { fieldName: 'Name' }} },
            {label: 'Title', fieldName: 'Title', type: 'text', editable: true },
            {label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true},
            {label: 'Email', fieldName: 'Email', type: 'email', editable: true},
            {label: 'Do Not Call', fieldName: 'DoNotCall', 
            type: 'boolean', 
            editable: true, 
            cellAttributes: { alignment: 'center'}, 
            initialWidth:120},
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        helper.getData(cmp);
        
        helper.resolveSaveLocalStorage(cmp);
        helper.resolveAutoSaveValue(cmp);        
        if (cmp.get('v.saveLocalStorage')) {
            helper.resolveDraftValues(cmp);
        }
    },
    handleClick: function(component, event, helper) {
		component.set("v.typeTest", "date")
	},
    handleSave: function (cmp, event, helper) {
        var draftValues = event.getParam('draftValues');
        helper.saveChanges(cmp, draftValues);
    },
    handleSaveInLocalStorage: function (cmp, event, helper) {
        helper.handleSaveInLocalStorage(cmp, event);
    },
    handleEditCell: function (cmp, event, helper) {
        helper.handleEditCell(cmp, event);
    },
    handleCancel: function (cmp, event, helper) {
        //var cancelConfirmation = confirm("Are you sure? you will lose your changes!");
        //if (cancelConfirmation) {
        helper.clearDraftValuesLS();
        //} else {
        //    event.preventDefault();
        //}
    },
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        cmp.set("v.selectedRow", row.Id);
        var tmp = cmp.find("recHandler");
        tmp.set("v.recordId", row.Id);
        tmp.reloadRecord();
        console.log("t: ", cmp.get("v.selectedRow"))
        console.log("t: ", cmp.get("v.targetFields"))
        switch (action.name) {
            case 'edit':
                var evt = $A.get("e.c:recordChange");
                evt.setParams({
                    "message" : row.Id });
                evt.fire();
                break;
            case 'delete':
                var rows = cmp.get('v.mydata');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                cmp.set('v.mydata', rows);
                
                // tmp.deleteRecord();
                // helper.deleteRec();
        }
    },
    toggleColumn: function(component,event,helper) {
		var event = $A.get("e.c:toggleColumn");
		event.fire();
	}
})