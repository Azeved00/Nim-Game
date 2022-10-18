var classTable = {
  total: 0,
  vsAi : 0,
  vsAi1: 0,
  vsAi2: 0,
  vsAi3: 0,
  vsPla: 0,

  addEntry(usr, dific, res) {
    var entry = createElem("tr");

    entry.appendChild(createElemT("th",usr));
    entry.appendChild(createElemT("th",dific));
    entry.appendChild(createElemT("th",res));

    getById("ClassTable").appendChild(entry);
    var totals = getById("ClassResults");
    totals.innerHTML="";
    totals.appendChild(createElemT("div",`Total: ${this.total}`));
    totals.appendChild(createElemT("div", `VS AI: ${this.vsAi}`));
    totals.appendChild(createElemT("div", `Easy: ${this.vsAi1}`));
    totals.appendChild(createElemT("div", `Medium: ${this.vsAi2}`));
    totals.appendChild(createElemT("div", `Hard: ${this.vsAi3}`));
  }
}
