Ext.define('AppEntMgr.view.viewer.control.Combo', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'viewer-control-combo',
    requires: [
        'Ext.data.Store'
    ],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    scrollable: true,
    initComponent: function() {
        var me = this;

        PUBSUB.sub('viewer-control-combo', 'viewer-control-combo', me.updateStore, me);
    
        me.store = me.createStore();
        me.queryMode = "local";
        me.displayField = "label";
        me.valueField = "value";
        
        me.listeners = {
            "select": {
                "fn": function(cmb, recs, opts) {
                    var me = this,
                        context = appConfig.appContext.defaultValue,
                        query = cmb.getValue(),
                        queryFields = appConfig.viewer.queries[context].queries[query],
                        queryContainer = me.up(),
                        filterCriteriaContainer = queryContainer.next(),
                        item, cmp, ref, cfg, valObj = {};
                        
                    for(item in queryFields) {
                        cfg = queryFields[item];
                        ref = cfg.type + "ref='" + item + "']";
                        cmp = filterCriteriaContainer.down(ref);
                        if(cfg.type == "radiogroup") {
                            valObj = {};
                            valObj[cfg.name] = cfg.value;
                            cmp.setValue(valObj);
                        } else {
                            cmp.setValue(cfg.value);
                        }
                    }
                },
                scope: me
            }
        };
        
        me.callParent(arguments);
    },
    updateStore: function() {
        var me = this,
            store = me.createStore();
            
        me.setStore(store);
        me.setValue(null);
    },
    createStore: function() {
        var context = appConfig.appContext.defaultValue;
        return Ext.create('Ext.data.Store', {
           fields: appConfig.viewer.queries[context].fields,
           data: appConfig.viewer.queries[context].combo 
        });
    }
});
