Ext.define('AppEntMgr.view.viewer.control.FilterGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'viewer-control-filtergrid',
    requires: [
        'Ext.selection.CheckboxModel',
        'Ext.data.Store',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    label: null,
    ref: null,
    field: null,
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this,
            context = appConfig.appContext.defaultValue,
            ref = me.ref,
            cfg = appConfig.viewer.filtergrid[context][ref],
            x, l;    
        
        me.selModel = {
            selType: 'checkboxmodel'
        };
        me.viewConfig = {
            forceFit: true
        };
        me.columns = cfg.columns;
        
        l = me.columns.length;
        for(x = 0; x < l; x++) {
            me.columns[x].items[0].gridScope = me;
        }
        
        me.store = Ext.create('Ext.data.Store', {
            fields: cfg.fields,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'resources/data/filtercriteria/' + ref + '.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            } 
        });
        
        me.tbar = {
            xtype: 'toolbar',
            style: appConfig.styling.toolbar.background,
            items: ["->", {
                xtype: 'button',
                text: 'Clear Filters',
                action: 'filter',
                listeners: {
                    "click": {
                        fn: function(btn) {
                            var me = this,
                                fields = Ext.ComponentQuery.query('textfield', me),
                                x, l = fields.length;
                                
                            for(x = 0; x < l; x++) {
                                fields[x].setValue(null);
                            }
                            me.getStore().clearFilter();
                        },
                        scope: me
                    }
                }                      
            }]
        };
        
        me.bbar = {
            xtype: 'toolbar',
            style: appConfig.styling.toolbar.background,
            items: ["->", {
                xtype: 'button',
                text: 'Cancel',
                listeners: {
                    click: {
                        fn: function(btn) {
                            btn.up('window').close();
                        }
                    }
                }   
            }, {
                xtype: 'button',
                text: 'Select',
                listeners: {
                    click: {
                        fn: function(btn) {
                            var me = this,
                                selection = me.getSelectionModel().getSelection(),
                                data = [], x, l = selection.length, rec, item, str = "";
                                
                            if(l > 0) {
                                for(x = 0; x < l; x++) {
                                    rec = selection[x].data;
                                    data.push(rec.column1);
                                }
                                str = data.join(', ');
                            }
                            me.field.setValue(str);
                            btn.up('window').close();
                        },
                        scope: me
                    }
                }
            }]
        };
        
        me.callParent(arguments);
    }
});
