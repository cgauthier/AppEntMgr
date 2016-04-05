Ext.define("AppEntMgr.view.viewer.Control", {
    extend: 'Ext.panel.Panel',
    requires: [
        "Ext.layout.container.Border",
        "AppEntMgr.view.viewer.control.QueriesPanel",
        "AppEntMgr.view.viewer.control.FilterPanel",
        "AppEntMgr.view.viewer.control.ViewSelectionPanel"
    ],
    xtype: "viewer-control",
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);        
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        
        me.layout = {
            type: 'border'
        };
        me.border = true;
        me.title = "Query Panel";

        me.defaults = {
            bodyPadding: "10"
        };
        
        me.items = [{
            region: "north",
            xtype: "viewer-control-queriespanel",
            height: 80
        }, {
            region: "center",
            xtype: "viewer-control-filterpanel",
            title: 'Filter Criteria'
        }, {
            region: "south",
            xtype: "viewer-control-viewselectionpanel",
            title: "Select View"
        }];
        
        me.callParent(arguments);
    }
});
