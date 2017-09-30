//window.onload = function() {
    // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 00, label: 'being a developer', title: 'devving is collaboration and communication'},
        {id: 01, label: 'gh portfolio', title: 'your public face to the development world'},
        {id: 02, label: 'cleancalc 0-2', title: 'separate logic and framework'},
        {id: 03, label: 'be google', title: 'make a pretty page'},
        {id: 04, label: 'tictactoes', title: 'learn MVC'},
        {id: 05, label: 'battleship', title: 'feature-based development, from the front to the back'},
        {id: 06, label: 'mvc-lh calc', title: 'tictactoes meets cleancalc'},
        {id: 07, label: 'data model', title: 'think about your data, prepare for *book'},
        {id: 08, label: 'mini group project', title: 'a mini group project'},
        {id: 09, label: 'assessment', title: 'all the skills you\'ll need for node'},
        {id: 10, label: '*Book', title: 'bringing it all together'},
        {id: 11, label: 'be youtube', title: 'using node as a build environmnet, axios'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 00, to: 01, arrows: 'to'},
        {from: 01, to: 02, arrows: 'to'},
        {from: 01, to: 03, arrows: 'to'},
        {from: 02, to: 04, arrows: 'to'},
        {from: 03, to: 05, arrows: 'to'},
        {from: 04, to: 05, arrows: 'to'},
        {from: 04, to: 06, arrows: 'to'},
        {from: 05, to: 07, arrows: 'to'},
        {from: 06, to: 07, arrows: 'to'},
        {from: 06, to: 11, arrows: 'to'},
        {from: 07, to: 08, arrows: 'to'},
        {from: 07, to: 09, arrows: 'to'},
        {from: 07, to: 10, arrows: 'to'}
    ]);

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {interaction:{hover:true}};
    var network = new vis.Network(container, data, options);

    network.on("click", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4);
        console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM));
    });
    network.on("doubleClick", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h2>doubleClick event:</h2>' + JSON.stringify(params, null, 4);
    });
    network.on("oncontext", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h2>oncontext (right click) event:</h2>' + JSON.stringify(params, null, 4);
    });
    network.on("dragStart", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h2>dragStart event:</h2>' + JSON.stringify(params, null, 4);
    });
    network.on("dragging", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h2>dragging event:</h2>' + JSON.stringify(params, null, 4);
    });
    network.on("dragEnd", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h2>dragEnd event:</h2>' + JSON.stringify(params, null, 4);
    });
    network.on("zoom", function (params) {
        document.getElementById('eventSpan').innerHTML = '<h2>zoom event:</h2>' + JSON.stringify(params, null, 4);
    });
    network.on("showPopup", function (params) {
        document.getElementById('eventSpan').innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4);
    });
    network.on("hidePopup", function () {
        console.log('hidePopup Event');
    });
    network.on("select", function (params) {
        console.log('select Event:', params);
    });
    network.on("selectNode", function (params) {
        console.log('selectNode Event:', params);
    });
    network.on("selectEdge", function (params) {
        console.log('selectEdge Event:', params);
    });
    network.on("deselectNode", function (params) {
        console.log('deselectNode Event:', params);
    });
    network.on("deselectEdge", function (params) {
        console.log('deselectEdge Event:', params);
    });
    network.on("hoverNode", function (params) {
        console.log('hoverNode Event:', params);
    });
    network.on("hoverEdge", function (params) {
        console.log('hoverEdge Event:', params);
    });
    network.on("blurNode", function (params) {
        console.log('blurNode Event:', params);
    });
    network.on("blurEdge", function (params) {
        console.log('blurEdge Event:', params);
    });
//};
