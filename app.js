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
  let paramKeys = Object.keys(queryParams).filter((key) => !['offset', 'limit', 'sort'].includes(key));
  if(!paramKeys.length) return ``;  
  
  return ' WHERE ' + paramKeys.map(function(v, index, vals) {
    let filter = `name='${v}' AND `, 
      value = queryParams[v];
    
    if (v.includes('match')) {
      let subVal = value.split('/')[1];
      return (value.toLowerCase() === 'nobody') ?
        filter + `(value = '' OR value IS NULL)` : filter + `value LIKE '%${value}%'`);
    } // does `ne` match anything that isn't the filter?
    if (v.includes('ne') {
      let subVal = value.split('=')[1];
      return filter + `value <> '${value}'`;
    }
    return filter + `value = '${value}'`;
  }).join(' AND ');  
}
