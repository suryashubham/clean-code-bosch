function getStringsFromInitialLetter(initialLetter, nameList){
  if(!initialLetter || !Array.isArray(nameList) || !(nameList.length)){
    return nameList.filter(item=>item.startsWith(initialLetter))
  }
}

console.log(getStringsFromInitialLetter("B",[""]))
