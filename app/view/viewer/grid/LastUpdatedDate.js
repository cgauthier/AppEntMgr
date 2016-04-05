Ext.define('AppEntMgr.view.viewer.grid.LastUpdatedDate', {
    extend: 'Ext.form.field.Display',
    xtype: 'viewer-grid-lastupdateddate',
    requires: [],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        PUBSUB.sub('viewer-grid-lastupdateddate', 'viewer-grid-lastupdateddate', me.updateDate, me); 
        me.value = "";
        me.callParent(arguments);
    },
    updateDate: function() {
        var me = this,
            prefix = 'Run Date: ',
            now = new Date(),
            format = "M d, Y : G:i:s",
            val = Ext.Date.format(now, format),
            str = prefix + val;
        
        me.setValue(str);
    }
    
});
