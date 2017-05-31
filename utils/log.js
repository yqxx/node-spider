


module.exports = function(obj) {
	log(obj);
}

function log(obj){
	console.log('-----------------------');
	for(var o in obj){
		console.log('\'' + o + '\':' + obj[o]);
	}
	console.log('-----------------------');
}