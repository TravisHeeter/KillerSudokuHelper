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
function FortyFiveSet(){
  let oneThruNine =   [ 1, 2, 3, 4, 5]
  let multiplesOf45 = [45,90,135,180,225]
  let sumOfCages = $(".combinations-sum-container > div > div").eq(1).text().trim()
  let multiplesMinusSum = multiplesOf45.map(e=>e-sumOfCages)
  this.html = `
    <div class="row" id="Travextra"
      style="
        left:-374px;
        position:absolute;
        top:-5px;
      "
    >
      <div class="column">
  ` + 
  multiplesMinusSum.map((mms,i) => `
        <div class='row'>
            45 x ${i+1} = ${multiplesOf45[i]} - ${sumOfCages} = ${multiplesOf45[i] - Number(sumOfCages)}
        </div>
  `).join('')
  
  
  // Calculator 1 is supplied by dailykillersudoku, and automatically sums any completely highlighted cages.
  // This calc was developed because I didn't like adding in the console, pressing shift and plus was annoying
  // So I made this, which also subtracts the result from 45 - often the goal anyway.
  this.calculator2 = `
    </div>
    <div class="column" 
      style="
        border-left:1px solid white; 
        width: 173px; 
        padding: 0 25px; 
        margin-left: 35px;
      "
    >
      <div class="row">
        Quick Subtract 45
      </div>
      <div class="row">
        <input style='width:70px' id='subtract45' /> -45 = 
        <input style='width:30px' id='less45Result' />
      </div>
      <div class="row" style='padding:5px 0'>
        Use p to add
      </div>
      <div class="row">
        <input style='width:119px' id='addResult' />
      </div>
    </div>`
  
  this.theorems = `
    <div class="column" 
      style="
        border-left:1px solid white; 
        width: 185px; 
        padding: 0 25px;
      "
    >
      <div class="row">
        <a href='https://crackingthecryptic.fandom.com/wiki/Set_Equivalence_Theory' target='_blank'>Theorems</a>
      </div>
      <div class="row">
        <span class='label_t'>Aads</span>
        <button class='aads btn_t' onclick='theoremHighlights(aads1)'>1</button>
        <button class='aads btn_t' onclick='theoremHighlights(aads2)'>2</button>
        <button class='aads btn_t' onclick='theoremHighlights(aads3)'>3</button>
        <button class='aads btn_t' onclick='theoremHighlights(aads4)'>4</button>
      </div>
      <div class="row">
        <span class='label_t'>Att</span>
        <button class='aads btn_t' onclick='theoremHighlights(att1)'>1</button>
        <button class='aads btn_t' onclick='theoremHighlights(att2)'>2</button>
        <button class='aads btn_t' onclick='theoremHighlights(att3)'>3</button>
        <button class='aads btn_t' onclick='theoremHighlights(att4)'>4</button>
      </div>
      <div class="row">
        <button class='btn_t' onclick='theoremHighlights(phistomefel)'>Phistomefel</button>
      </div>
    </div>
  `
} 

$('#style_t').remove()
$('body').append(`
  <style id='style_t'>
    .label_t{
      display:inline-block;
    }
    html.touchscreen-layout button.btn_t{
      display:inline-block;
      height:30px;
      padding:0;
    }
    html.touchscreen-layout button.aads.btn_t{
      width:30px;
    }
  </style>
`)

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
  appendMultiples()
} 

// Creates the new FortyFiveSet object based on what's currently in the sum box.
function appendMultiples(){ 
  let ff = new FortyFiveSet()
  
  $('.touchscreen-play-ad-landscape').html(
    ff.html + 
    ff.calculator2 + 
    ff.theorems
  )

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

///////// Highlight SET Theorems /////////
const pink = '#ff000066' // pink
const blue = '#0000ff66' // blue
// Aad's Theorem
const aads1 = [[ 0,1,2,3,  9,10,11,12,  18,19,20,21,  27,28,29,30 ],[ 40,41,42,43,44,  49,50,51,52,53,  58,59,60,61,62, 67,68,69,70,71,  76,77,78,79,80 ]]
const aads2 = [[ 0,1,2,3,4,  9,10,11,12,13,  18,19,20,21,22,  27,28,29,30,31,  36,37,38,39,40 ],[ 50,51,52,53,  59,60,61,62, 68,69,70,71,  77,78,79,80 ]]
const aads3 = [[ 5,6,7,8,  14,15,16,17,  23,24,25,26,  32,33,34,35 ],[ 36,37,38,39,40,  45,46,47,48,49,  54,55,56,57,58,  63,64,65,66,67,  72,73,74,75,76 ]]
const aads4 = [[ 45,46,47,48,  54,55,56,57,  63,64,65,66,  72,73,74,75 ],[ 4,5,6,7,8,  13,14,15,16,17,  22,23,24,25,26,  31,32,33,34,35,  40,41,42,43,44 ]]

const att1 = [[ 3,12,21,27,28,29,30 ],[ 40,41,42,43,44,49,50,51,52,53,58,59,67,68,76,77 ]]
const att2 = [[ 50,51,52,53,59,68,77 ],[ 3,4,12,13,21,22,27,28,29,30,31,36,37,38,39,40 ]]
const att3 = [[ 5,14,23,32,33,34,35 ],[ 36,37,38,39,40,45,46,47,48,49,57,58,66,67,75,76 ]]
const att4 = [[ 45,46,47,48,57,66,75 ],[ 4,5,13,14,22,23,31,32,33,34,35,40,41,42,43,44 ]]

const phistomefel = [[ 0,1,9,10,  7,8,16,17,  63,64,72,73,  70,71,79,80,81 ],[ 20,21,22,23,24,  33,42,51,60,  59,58,57,56,  47,38,29 ]]

// Highlight cells according to their indexes
function theoremHighlights(arraysToHighlight){
  
  removeHighlights()
  
  let color1 = arraysToHighlight[0].length === 16 ? pink : blue
  let color2 = arraysToHighlight[1].length === 16 ? pink : blue
     
  arraysToHighlight[0].forEach((v,i) => {
    $('.cell').eq(v).css({background:pink})
  })
  arraysToHighlight[1].forEach((v,i) => {
    $('.cell').eq(v).css({background:blue})
  })
  
}

function removeHighlights(){
  $('.cell').css({background:`linear-gradient(transparent, transparent), rgb(33, 38, 50)`})
}

// Highlight a portion of the puzzle to get the indexes of highlighted cells
// Returns an array of indexes
function getCellIndexes(){
  let a = []
  $('.cell').filter((i,v)=>{
    let bgcolor = 'rgba(120, 0, 120, 0.9)'
    let r = $(v).css('background-color') === bgcolor
    if(r)
      a.push(i)
    return r
  })
  return a
}
