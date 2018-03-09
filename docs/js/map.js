var currentVotes = [];
var currentCountryInfo = {};
var defaultColor = "#acacac";
var scoreColors = [
	"#F0F0FF",//0
	"#E6E6FF",//1
	"#D9D9FF",//2
	"#CCCCFF",//3
	"#BFBFFF",//4
	"#B0B0FF",//5
	"#9E9EFF",//6
	"#8787FF",//7
	"#6B6BFF",//8
	"#purple",//9
	"#4D4DFF",//10
	"purple",//11
	"#3838FF"//12
];
var selectedColor = "#2F80ED";
var selectedCountry = undefined;

function setSelectedCountry(countryCode) {
	selectedCountry = countryCode;
}

function setCountryFill(countryCode, color) {
	if (countryCode == undefined) {return;}
	d3.selectAll("#"+countryCode)
		.style("fill", color);
	console.log(countryCode + ';' + color);
}

function fetchVotes(year) {
	d3.csv('data/'+year+'.csv', function (data) {
		//data.forEach(function (entry) {
		//	entry['From'] = entry['From'];
		//	entry['To'] = entry['To'];
		//	entry['Points'] = +entry['Televoting points'];
		//});
		console.log('loaded votes for year ',year);
		currentVotes = data;
	});
	d3.csv('data/'+year+'-countryinfo.csv', function (data) {
		console.log('loaded country info for year ',year);
		currentCountryInfo = {};
		data.forEach( function(val) {
			var code = val['Country code'];
			currentCountryInfo[code] = {
				'Artist': val['Artist'],
				'Song': val['Song'],
				'Total score': val['Total score'],
				'Televoting score': val['Televoting score'],
				'Jury score': val['Jury score'],
				'Placement': val['Placement']
			}
		});
	});
}

function renderVotes() {
	$("path").css("fill",defaultColor);
	if (selectedCountry == undefined) {
		//maybe do something, idk
	} else {
		currentVotes.forEach(function (vote) {
			if (vote['To'] == selectedCountry && +vote['Televoting points']!=0) {
				setCountryFill(vote['From'], scoreColors[vote['Televoting points']]);
			}
		});
		setCountryFill(selectedCountry, selectedColor);
	}
}
