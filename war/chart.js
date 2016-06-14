
app.controller('ResultController', function($scope) {
	$scope.chart = c3.generate({
    data: {
        columns: [
            ['PCF', 10],
            ['PS', 40],
            ['UDI', 30],
            ['Les Républicains', 20],
            ['FN', 50],
        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Assemblée Nationale"
    }
})
}