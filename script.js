fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then( (apidata) => {
	return apidata.json();
})
.then( (objectData) => {
	console.log(objectData);
	let tableData = "";
	objectData.map((values) => {
		tableData += `<tr>
				<td><img src="${values.image}" alt="Coin Icon"</td>
				<td>${values.name}</td>
				<td>${values.symbol.toUpperCase()}</td>
				<td>${"$"+values.current_price}</td>
				<td>${"$"+values.total_volume}</td>
				<td class="percent_change">${values.market_cap_change_percentage_24h}</td>
				<td>${"Mkt Cap : $"+values.market_cap}</td>
			</tr>`;
	})
	document.getElementById('table_data').innerHTML = tableData;
} )
.catch( (error) => {
	console.log(error);
})

// -------------------------- search function --------------------------

const searchfunction = () =>{
	let filter = document.getElementById('search').value.toUpperCase();
	let tableSearch = document.getElementById('table_data');
	let tr = tableSearch.getElementsByTagName('tr');

	for(var i=0; i<tr.length; i++){
		let td = tr[i].getElementsByTagName('td')[1];
		let td2 = tr[i].getElementsByTagName('td')[2];

		if(td || td2){
			let textValue = td.textContent || td.innerHTML;
			let textValue2 = td2.textContent || td2.innerHTML;

			if(textValue.toUpperCase().indexOf(filter) > -1 || textValue2.toUpperCase().indexOf(filter) > -1){
				tr[i].style.display = "";
			}else{
				tr[i].style.display = "none";
				// p.style.display = "block";
			}
		}
	}
}

// -------------------------- sorting by market cap --------------------------

function sortByMktCap() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table_data");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[6];
      y = rows[i + 1].getElementsByTagName("td")[6];

      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

// -------------------------- sorting by market percent change --------------------------

function sortByPercent() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("table_data");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[5];
      y = rows[i + 1].getElementsByTagName("td")[5];

      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

const change = document.getElementsByClassName("percent_change");
if(Number(change.innerHTML) < 0){
	change.style.color = red;
}else{
	change.style.color = green;
}