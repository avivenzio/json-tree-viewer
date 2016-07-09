DataConversion= (function(){
	//Initialize object level vars
	var visitSet = new Set(); //holds visited props
	var nodeStack = new Array(); // keeps track of Nodes created

	//Define Node Object
	function Node(name, children, value){
		this.name=name;
		this.children=children;
		this.value=value;
	};

	function visit(node, parent){
		visitSet.add(node.data);
		var newNode= new Node(node.name,[],node.data);
		nodeStack.push(newNode);
		parent.children.push(newNode);
	};

	//Find a property that has not been processed
	function getUnvisitedProp(obj){
		if(typeof obj ==='object' && obj!=null){
			var keylist=Object.keys(obj);
			if(!Array.isArray(obj) && keylist.length==1 && typeof obj[keylist[0]] !="object")
				return null;//leaf node
			for(var i=0; i < keylist.length; i++){
				var currObj= obj[keylist[i]];
				if(!visitSet.has(currObj)){
					return { //return if not in set
						data:currObj,
						name:keylist[i]
					};
				}
			}
		}
		return null; //visited all properties
	};

	return {
		//Converts JS Object to Node Object[]
		//Modified DFS approach
		toNodes: function(data){
			var rootNode = new Node("JSON",[], null);
			var results= rootNode;
			var objStack = new Array();
			objStack.push(data);
			nodeStack.push(rootNode);
			visit({data:data, name:'root'},rootNode);
			console.log(data);
			while(objStack.length>0){
				var n = objStack[objStack.length-1];
				rootNode = nodeStack[nodeStack.length-1];
				var prop= getUnvisitedProp(n);
				if(prop != null){
					visit(prop,rootNode);
					//console.log(prop);
					objStack.push(prop.data);
				}
				else{
					objStack.pop();
					nodeStack.pop();
				}
			}
			return results;
		}
	};

})();