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
    entry.appendChild(createElemT("th",usr));
    this.total++;
    if(ai){
        entry.appendChild(createElemT("th","Vs. Ai"));
        this.vsAi++;
        if(dific == 1){
            entry.appendChild(createElemT("th","Easy"));
            this.vsAi1++;
        }
        else if(dific == 2){
            entry.appendChild(createElemT("th","Medium"));
            this.vsAi2;
        }
        else if(dific == 3){
            entry.appendChild(createElemT("th","Hard"));
            this.vsAi3;
        }
    }
    else{
        entry.appendChild(createElemT("th","Vs Player"));
        entry.appendChild(createElemT("th",""));
    }

    if(res){
        entry.appendChild(createElemT("th","You Won!"));
        this.won++;
    }
    else{
        entry.appendChild(createElemT("th","You Lost!"));
    }

    getById("ClassTable").appendChild(entry);
    

    var totals = getById("ClassResults");
    totals.innerHTML="";
    totals.appendChild(createElemT("div", `Total: ${this.total}`));
    totals.appendChild(createElemT("div", `Won: ${this.won}`));
    totals.appendChild(createElemT("div", `VS AI: ${this.vsAi}`));
    totals.appendChild(createElemT("div", `Easy: ${this.vsAi1}`));
    totals.appendChild(createElemT("div", `Medium: ${this.vsAi2}`));
    totals.appendChild(createElemT("div", `Hard: ${this.vsAi3}`));
  }
}
