// build metadata table from samples.json

function buildTable(id){
    d3.json("samples.json").then(function(data) {
        console.log(data);
        var metaData = data.metadata;
        var results = metaData.filter(sampleObject =>
            sampleObject.id == sample);
        var finalResult = results[0];
        console.log(finalResult);
        var demographicsData = d3.select("#sample-metadata");
        demographicsData.html("");
        Object.entries(finalResult).forEach(([key, value]) => {
            demographicsData.append("h6").text(`${key}: ${value}`)
        });
        console.log(finalResult);
    })
};

// horizontal bar chart and bubble chart

function buildCharts(id){
    d3.json("samples.json").then(data =>{
        var sample = data.sample;
        var results = sample.filter(sampleObject =>
            sampleObject.id == sample);
        var finalResult = results[0];
        console.log(finalResult);

        var otuIDS = finalResult.otu_ids;
        var sampleValues = finalResult.sample_values;
        var otuLabels = finalResult.otu_labels;

        var sliceIds = otuIDS.slice(0,10).reverse();
        var sliceValues = sampleValues.slice(0,10).reverse();
        var sliceLabels = otuLabels.slice(0,10).reverse();


        // bar chart
        var trace1 = {
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

        var barChart = [trace1];

        // finalize barchart
        Plotly.newPlot("bar", barChart, layout);

        // bubble chart
        var trace2 = {
            x: otuIDS,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                color: otuIDS,
                size: sampleValues
            }
        };
        
        var layout2 = {
            title: "Operational Taxonomic Units",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100,
            }
        };

        var bubbleChart = [trace2];

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

        buildTable(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();