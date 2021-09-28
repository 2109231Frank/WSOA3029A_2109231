    //Joburg quality of living scores
//fetch('https://api.teleport.org/api/urban_areas/slug:johannesburg/scores/')
    //.then(response => response.json())
        //.then(dataJB => console.log('JOBURG DATA', dataJB.categories[0]))

        
   
async function getJoburgData()
{ 
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:johannesburg/scores/');
    const dataJB = await response.json();
    
   console.log(dataJB.categories);

    //D3
    console.log(d3);
    const graphData = [ 
        {name: dataJB.categories[0].name, score: parseInt(dataJB.categories[0].score_out_of_10)},
        {name: dataJB.categories[1].name, score: parseInt(dataJB.categories[1].score_out_of_10)},
        {name: dataJB.categories[7].name, score: parseInt(dataJB.categories[7].score_out_of_10)},
        {name: dataJB.categories[3].name, score: parseInt(dataJB.categories[3].score_out_of_10)},
        {name: dataJB.categories[8].name, score: parseInt(dataJB.categories[8].score_out_of_10)},
        {name: dataJB.categories[5].name, score: parseInt(dataJB.categories[5].score_out_of_10)}, 
    ];   
    
    const width = 1000;
    const height = 500;
    const margin = {top: 50, bottom: 50, left: 50, right: 50};

    const svg = d3.select('#graph1')
        .append('svg')
            .attr('height', height - margin.top - margin.bottom)
            .attr('width', width - margin.right - margin.left)
            .attr('viewBox', [0, 0, width, height]);

    const x = d3.scaleBand()
        .domain(d3.range(graphData.length))
        .range([margin.left, width - margin.right])
        .padding(0.1);
        
    const y = d3.scaleLinear()
        .domain([0, 10])
        .range([height - margin.bottom, margin.top])

    svg
        .append('g')
            .attr('fill', 'rgb(172, 110, 30)')
            .selectAll('rect')
            .data(graphData.sort((a, b) => d3.descending(a.score, b.score)))
            .join('rect')
                .attr('x', (d, i) => x(i))
                .attr('y', (d) => y(d.score))
                .attr('height', d => y(0) - y(d.score))
                .attr('width',  x.bandwidth())


    function xAxis(g) {
        g.attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => graphData[i].name))
        .attr('font-size', '20px')
        .attr('color', 'rgb(206, 206, 206)')
    }
    function yAxis(g) {
        g.attr('transform', `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(y).ticks(null, graphData.format))
            .attr('font-size', '20px')
            .attr('color', 'rgb(206, 206, 206)')
    }
    svg.append('g').call(yAxis);
    svg.append('g').call(xAxis);
    svg.node();
}
getJoburgData();

  

//D3
// let vizArea = d3.select("#viz");

//                  let margin = 50;
//                let topMargin = 10;
//                    let graphHeight = 500;
//                    let xScale = d3.scaleLinear().domain([0, 10]).range([0,500]);
//                    let yScale = d3.scaleLinear().domain([0, 10]).range([graphHeight,0]);

//                    let barWidth = 20;
//                    let barOffset = 5;
                
//            vizArea
//                .append("g")
//                .attr("transform", `translate(${margin}, ${topMargin})`)
//                .call(d3.axisLeft(yScale));

//            vizArea
//                .append("g")
//                .attr("transform", `translate(${margin}, ${graphHeight + topMargin})`)
//                .call(d3.axisBottom(xScale)); 

