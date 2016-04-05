Ext.define('AppEntMgr.view.viewer.control.FilterGridPopup', {
    extend: 'Ext.window.Window',
    xtype: 'viewer-control-filtergridpopup',
    requires: [ 
        'AppEntMgr.view.viewer.control.FilterGrid',
        'Ext.layout.container.Fit'
    ],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    label: null,
    ref: null,
    field: null,
    initComponent: function() {
        var me = this;
        me.bodyPadding = "0";
        me.title = "Filter Criteria for " + me.label;
        me.modal = true;
        me.height = 400;
        me.width = 300;
        me.resizable = false;
        me.layout = {
            type: 'fit'
        };
        
        me.items = [{
            xtype: 'viewer-control-filtergrid',
            reference: 'filtergrid',
            label: me.label,
            ref: me.ref,
            field: me.field
        }];
                    
        me.callParent(arguments);
    }
});
