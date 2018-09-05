var data = [];
// ...
data[0] = { "ID": "1", "Status": "Valid" };
data[1] = { "ID": "2", "Status": "Invalid" };
// ...
var tempData = [];
for ( var index = 0; index < data.length; index++ ) {
    if ( data[index].Status === "Valid" ) {
        tempData.push( data );
    }
}
data = tempData;

console.log(data)