let addFileWindow = Ext.create('Ext.window.Window', {
    title: 'Add File',
    width: 300,
    height: 150,
    modal: true,
    layout: 'fit',
    items: [{
        xtype: 'form',
        bodyPadding: 10,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'File Name',
            name: 'fileName'
        }],
        buttons: [{
            text: 'Add File',
            handler: function () {
                var fileName = this.up('form').getForm().getFieldValues().fileName;
                let selectedNode = getSelectedNode();
                let newNode = Ext.create('Ext.data.TreeModel', {
                    text: fileName,
                    leaf: true
                });
                if (!selectedNode.isLeaf()) {
                    selectedNode.appendChild(newNode);
                } else {
                    selectedNode.parentNode.appendChild(newNode);
                }
                addFileWindow.hide();
            }
        }]
    }]
});

let storeData = Ext.create('Ext.data.TreeStore', {
    root: {
        text: 'MySampleApp',
        expanded: true,
        children: [{
            text: 'app',
            children: [{
                text: 'model',
                children: [{
                    text: 'Base.js',
                    leaf: true
                }, {
                    text: 'Personnel.js',
                    leaf: true
                }]
            }, {
                text: 'store',
                children: [{
                    text: 'Personnel.js',
                    leaf: true
                }]
            }, {
                text: 'view'
            }, {
                text: 'Application.js',
                leaf: true
            }, {
                text: 'Application.scss',
                leaf: true
            }]

        }, {
            text: ' build',
            children: [{
                text: 'development',
                children: [{
                    text: 'classic'
                }, {
                    text: 'Base.js',
                    leaf: true
                }, {
                    text: 'Personnel.js',
                    leaf: true
                }]
            }]
        }, {
            text: 'classic'
        }, {
            text: '.gitignore',
            leaf: true
        }, {
            text: 'app.js',
            leaf: true
        }, {
            text: 'app.json',
            leaf: true
        }, {
            text: 'bootstrap.css',
            leaf: true
        }]
    }
})

let Add = Ext.create('Ext.tree.Panel', {
    renderTo: document.body,
    title: 'VSCode',
    width: 300,
    height: 500,
    autoscroll: true,
    header: {
        itemPosition: 1,
        items: [{
            xtype: 'button',
            text: '+',
            handler: function () {
                addFileWindow.show();
            }
        }]
    },
    store: storeData

})


function getSelectedNode() {
    var selectedNodes = Add.getSelection();
    if (selectedNodes.length > 0) {
        var selectedNode = selectedNodes[0];
        return selectedNode;
    } else {
        console.log('No item selected.');
    }
}
