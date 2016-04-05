Ext.define('AppEntMgr.view.viewer.control.FilterPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'viewer-control-filterpanel',
    requires: [
        'Ext.layout.container.VBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],
    uses: ['AppEntMgr.view.viewer.control.FilterGridPopup'],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    scrollable: true,
    initComponent: function() {
        var me = this;

        PUBSUB.sub('viewer-control-filterpanel', 'viewer-control-filterpanel', me.updatePanel, me);
        
        me.bodyPadding = "10";
        
        me.layout = {
            type: 'vbox',
            align: 'stretch'
        };
        
        me.items = [];
        
        me.generateItems(me.items);
        
        me.bbar = {
            xtype: 'toolbar',
            style: appConfig.styling.toolbar.background,
            items: ["->", {
                xtype: 'button',
                text: 'Reset',
                listeners: {
                    click: {
                        fn: function(btn) {
                            var me = this;
                            me.getForm().reset();
                            me.prev().down('combo').setValue();
                            me.next().down('radiogroup').setValue({
                                view: 'Users' // need to set a default value in AppConfig.js file to fall back too 
                            });
                        },
                        scope: me
                    }
                }
            }]
        };
        me.callParent(arguments);
    },
    openPopup: function(field, trigger, event, label, ref) {
        var win = Ext.create('AppEntMgr.view.viewer.control.FilterGridPopup', {
            label: label,
            ref: ref,
            field: field
        });
        win.show();
    },
    updatePanel: function() {
        var me = this;
        me.removeAll();
        Ext.suspendLayouts();
        me.generateItems();
        Ext.resumeLayouts();
        me.doLayout();
    },
    generateItems: function(items) {
        var me = this,
            context = appConfig.appContext.defaultValue,
            fields = appConfig.scope[context].filtercriteria.fields,
            x, l = fields.length, field,
            controls = appConfig.controls, push;
          
        push = (Ext.isArray(items) ? true : false);
        
        for(x = 0; x < l; x++) {
            field = Ext.clone(controls[fields[x]]);
            if(field.triggers) {
                field.triggers.show.handler = Ext.Function.bind(me.openPopup, me, field.action.params, true);                
            }
            if(push) {
                items.push(field);
            } else {
                me.add(field);
            }
        }
    }
});
