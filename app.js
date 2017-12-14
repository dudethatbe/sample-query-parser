var query = {
  DBA:"False",
  Distributor:"Distributors",
  limit:"5000",
  offset:"0",
  Owner:"match=/chris/i",
  Priority:"ne=Fast Track",
  Tags:"match=/new/i"
};

generateDynamicQueryCondition: (queryParams) => {
  //filter out offset and limit
  let paramKeys = Object.keys(queryParams).filter((key) => !['offset', 'limit'].includes(key));
  
  //simply return empty string when no filter key is passed in
  if(!paramKeys.length) return ``;  

  let queryObj = ` WHERE `, count = 0;

  paramKeys.forEach((paramKey) => {
    if(count) queryObj +=  ` AND `;

    let paramValue = queryParams[paramKey];
    //Add the key to query object
    queryObj += `name='${paramKey}' AND `;

    //pattern match 
    if(paramValue.includes('match')){
      let value = paramValue.split('/')[1];
      queryObj += (value.toLowerCase() === 'nobody') ? 
                              (`(value = '' OR value IS NULL)`) : (`value LIKE '%${value}%'`)
    }
    //not equal to matcher 
    else if(paramValue.includes('ne')){
      let value = paramValue.split('=')[1];
      queryObj += `value <> '${value}'`;
    }
    //equality match
    else{
      queryObj += `value = '${paramValue}'`;
    }
    // queryObj += `)`
    count++;
  });

  return queryObj;
}