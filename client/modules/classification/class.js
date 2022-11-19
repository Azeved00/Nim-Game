var classTable = {
  total: 0,
  vsAi : 0,
  vsAi1: 0,
  vsAi2: 0,
  vsAi3: 0,
  vsPla: 0,
  won  : 0,

  addEntry(usr, ai ,dific, res) {
    var entry = createElem("tr");
    entry.appendChild(createElemT("td",usr));
    this.total++;
    if(ai){
        entry.appendChild(createElemT("td","Vs. Ai"));
        this.vsAi++;
        if(dific == 1){
            entry.appendChild(createElemT("td","Easy"));
            this.vsAi1++;
        }
        else if(dific == 2){
            entry.appendChild(createElemT("td","Medium"));
            this.vsAi2;
        }
        else if(dific == 3){
            entry.appendChild(createElemT("td","Hard"));
            this.vsAi3;
        }
    }
    else{
        entry.appendChild(createElemT("td","Vs Player"));
        entry.appendChild(createElemT("td",""));
    }

    if(res){
        entry.appendChild(createElemT("td","You Won!"));
        this.won++;
    }
    else{
        entry.appendChild(createElemT("td","You Lost!"));
    }

    getById("ClassTable").getElementsByTagName("tbody")[0].appendChild(entry);
    

    var totals = getById("ClassResults");
    totals.innerHTML="";
    totals.appendChild(createElemT("span", `Total: ${this.total}`));
    totals.appendChild(createElemT("span", `Won: ${this.won}`));
    totals.appendChild(createElem("hr"));
    totals.appendChild(createElemT("span", `VS AI: ${this.vsAi}`));
    totals.appendChild(createElemT("span", `Easy: ${this.vsAi1}`));
    totals.appendChild(createElemT("span", `Medium: ${this.vsAi2}`));
    totals.appendChild(createElemT("span", `Hard: ${this.vsAi3}`));
  }
}
