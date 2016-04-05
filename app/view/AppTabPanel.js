Ext.define("AppEntMgr.view.AppTabPanel", {
    extend: 'Ext.tab.Panel',
    requires: [
        "AppEntMgr.view.Viewer"
    ],
    xtype: 'apptabpanel',
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);        
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        
        me.items = [{
            xtype: 'viewer',
            title: "Viewer"
        }, {
            xtype: 'panel',
            title: 'Editor'
        }];
        
        me.callParent(arguments);
    }
});
