// retrieve data from samples.json

function getPlot(id) {

    // specify samples.json file
    d3.json("samples.json").then(function(data) {
        console.log(data);
        var metadata = data.metadata;
        var results = metadata.filter(s => s.id == id);
        var filteredResult = results[0];
        console.log(filteredResult);
        var demographicsData = d3.select("#sample-metadata");
        demographicsData.html("");
        Object.entries(filteredResult).forEach(([key, value]) => {
            demographicsData.append("h6").text(`${key}: ${value}`)
        });
        console.log(filteredResult);
    })
};

// charts

function buildCharts(id){
    d3.json("samples.json").then(function(data) =>{
        var sample = data.samples;
        var results = sample.filter(s => s.id == id);
        var filteredResult = results[0];
        console.log(filteredResult);

        var IDS = filteredResult.otu_ids;
        var values = filteredResult.sample_values;
        var labels = filteredResult.otu_labels;
        //slice
        var sliceIds = otuIDS.slice(0,10).reverse();
        var sliceValues = sampleValues.slice(0,10).reverse();
        var sliceLabels = otuLabels.slice(0,10).reverse();


        // bar chart
        var trace = {
            x: sliceIds,
            y: sliceValues.map(function(a){
                return `OTU ${a}`
            }),
            text: sliceLabels,
            type: "bar",
            orientation: "h",
        };

        var layout = {
            title: "Top 10 OTU",
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

        var barChart = [trace];

        // finalize barchart
        Plotly.newPlot("bar", barChart, layout);

        // bubble chart
        var trace1 = {
            x: IDS,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: IDS,
                size: values
            }
        };
        
        var layout2 = {
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
            }
        };

        var bubbleChart = [trace1];

        // finalize bubble chart
        Plotly.newPlot("bubble", bubbleChart, layout2);
    });
};

// initializing data

function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlot(data.names[0]);
        buildCharts(data.names[0]);
    });
}

init();