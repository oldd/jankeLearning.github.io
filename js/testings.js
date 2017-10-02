/*
on-demand network
    initializes with projects only
    clicking a project triggers a redraw method
        redraw
            args: node clicked
            return: modified network
            behavior: toggles all lessons' visibility prior to that project (and following previous parent projects).
    properties to add to nodes
        visible
        project or lesson
    open problems:
        how to simplify and fill out graph when toggling
            map project edges to nodes in another (more complete) graph?
    it should
        show only projects when loaded
        save progress through projects in cookies (store edges and nodes, have script know to use cookies or not)
        allow users to store notes in title. or the like
        expand to include all parent lessons (up to last project) when chosen(?)
        allow users to modify graph in place - send pull request 
    how
        creating new edges and nodes from whole bank recursively
            -- or just dataView/Set? --  
                file:///Users/master/Documents/elium/september_2017/vis/docs/data/dataview.html
                file:///Users/master/Documents/elium/september_2017/vis/docs/data/dataset.html
            nodes 
                if group = project
                    add to tree
                if chosen = true
                    use all parents up till last project
            edges ?
        function triggered when a project node is single clicked (look into events)
            global property?
        double clicking opens url (look into events)
        for dynamic changes to network - file:///Users/master/Documents/elium/september_2017/vis/docs/network/manipulation.html


connecting to cookies to store personal progress

global node/edge properties

hierarchical - left-right?
    file:///Users/master/Documents/elium/september_2017/vis/examples/network/layout/hierarchicalLayout.html
    file:///Users/master/Documents/elium/september_2017/vis/examples/network/layout/hierarchicalLayoutMethods.html
ndoe types
    file:///Users/master/Documents/elium/september_2017/vis/examples/network/nodeStyles/customGroups.html
    file:///Users/master/Documents/elium/september_2017/vis/examples/network/nodeStyles/groups.html

edge props to try
    chosen
        - used to expand an edge to lessons?
    group
    hidden

node props to try
    group   file:///Users/master/Documents/elium/september_2017/vis/docs/network/groups.html
        String  
        undefined   
        When not undefined, the node will belong to the defined group. 
            Styling information of that group will apply to this node. 
            Node specific styling overrides group styling.
    fixed
        Object or Boolean
        Object
        When true, the node will not move but IS part of the physics simulation. 
            When defined as an object, movement in either X or Y direction can be disabled.
        - fixed.x Boolean false   When true, the node will not move in the X direction.
        - fixed.y Boolean false   When true, the node will not move in the Y direction.
    chosen
    hidden  Boolean false   When true, the node will not be shown. It will still be part of the physics simulation though!
        - could make apparition less jarring
    level   Number  undefined   When using the hierarchical layout, the level determines where the node is going to be positioned.
    mass - higher mass for projects?

*/

    // create an array with nodes
    var nodes = new vis.DataSet([
        {id: 00, label: 'being a developer', 
                    title: 'devving is collaboration and communication',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/00-communications.md'},
        {id: 01, label: 'gh portfolio', 
                    title: 'your public face to the development world',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/01-gh-portfolio.md'},
        {id: 02, label: 'cleancalc 0-2', 
                    title: 'separate logic and framework',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/02-cleancalc-0-2.md'},
        {id: 03, label: 'be google', 
                    title: 'make a pretty page',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/03-be-google.md'},
        {id: 04, label: 'tictactoes', 
                    title: 'learn MVC',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/04-tictactoes.md'},
        {id: 05, label: 'battleship', 
                    title: 'feature-based development, from the front to the back',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/05-battleship.md'},
        {id: 06, label: 'mvc-lh calc', 
                    title: 'tictactoes meets cleancalc',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/06-mvc-lh-calc.md'},
        {id: 07, label: 'data model', 
                    title: 'think about your data, prepare for *book',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/07-data-model.md'},
        {id: 08, label: 'mini group project', 
                    title: 'a mini group project',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/08-mini-group-project.md'},
        {id: 09, label: 'assessment', 
                    title: 'all the skills you\'ll need for node',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/09-assessment.md'},
        {id: 10, label: '*Book', 
                    title: 'bringing it all together',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/10-starbook.md'},
        {id: 11, label: 'be youtube', 
                    title: 'using node as a build environmnet, axios',
                    url: 'https://github.com/jankeLearning/nodes/blob/master/sepco-projects-only/11-be-youtube.md'}
    ]);

    // create an array with edges
    var edges = new vis.DataSet([
        {from: 00, to: 01, arrows: 'to, middle'},
        {from: 01, to: 02, arrows: 'to, middle'},
        {from: 01, to: 03, arrows: 'to, middle'},
        {from: 02, to: 04, arrows: 'to, middle'},
        {from: 03, to: 05, arrows: 'to, middle'},
        {from: 04, to: 05, arrows: 'to, middle'},
        {from: 04, to: 06, arrows: 'to, middle'},
        {from: 05, to: 07, arrows: 'to, middle'},
        {from: 06, to: 07, arrows: 'to, middle'},
        {from: 05, to: 11, arrows: 'to, middle'},
        {from: 07, to: 08, arrows: 'to, middle'},
        {from: 07, to: 09, arrows: 'to, middle'},
        {from: 07, to: 10, arrows: 'to, middle'}
    ]);

    // options
    var options = {
        interaction:{hover:true},
        physics: {
            forceAtlas2Based: {
                gravitationalConstant: -26,
                centralGravity: 0.005,
                springLength: 230,
                springConstant: 0.18
            },
            maxVelocity: 146,
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: {iterations: 1500}
        }
    };

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var network = new vis.Network(container, data, options);

    // event listener
    network.on("selectNode", function (params) {
        if (params.nodes.length === 1) {
            var node = nodes.get(params.nodes[0]);
            window.open(node.url, '_blank');
        }
    });