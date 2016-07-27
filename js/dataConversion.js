DataConversion= (function(){
	//Initialize object level vars
	var visitSet = new Set(); //holds visited props
	var nodeStack = new Array(); // keeps track of Nodes created

	//Define Node Object
	function Node(name, children, value){
		//Set object members
		this.name=name;
		this.children=children;
		this.value=value;
		//Set Node datatype
		this.setTypeFromValue(value);
	};

	Node.prototype.setTypeFromValue = function(obj){
		var type = typeof obj;
		if(type === 'object'){
			if(Array.isArray(obj))
				type = "array";
			else if (obj instanceof String)
				type = "string";
			else if (obj instanceof Number)
				type = "number";
			else if (obj instanceof Boolean)
				type = "boolean";
		}
		this.type= type;
	};

	//create Node object and add to
	function visit(node, parent){
		visitSet.add(node.data);
		var newNode= new Node(node.name,[],node.data);
		//Check type and place non objects as data
		//if(typeof node.data != 'object')
		if(typeof node.data != 'object' || node.data instanceof String || node.data instanceof Number || node.data instanceof Boolean)
			newNode.children.push(new Node(node.data,[],node.data));
		nodeStack.push(newNode);
		parent.children.push(newNode);
	};

	function convertToReference(value){
		if (typeof value ==='object')
			return value;
		else if (typeof value ==='string')
			return new String(value);
		else if (typeof value ==='number')
			return new Number(value);
		else if (typeof value ==='boolean')
			return new Boolean(value);
	};

	//Find a property that has not been processed
	function getUnvisitedProp(obj){
		if(typeof obj ==='object' && obj!=null && !(obj instanceof String) && !(obj instanceof Number) && !(obj instanceof Boolean)){
		//if(typeof obj ==='object' && obj!=null){
			var keylist=Object.keys(obj);
			for(var i=0; i < keylist.length; i++){
				//make Reference types
				obj[keylist[i]] = convertToReference(obj[keylist[i]]);
				var currObj= obj[keylist[i]];
				console.log(obj);
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
			var rootNode = new Node("JSON",[], data);
			var results= rootNode;
			var objStack = new Array();
			objStack.push(data);
			nodeStack.push(rootNode);
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
			console.log(visitSet);
			return results;
		}
	};

})();