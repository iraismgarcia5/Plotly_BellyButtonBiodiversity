///CHARTS

function charts(f){
// Fetch json data using D3
    d3.json("./samples.json").then((importedData) => {
        //console.log(importedData);
        var data = importedData;

        /// BAR CHART
        
        // Access array in json file for sample_values
        var sample_values = data.samples[0].sample_values;
        //console.log(sample_values);

        // Access array in json file for otu_ids
        var otu_ids = data.samples[0].otu_ids;
        //console.log(otu_ids);

        // Access array in json file for otu_labels
        var otu_labels = data.samples[0].otu_labels;
        //console.log(otu_labels);

        /// Sort and display first 10 values in descending order
        var sample_value = sample_values.slice(0,10).reverse();
        //console.log(sample_value);

        var otu_id_plot = otu_ids.slice(0.10).slice(0,10).reverse();
        // console.log(otu_id_plot);

        // Format otu_ids to display as "OTU XXXX"
        var otu_id = otu_id_plot.map(otu_id_val => "OTU " + otu_id_val);
        // console.log(otu_id);

        var otu_label = otu_labels.slice(0,10).reverse();
        // console.log(otu_label);

        // Trace to plot data
        var trace1 = {
            x: sample_value,
            y: otu_id,
            text: otu_label,
            type: "bar",
            orientation: "h"
        };
        var chartData = [trace1];


        // Render the plot
        Plotly.newPlot("bar", chartData);
        
        ///BUBBLE CHART

        //Trace to plot all data
        var trace2 ={
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker:{
                size: sample_values,
                color: otu_ids
            }
        };

        var chartData2 = [trace2];

        //Render the plot
        Plotly.newPlot("bubble", chartData2);


});
};

///METADATA - DEMOGRAPHIC INFO

function demographic(f) {
    //Fetch data from metadata in json file
    d3.json("./samples.json").then((data)=> {
    
        var metadata = data.metadata;
        console.log(metadata)

      //Filter data by id
       var filter = metadata.filter(meta => meta.id.toString() === f)[0];
       var demo = d3.select("#sample-metadata");
        
       demo.html("");

       Object.entries(filter).forEach((key) => {   
       demo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
   
};

///NEW SAMPLE
function optionChanged(f) {
    charts(f);
    demographic(f);
};

///RENDERING

function render() {
    
    //Select dropdown
    var dropdown = d3.select("#selDataset");

    //Fetch data from json file
    d3.json("./samples.json").then((data) => {
        console.log(data);

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        //Calling functions
        charts(data.names[0]);
        demographic(data.names[0]);
    });


};

render();