Ext.define('AppEntMgr.view.appcontext.Combo', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'appcontext-combo',
    requires: [
        'Ext.data.Model',
        'Ext.data.Store'
    ],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this,
            model = Ext.define('AppContextCombo', {
                extend: 'Ext.data.Model',
                fields: appConfig.appContext.fields
            }),
            store = Ext.create('Ext.data.Store', {
                model: model,
                data: appConfig.appContext.data
            });
            
        me.store = store;
        me.queryMode = 'local';
        me.displayField = 'label';
        me.valueField = 'value';
        me.value = appConfig.appContext.defaultValue;
        me.emptyText = "Select App Context";

        me.listeners = {
            select: {
                fn: function(cmb, rec, opt) {
                    var me = this,
                        viewport = me.up('viewport'),
                        panelScope = viewport.down('viewer-control');
                        
                    appConfig.appContext.defaultValue = cmb.getValue();
                    PUBSUB.pub('viewer-control-combo', {data: true});
                    PUBSUB.pub('viewer-control-filterpanel', {data: true});
                    PUBSUB.pub('viewer-control-viewselectionpanel', {data: true});
                    PUBSUB.pub('viewer-grid-toolbar', {data: true});
                    PUBSUB.pub('viewer-grid-lastupdateddate', {data: true});
                    cmb.next().setText(rec.data.label);   
                },
                scope: me
            },
            afterrender: {
                fn: function(cmb) {
                    cmb.setValue(appConfig.appContext.defaultValue);
                }
            }
            
        };

        me.callParent(arguments);
    }
});
