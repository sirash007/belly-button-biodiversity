// 1. Use the D3 library to read in samples.json.
function getData(id) {
  
    d3.json("samples.json").then(function(data) {
        console.log(data)
        
        // filter samples by id 
        var samples = data.samples.filter(sampleid => sampleid.id.toString() === id)[0];
        
        console.log(samples);
        
      // 2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
      // slice top 10 and change to reverse to show largest at top
        var samplevalues = samples.sample_values.slice(0, 10)
          .reverse();
  
        // top 10 otu ids for plot OTU
        var OTU_top = (samples.otu_ids.slice(0, 10));
        
        // map top 10 and add "OTU" to id for y-axis
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        // label top 10 otu for chart
        var labels = samples.otu_labels.slice(0, 10);
  
        // create trace1 for bar chart
        var trace1 = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
              color: 'blue'},
            type:"bar",
            orientation: "h",
        };
  
        var data = [trace1];
  
        // layout bar chart
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 50,
                t: 50,
                b: 50
            }
        };
               

        Plotly.newPlot("bar", data, layout);

         // create trace1 for bar chart
         //Gauge Plot

         var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: 450,
              title: { text: "Bellt Button Washing Frequency" },
              type: "indicator",
              mode: "gauge+number+delta",
              delta: { reference: 380 },
              gauge: {
                axis: { range: [null, 500] },
                steps: [
                  { range: [0, 250], color: "lightgray" },
                  { range: [250, 400], color: "gray" }
                ],
                threshold: {
                  line: { color: "red", width: 4 },
                  thickness: 0.75,
                  value: 490
                }
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('myDiv', data, layout);
      
        // 3. Create a bubble chart that displays each sample.
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
            },
            text: samples.otu_labels
        };
  
        // layout bubble plot
        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 500,
            width: 1000
        };
  
        var data1 = [trace2];
  
        // bubble plot
        Plotly.newPlot("bubble", data1, layout_b); 
  
      });

       
  }  

    
  // 4. Display the sample metadata, i.e., an individual's demographic information.
  // Get data for Demographics chart
  function getMetadata(id) {
    // read the json file to get data
    d3.json("samples.json").then(function(data) {
        
        var metadata = data.metadata;
        console.log(metadata)
  
        // filter metadata by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
  
        // select class under demographic info
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty before adding new info
        demographicInfo.html("");
  
        // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
        Object.entries(result).forEach(function(key) {   
                demographicInfo.append("h6").text(key[0] + ": " + key[1]);    
        });
    });
  }
  
  // change event using id
  function optionChanged(id) {
    getData(id);
    getMetadata(id);
  }
  
  // function init for data
  function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");
  
    // read the data 
    d3.json("samples.json").then(function(data) {
        console.log(data)
  
        // dropdwown menu for id
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
  
        // functions to display the data and plot to page
        getData(data.names[0]);
        getMetadata(data.names[0]);
    });
  }
  
  init();