var query = {
  DBA:"False",
  Distributor:"Distributors",
  limit:"5000",
  offset:"0",
  Owner:"match=/chris/i",
  Priority:"ne=Fast Track",
  Tags:"match=/new/i"
};

function parseAndGenerateSqlQuery(query){
  let keys = Object.keys(query)
             .filter( (key) =>  !['limit', 'offset'].includes(key));
  
  let queryObj = '';
  
  var count = 0;
  keys.forEach((key) => {
    
    if(count != 0) queryObj += ' AND ';

    let value = query[key];
    let v = '';
    queryObj += `( name = '${key}' AND `


     
     if(value.includes('match=')){
        v =  value.split('/')[1]
        queryObj += ` value LIKE '${v}' `;
     }
    else if( value.includes('ne=')){
        v =  value.split('=')[1];
        queryObj += ` value <> '${v}' `
    }
    else{
      queryObj += ` value = '${value}' ` 
    }
    queryObj += ` ) `
    count++;
  });
  
  return queryObj;
}

var data = parseAndGenerateSqlQuery(query);
console.log(data);