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


////// SIDEWAYS COMPUTATION ////////

// Reset the analytical area
$('#sidewaysWrapper').remove()

// Adds an input for a number that should be compared to the comparers.
function addInput(){
  $('#sidewaysOptions').append(`<input type='text' class='sidewaysOption' placeholder='input'/>`)
}

// Adds an input for a number that should be compared to by the inputs.
function addComparer(){
  $('#sidewaysComparers').append(`<input type='text' class='sidewaysComparer' placeholder='Comparer'/>`)
}

// Creates the analytical area, buttons and initial inputs.
$('#fortyFives').append(`
  <div id='sidewaysWrapper'>
    <div id='sidewaysOptionsWrapper' style='padding:5px 0; margin-bottom:5px; border-top: 1px solid white; border-bottom:1px solid white'>
      Sideways Checking
      <div id='sidewaysOptions'><input type='text' class='sidewaysOption' placeholder='Input'/></div>
      <input type='button' onClick='addInput()' value='Add Input'>
    </div>
    <div id='sidewaysComparersWrapper' style='padding-bottom:5px; margin-bottom:5px; border-bottom:1px solid white'>
      <div id='sidewaysComparers'><input class='sidewaysComparer' style='margin: 5px 0' placeholder='Comparer'/></div>
      <input type='button' onClick='addComparer()' value='Add Comparer'>
    </div>
    <input type='button' value='Compute' onClick='computeSidewaysAnalysis()'/>
  </div>
`)

/*function computeSidewaysAnalysis(){
  $('.sidewaysOption').each((i,v)=>{
    let hits=[ ]
    [...v.text()].forEach( o => {
      $('sidewaysComparer').each((ii,vv)=>{
        [...vv].forEach( c => {
          if (parseInt(o) === parseInt(c)){
            hits.push({option:{oElement:v,oElementI:i,oMatchedNumber,
          }
        })
      })
    }
  })
}*/
