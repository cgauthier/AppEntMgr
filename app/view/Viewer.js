Ext.define("AppEntMgr.view.Viewer", {
    extend: 'Ext.panel.Panel',
    requires: [
        "Ext.layout.container.Border",
        "AppEntMgr.view.viewer.Control",
        "AppEntMgr.view.viewer.Grid"
    ],
    xtype: "viewer",
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
        
        me.items = [{
            region: 'west',
            width: 340,
            xtype: 'viewer-control'
        }, {
            region: 'center',
            xtype: 'viewer-grid',
            reference: 'GridViewer',
            title: 'Users View - Records Found: 200'
        }];
        
        me.callParent(arguments);
    }
});
