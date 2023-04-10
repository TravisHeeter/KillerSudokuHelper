/**
 *
 * A major ally in solving Killer Sudoku puzzles is the rule that all nonets add up to 45. 
 * This can be further extrapolated to multiples of 45. For instance, 2 nonets must add to 90.
 * 3 nonets, with all values added together, must equate to 125 (45 x 3).
 *
 * Thus, given a sum of cages occupying a certain number of spaces in a nonet or set of nonets,
 * you will be able to extrapolate missing values.
 *
 * For instance, suppose 3 cages occupying 8 of 9 cells of a nonet sums to 42.
 * Since the sum of the nonet must equal 45, the remaining cell must equal 3.
 * Or, suppose 25 of 27 cells of 3 nonets are covered by 18 cages, if the 25 cells add upp to 
 * 115, and we know it will equal 125, the remaining two cells add to 10.
 *
 * This code was developed to give easy access to the multiples of 45 minus the current cage sum.
 * Unfortunately, I have not yet figured out how to read the numbers off the puzzle, since it 
 * is inside a canvas element. Thus, my ability to help solve the puzzles is limited.
 *
 * For instance, I cannot get the cage value of less than 2 cages. With two cages, the summer
 * shows the value in a readable html object, but with one cage, it does not.
 *
 * However, I am pleased with what I have been able to accomplish, and will continue
 * invetigating the structure of dailykillersudoku.com.
 *
 */

/**
 * The FortyFiveSet Object, the main outcome of this is the html. Creates 9 multiples of 45, subtracts the sum of cages from each and adds them to the html
 * @param   {Number}  sumOfCages    - The current sum of the cages.
 * @member  {Array}   mults         - Holds 9 multiples of 45... 45 through 405.
 * @member  {Array}   diffs         - Holds 9 differences of the above multiples minus the cages sum.
 * @member  {Number}  leastAbsValue - The value closest to 0 of the above 9 diffs. This will be highlighted in the html.
 * @member  {Array}   html          - Holds the html of the multiples of 45, sum of cages and result of the difference.
 * @member  {String}  calculator2   - The quick calculations area that allows the user to add or subtract using p/s.
 */
function FortyFiveSet(sumOfCages){
  let a = [...Array(9)]                                       // An array of 9 empty elements
  this.mults = a.map( (e,i) => (i + 1) * 45 )                 // Uses a to create 9 multiples of 45 ==> 45, 90, 125, etc.
  this.diffs = a.map( (e,i) => this.mults[i] - sumOfCages )   // Subtracts the sum of cages from each multiple of 45

  // The value closest to zero should be highlighted.
  this.leastAbsValue = Math.min(...this.diffs.map( x => Math.abs(x) ))
  
  // Create the HTML
  this.html = this.mults.map( (e,i) => {
    return Math.abs( this.diffs[i] ) === this.leastAbsValue ? `
      <div class=‘nums’ style="font-weight:bold">${ i+1 } = ${e} -
        <span class=‘sum’>${ sumOfCages }</span> =
        <span class=‘diff’>${ this.diffs[i] }</span>
      </div>
    ` : `
      <div class=‘nums’ >${ i+1 } = ${e} -
        <span class=‘sum’>${ sumOfCages }</span> =
        <span class=‘diff’>${ this.diffs[i] }</span>
      </div>
    `
    
  })
  
  
  // Calculator 1 is supplied by dailykillersudoku, and automatically sums any completely highlighted cages.
  // This calc was developed because I didn't like adding in the console, pressing shift and plus was annoying
  // So I made this, which also subtracts the result from 45 - often the goal anyway.
  this.calculator2 = `
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
    </div>`
} 

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

// Remove the existing html and add new html. This works even if nothing is there, like before it's launched.
function removeAndAddMultiples(value){
  $(`#fortyFives`).remove()
  appendMultiples(value)
} 

// Creates the new FortyFiveSet object based on what's currently in the sum box.
function appendMultiples(sumOfCages=0){ 
  let ff = new FortyFiveSet(sumOfCages)
  
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
      
      
      ` 
      /* Add the 45's HTML to the page here */ +
      `
      ${ ff.html.toString().split(',').join('') }
      
      
      
      <div style=‘font-weight:bold’>
        ’m’ to analyze sums
      </div>
      
      
      ${ ff.calculator2 }
      
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
    // on click, select all
    $(this).select()
  })
}
