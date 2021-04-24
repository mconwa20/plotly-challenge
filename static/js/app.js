// build metadata table from samples.json

function buildMetadata(sample){
    d3.json("samples.json").then(data =>{
        // console.log(data);
        var metaData = data.metadata;
        var results = metaData.filter(sampleObject =>
            sampleObject.id == sample);
        var finalResult = results[0];
        // console.log(finalResult);
        var demographicsData = d3.select("#sample-metadata");
        demographicsData.html("");
        Object.entries(finalResult).forEach(([key, value]) => {
            demographicsData.append("h6").text(`${key}: ${value}`)
        });
        console.log(finalResult);
    })
};

// horizontal bar chart and bubble chart

function buildCharts(sample){
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


        // bar chart (#TRACE1)
        var trace1 = {
            x: sliceIds,
            y: sliceValues.map(function(a){
                return `OTU ${a}`
            }),
            text: sliceLabels,
            type: "bar",
            orientation: "h",
        };

        var barChart = [trace1];

        var layout = {
            title: "Top 10 OTUs",
            height: 600,
            width: 1000,
        };

        // finalize barchart
        Plotly.newPlot("bar", barChart, layout);

        // bubble chart (#TRACE2)
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
        var bubbleChart = [trace2];
        
        var layout2 = {
            title: "Operational Taxonomic Units",
            margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100,
            }
        };

        // finalize bubble chart
        Plotly.newPlot("bubble", bubbleChart, layout2);
    });
};

init();