(function(){

/*** Auto Test Code ***/

	var mainTree = new Tree();
	//Create the tree
	mainTree.createTree("treeContainer",600,1100);

	//Get Data and set in tree module
	d3.json("http://swapi.co/api/starships/", function(error, data) {
		convertAndSetData(data);
	});

/*** End Auto TEst Code ***/
	
	// bind event listener to http btn
	document.getElementById("urlSubmit").onclick=function(){
	 	var urlToRequest = document.getElementById("urlTextbox").value;
	//TODO: validate URL

	 	d3.json(urlToRequest, function(error, data) {
	 		convertAndSetData(data);
		});

	};

	// bind event listeners to button click and enter key
	document.getElementById("dataSubmit").onclick=function(){
	 	convertAndSetData(JSON.parse(document.getElementById("dataTextbox").value));
	 	console.log("click btn");
	};

	document.getElementById("dataTextbox").onkeypress=function(e){
	 	if (e.keyCode == 13)
	 		convertAndSetData(JSON.parse(this.value));
	 	console.log("key press" + e.keyCode);
	};

	// //Utility function
	function convertAndSetData(dataObj){
	 	var treeData = DataConversion.toNodes(dataObj);
	 	console.log(treeData);
	 	mainTree.setData(treeData);
	 };

})();