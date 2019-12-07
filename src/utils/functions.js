function arraysContains(where, what){
  let result = true
  what.forEach(element => {
    if (!where.contains(element)) result = false
  })
  return result
}

function isJSON(str) {
  try {
      return (JSON.parse(str) && !!str);
  } catch (e) {
      return false;
  }
}

module.exports = {
  arraysContains,
  isJSON
}