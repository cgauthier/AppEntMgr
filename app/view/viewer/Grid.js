Ext.define("AppEntMgr.view.viewer.Grid", {
    extend: 'Ext.panel.Panel',
    requires: [
        "Ext.layout.container.Fit",
        "AppEntMgr.view.viewer.grid.Toolbar",
        "Ext.form.field.TextArea"
    ],
    xtype: "viewer-grid",
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);        
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        PUBSUB.sub('viewer-grid', 'viewer-grid', me.updateTextArea, me);

        me.layout = {
            type: 'fit'
        };

        me.border = true;

        me.bodyPadding = "10";
        
        me.items = [{
            xtype: 'textarea'
        }];
        
        me.bbar = {
            xtype: 'viewer-grid-toolbar'
        };
        
        me.callParent(arguments);
    },
    updateTextArea: function(data) {
        var me = this;
        me.down('textarea').setValue(data.data);
    }
});
