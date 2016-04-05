Ext.define('AppEntMgr.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [],
    init: function() {
        this.control({
            'viewer-control-filtergrid textfield[action="filter"]': {
                "change": {
                    "fn": function(field, newV, oldV) {
                        var store = field.gridScope.getStore();
                        var dataIndex = field.up().dataIndex;
                        store.addFilter({
                            property: dataIndex,
                            value: newV
                        });
                    }                    
                }
            } 
        });
    }
});
