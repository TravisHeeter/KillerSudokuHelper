// Get the value of the sum of cages
function fillSum(){
  var value = parseInt($(`div.combinations-sum-description`).siblings(0).text())
  removeAndAddMultiples(value)
}

// Remove the existing html and add new html. This works even if nothing is there, like before it's launched.
function removeAndAddMultiples(value){
  $(`#fortyFives`).remove()
  appendMultiples(value)
} 

// The FortyFiveSet Object, the main outcome of this is the html. Creates the 45 multiples, subtracts the sum from each and adds them to the html
function FortyFiveSet(n){
  let a = [...Array(9)]
  this.sums = a.map((e,i) => (i+1)*45)
  this.diffs = a.map((e,i) => this.sums[i]-n)
  this.gtZed = this.diffs.filter(e=>e>=0)[0]
  this.html = this.sums.map((e,i)=>{
    return this.diffs[i] === this.gtZed ? `
      <div class=‘nums’ style="font-weight:bold">${i+1} = ${e} -
        <span class=‘sum’>${n}</span> =
        <span class=‘diff’>${this.diffs[i]}</span>
      </div>
    ` : `
      <div class=‘nums’ >${i+1} =${e} -
        <span class=‘sum’>${n}</span> =
        <span class=‘diff’>${this.diffs[i]}</span>
      </div>
    `
    
  })
} 

// Creates the new FortyFiveSet object based on what's currently in the sum box.
function appendMultiples(n=0){ 
  let ff = new FortyFiveSet(n)

  $(`.puzzle-page-container`).append(`
    <div id="fortyFives" style="height: 100%;width: 126px;position: absolute;top: 0;right: 226px;">
      ${ff.html.toString().split(',').join('')}
      <div style=‘font-weight:bold’>’m’ to analyze sums</div>
    </div>`)
}

// launches the helper
$(`#fortyFives`).length ? removeAndAddMultiples() : appendMultiples()

// When 'm' is pressed, calculate with the current sum.
document.onkeypress = function(e) {
    e = e || window.event;
    if(e.which === 109)
        fillSum()
};
