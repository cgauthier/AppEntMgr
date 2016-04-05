var appConfig;
Ext.Ajax.request({
    method: 'GET',
    url: 'resources/AppConfig.json',
    success: function(resp, options) {
        appConfig = Ext.decode(resp.responseText).data;
        Ext.application({
            name: 'AppEntMgr',
            extend: 'AppEntMgr.Application',
            autoCreateViewport: true
        });
    },
    failure: function() {}
});



