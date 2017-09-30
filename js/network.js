//window.onload = function() {

    // https://jsfiddle.net/qpd63j7r/

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
        {from: 07, to: 10, arrows: 'to, middle' }
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
            stabilization: {iterations: 150}
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
       
//};
