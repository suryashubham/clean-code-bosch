function getStringsFromInitialLetter(initial_letter, name_list){
    if(!initial_letter || !Array.isArray(name_list) || !(name_list.length)) return null;
    return name_list.filter(item => item.startsWith(initial_letter))   
}

console.log(getStringsFromInitialLetter("B", ["Bosch", "Robert", "Bengalauru", "Lenovo", "Rubic"]))
