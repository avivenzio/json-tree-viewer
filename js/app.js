(function(){
/*** Auto Test Code ***/
	//Create the tree
	Tree.createTree("treeContainer",600,1100);

	//Get Data and set in tree module
	d3.json("http://swapi.co/api/starships/", function(error, data) {
		var d = DataConversion.toNodes(data);
		console.log(d);
		Tree.setData(d);
	});
/*** End Auto TEst Code ***/

	// bind event listeners to button click and enter key
	document.getElementById("dataSubmit").onclick=function(){
		Tree.setData(DataConversion.toNodes(JSON.parse(document.getElementById("dataTextbox").value)));
		console.log("click btn");
	};

	document.getElementById("dataTextbox").onkeypress=function(e){
		if (e.keyCode == 13)
			Tree.setData(DataConversion.toNodes(JSON.parse(this.value)));
		console.log("key press" + e.keyCode);
	};

})();