dir "." a/b/s > filename.txt
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
var arrayTest = [];
for(var i=0; i<temp1.length; i++) {
	var arr = [temp1[i], makeid(32)];
	arrayTest.push(arr)
}
JSON.stringify(arrayTest)