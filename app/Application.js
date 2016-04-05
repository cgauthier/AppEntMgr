Ext.define('AppEntMgr.Application', {
    extend: 'Ext.app.Application',
    requires: ['AppEntMgr.util.PUBSUB'],    
    name: 'AppEntMgr',
    stores: [],
    controllers: ['Main'],
    launch: function () {
        // TODO - Launch the application
    }
});
