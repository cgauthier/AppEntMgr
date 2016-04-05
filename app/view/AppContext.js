Ext.define("AppEntMgr.view.AppContext", {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        "AppEntMgr.view.appcontext.Combo"
    ],
    xtype: 'appcontext',
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);        
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        
        me.style = appConfig.styling.toolbar.background;
        me.items = [{
            xtype: 'appcontext-combo'
        }, {
            xtype: 'label',
            cls: 'appContextLabel',
            html: "&nbsp;",
            listeners: {
                afterrender: {
                    fn: function(cmp)  {
                        var cmb = cmp.prev();
                        var store = cmb.getStore();
                        var idx = store.find('value', cmb.getValue());
                        var val = store.getAt(idx).data.label;
                        cmp.setText(val);
                    }
                }
            }
        }, "->", {
            fieldStyle: appConfig.styling.toolbar.font,
            xtype: 'displayfield',
            value: 'Logged As: "Claude Gauthier"'
        }];
        
        me.callParent(arguments);
    }
});
