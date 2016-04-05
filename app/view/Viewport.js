Ext.define("AppEntMgr.view.Viewport", {
    extend: 'Ext.container.Viewport',
    requires: [
        "Ext.layout.container.Border",
        "AppEntMgr.view.AppContext",
        "AppEntMgr.view.AppTabPanel"
    ],
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
        
        me.items = [{
            xtype: 'appcontext',
            region: 'north'
        }, {
            xtype: 'apptabpanel',
            region: 'center'
        }];
        
        me.callParent(arguments);
    }
});
