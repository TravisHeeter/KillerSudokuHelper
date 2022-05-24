function fillSum(){
	var value = parseInt($(`div.combinations-sum-description`).siblings(0).text())
	removeAndAddMultiples(value)
}

function removeAndAddMultiples(value){
	$(`#fortyFives`).remove()
	appendMultiples(value)
} 


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

function appendMultiples(n=0){ 
let ff = new FortyFiveSet(n)

$(`.puzzle-page-container`).append(`
<div id="fortyFives" style="height: 100%;width: 126px;position: absolute;top: 0;right: 226px;">
	${ff.html.toString().split(',').join('')}
	<div style=‘font-weight:bold’>’m’ to analyze sums</div>
</div>`)}

$(`#fortyFives`).length ? removeAndAddMultiples() : appendMultiples()


document.onkeypress = function(e) {
    e = e || window.event;
    if(e.which === 109)
        fillSum()
};