// Get the value of the sum of cages
function fillSum(){
  var value = parseInt($(`div.combinations-sum-description`).siblings(0).text())
  removeAndAddMultiples(value)

    $('#subtract45').change(()=>{
    let v = $('#subtract45').val()
    let result = 45-v
    $('#less45Result').val(result)
})
}

// Subtract 45
function less45(e){
    console.log(e)
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
  //this.gtZed = this.diffs.filter(e=>e>=0)[0]

  // The least absolute value is what should be highlighted, not the first value greater than 0
  this.leastAbsValue = Math.min(...this.diffs.map(x=>Math.abs(x)))
  this.html = this.sums.map((e,i)=>{
    return Math.abs(this.diffs[i]) === this.leastAbsValue ? `
      <div class=‘nums’ style="font-weight:bold">${i+1} = ${e} -
        <span class=‘sum’>${n}</span> =
        <span class=‘diff’>${this.diffs[i]}</span>
      </div>
    ` : `
      <div class=‘nums’ >${i+1} = ${e} -
        <span class=‘sum’>${n}</span> =
        <span class=‘diff’>${this.diffs[i]}</span>
      </div>
    `
    
  })
} 

// Creates the new FortyFiveSet object based on what's currently in the sum box.
function appendMultiples(n=0){ 
  let ff = new FortyFiveSet(n)
  
  $(`.puzzle-page-container`)
    .append(`
      <div 
        id="fortyFives" 
        style="
          height: 100%;
          width: 126px;
          position: absolute;
          top: 0;
          right: 226px;
        "
      >
      ${ff.html.toString().split(',').join('')}
      <div style=‘font-weight:bold’>
        ’m’ to analyze sums
      </div>
      <div 
        style='
          border-top:1px solid white; 
          width: 119px; 
          text-align:ccenter; 
          padding:5px 0; 
          margin-top:5px
        '
      >
        Quick Subtract 45
      </div>
      <div>
        <input style='width:70px' id='subtract45' /> -45 = 
        <input style='width:30px' id='less45Result' />
      </div>
      <div style='padding:5px 0'>
        Use p above to add
      </div>
      <div>
        <input style='width:119px' id='addResult' />
      </div>
    </div>
  `)
  attachEventListeners()
}

// launches the helper
$(`#fortyFives`).length ? removeAndAddMultiples() : appendMultiples()

// When the input box is focused, select all the text
$('#calculatorSumInput').on('focus',function(){
  $('#calculatorSumInput').select()
})

// When 'm' is pressed, calculate with the current sum.
document.onkeypress = function(e) {
  e = e || window.event;
  
  
  if(e.which === 109) {
    fillSum()
    $('#calculatorSumInput').focus()
  }
};

function attachEventListeners(){
  $('#subtract45').on('input', function(e){
    let v = this.value
    let result = 0
    // Treat 'p' like '+' and 's' like '-'
    if(v.includes('p') || v.includes('s')){
      let calcString = v.split('p').join('+').split('s').join('-')
      let dispString = calcString.split('+').join(' + ').split('-').join(' - ')
      let r = 0
      try {
        r = eval(calcString)
      } catch (e) {
        r = eval(calcString + 0)
      }
      $('#addResult').val(dispString + ' = ' + r)
      v = r
    }
    result = 45-v
    $('#less45Result').val(result)
  }).on('click', function(){
    // on click, highlight input
    $(this).select()
  })
}
