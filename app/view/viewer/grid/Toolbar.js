Ext.define('AppEntMgr.view.viewer.grid.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [
        'AppEntMgr.view.viewer.grid.LastUpdatedDate',
        'Ext.button.Button',
        'Ext.form.field.Display'
    ],
    xtype: 'viewer-grid-toolbar',
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this, lastUpdate, items = [], toolbar1, toolbar2;
        PUBSUB.sub('viewer-grid-toolbar', 'viewer-grid-toolbar', me.updateToolbar, me); 
        me.style = appConfig.styling.toolbar.background;
        me.padding = "0"; 
        me.margin = "0";
        
        me.generateItems(items);

        toolbar1 = {
            flex: 1,
            xtype: 'toolbar',
            ref: 'scrollingtoolbar',
            overflowHandler: 'scroller',
            style: appConfig.styling.toolbar.background,
            margin: "0 0 0 5",
            padding: "3 4 4 4",
            items: items
        };
        
        lastUpdate = {
            xtype: 'viewer-grid-lastupdateddate',
            fieldStyle: appConfig.styling.toolbar.font, margin: "0 10 0 10"
        };

        toolbar2 = {
            width: 170,
            width: 370,
            xtype: 'toolbar',
            style: appConfig.styling.toolbar.background,
            margin: "0",
            padding: "3 4 4 4",
            items: ["->", lastUpdate, {
                xtype: 'button', text: 'Set Criteria'
            },  {
                xtype: 'button', text: 'Refresh'
            }]
        };

        me.items = [toolbar1,toolbar2]; 
        
        me.callParent(arguments);

        PUBSUB.pub('viewer-grid-lastupdateddate', { data: true });
    },
    generateItems: function(items) {
        var context = appConfig.appContext.defaultValue,
            fields = appConfig.scope[context].filtercriteria.fields,
            x, l = fields.length, field, controls = appConfig.controls;

        for (x = 0; x < 1; x++) {
            field = Ext.clone(controls[fields[x]]); 
            items.push({
                xtype: 'displayfield',
                value: field.statusBarLabel + ': XXXX',
                fieldStyle: appConfig.styling.toolbar.font
            });

            if (x < (l - 1)) {
                items.push({
                    xtype: 'tbseparator'
                });
            }
        }
    },
    updateToolbar: function() {
        var me = this,
            scroller = me.down('toolbar[ref="scrollingtoolbar"]'),
            items = [];

        scroller.removeAll(); 
        Ext.suspendLayouts(); 
        me.generateItems(items);
        scroller.add(items); 
        Ext.resumeLayouts(); 
        scroller.doLayout();
    }
});