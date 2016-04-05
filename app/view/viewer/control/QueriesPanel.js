Ext.define('AppEntMgr.view.viewer.control.QueriesPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewer-control-queriespanel',
    requires: [
        'Ext.layout.container.HBox',
        'AppEntMgr.view.viewer.control.Combo'
    ],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        
        me.layout = {
            type: 'hbox'
        };
     
        me.items = [{
            flex: 1,
            fieldLabel: 'Queries',
            labelAlign: 'top',
            xtype: 'viewer-control-combo'
        }];
        
        me.callParent(arguments);
    }
});
