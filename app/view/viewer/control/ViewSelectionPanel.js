Ext.define('AppEntMgr.view.viewer.control.ViewSelectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'viewer-control-viewselectionpanel',
    requires: [
        'Ext.layout.container.Fit',
        'Ext.form.RadioGroup',
        'Ext.button.Button',
        'Ext.toolbar.Toolbar'
    ],
    uses: ['AppEntMgr.view.viewer.control.WarningPopup'],
    constructor: function(cfg) {
        var me = this;
        Ext.apply(me, cfg);
        me.callParent(arguments);
    },
    initComponent: function() {
        var me = this;
        PUBSUB.sub('viewer-control-viewselectionpanel', 'viewer-control-viewselectionpanel', me.updatePanel, me);
        me.layout = {
            type: 'fit'
        };
        me.items = [me.generateItem()];
        me.bbar = {
            xtype: 'toolbar',
            style: appConfig.styling.toolbar.background,
            items: ["->", {
                xtype: 'button',
                text: 'Save As Query'
            }, {
                xtype: 'button',
                text: 'Export to Excel'
            }, {
                xtype: 'button',
                text: 'Search',
                listeners: {
                    click: {
                        fn: Ext.Function.bind(me.openPopup, me, null)                     
                    }
                }
            }]
        };
        me.callParent(arguments);
    },
    openPopup: function(field, trigger, event) {
        var me = this,
            viewport = me.up('viewport'),
            g = viewport.down('panel[reference="GridViewer"]'),
            rg = me.down('radiogroup[reference="viewselection"]'),
            win, params;
            
       params = me.getParamsValues();
       PUBSUB.pub('viewer-grid', { data: JSON.stringify(params, null, "\t") } );
       g.setTitle(rg.getValue().view + " View - Records Found: 200");
       // win = Ext.create('AppEntMgr.view.viewer.control.WarningPopup');
       // win.show()
    },
    updatePanel: function() {
        var me = this;
        me.removeAll();
        Ext.suspendLayouts();
        me.add(me.generateItem());
        Ext.resumeLayouts();
        me.doLayout();
    },
    generateItem: function() {
        var me = this,
            item = {
                xtype: 'radiogroup',
                reference: 'viewselection',
                vertical: true,
                columns: 1  
            },
            context = appConfig.appContext.defaultValue,
            fields = appConfig.scope[context].viewselectionpanel.fields,
            x, l = fields.length, radioItems = [];
            
        for(x = 0; x < l; x++) {
            radioItems.push({
               boxLabel: fields[x],
               name: 'view',
               inputValue: fields[x],
               checked: ((x == 0) ? true : false) 
            });
        }
        item.items = radioItems;
        return item;
    },
    getParamsValues: function() {
        var me = this,
            filterCriteriaPanel = me.prev(),
            fields = filterCriteriaPanel.getForm().getFields().items,
            x, l = fields.length,
            field, params = {}, val,
            valArr, y, ll, singleItem;
            
        for(x = 0; x < l; x++)  {
            field = fields[x];
            if(field.ref) {
                params[field.ref] = [];
                switch(field.xtype) {
                    case "radiogroup": 
                        params[field.ref].push(Ext.String.trim(field.getValue()[field.ref]));
                    break;
                    
                    default:
                          val = field.getValue();
                          va = Ext.String.trim(val);
                          if(val.length > 0) {
                              valArr = val.split(",");
                              ll = valArr.length;
                              if(ll > l) {
                                  for(y = 0; y < ll; y++) {
                                      singleItem = Ext.String.trim(valArr[y]);
                                      params[field.ref].push(singleItem);
                                  }
                              } else {
                                  params[field.ref].push(Ext.String.trim(valArr[0]));
                              }
                          }                  
                    
                    break;
                }
            }
        }
        
        params['view'] = [me.down('radiogroup').getValue()['view']];
        return params;
        
    }
});
