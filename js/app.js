(function(){

	//Create the tree
	Tree.createTree("body",800,800);

	//Get Data and set in tree module
	d3.json("http://swapi.co/api/starships/", function(error, data) {
		Tree.setData(DataConversion.toNodes(data));
	});

})();