Ext.define('AppEntMgr.view.viewer.control.WarningPopup', {
    extend: 'Ext.window.Window',
    xtype: 'viewer-control-warningpopup',
    requires: [
        'Ext.layout.container.VBox',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.toolbar.Toolbar'
    ],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    label: null,
    initComponent: function() {
        var me = this;
        me.title = "Warning";
        me.modal = true;
        me.bodyPadding = "10";
        me.height = 200;
        me.width = 400;
        me.layout = {
            type: 'vbox'
        };
        me.items = [{
            xtype: 'label',
            text: 'Search results exceeds threshold of 500 records.'
        }, {
            xtype: 'label',
            text: '750 records have been found, 250 records over the limit.'
        }, {
            xtype: 'radiogroup',
            columns: 1,
            vertical: true,
            margin: "15 0 0 0",
            items: [
                { boxLabel: 'Show only the first 500 records', name: 'threshold', inputValue: '1', checked: true },
                { boxLabel: 'Go back and refine your query', name: 'threshold', inputValue: '2' }
            ]
        }];
        
        me.bbar = {
            xtype: 'toolbar',
            style: appConfig.styling.toolbar.background,
            items: ["->", {
                xtype: 'button',
                text: 'Export all 750 records to CSV'
            }, {
                xtype: 'button',
                text: "OK",
                listeners: {
                    click: {
                        fn: function(btn) {
                            PUBSUB.pub('viewer-grid-lastupdateddate', {data: true});
                            var win = btn.up('window');
                            win.close();
                        },
                        scope: me
                    }
                } 
            }, {
                xtype: 'button',
                text: "Cancel",
                listeners: {
                    click: {
                        fn: function(btn) {
                            var win = btn.up('window');
                            win.close();
                        },
                        scope: me
                    }
                } 
            }]       
        };
        
        me.callParent(arguments);
    }
});
