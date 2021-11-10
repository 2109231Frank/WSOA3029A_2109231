  
 //Function that gets data from API and creates the Joburg graphs.  
async function getJoburgData()
{ 
    //API request.
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:johannesburg/scores/');
    const dataJB = await response.json();
    
    console.log('Joburg Data',dataJB.categories);

    //Sorting data for D3
    console.log(d3);
    const graphData = [ 
        {name: dataJB.categories[0].name, score: parseInt(dataJB.categories[0].score_out_of_10)},
        {name: dataJB.categories[1].name, score: parseInt(dataJB.categories[1].score_out_of_10)},
        //{name: dataJB.categories[2].name, score: parseInt(dataJB.categories[2].score_out_of_10)},
        //{name: dataJB.categories[3].name, score: parseInt(dataJB.categories[3].score_out_of_10)},
        //{name: dataJB.categories[4].name, score: parseInt(dataJB.categories[4].score_out_of_10)},
        {name: dataJB.categories[5].name, score: parseInt(dataJB.categories[5].score_out_of_10)},
        //{name: dataJB.categories[6].name, score: parseInt(dataJB.categories[6].score_out_of_10)},
        {name: dataJB.categories[7].name, score: parseInt(dataJB.categories[7].score_out_of_10)},
        {name: dataJB.categories[8].name, score: parseInt(dataJB.categories[8].score_out_of_10)},
        //{name: dataJB.categories[9].name, score: parseInt(dataJB.categories[9].score_out_of_10)},
        //{name: dataJB.categories[10].name, score: parseInt(dataJB.categories[10].score_out_of_10)},
        {name: dataJB.categories[11].name, score: parseInt(dataJB.categories[11].score_out_of_10)},
        //{name: dataJB.categories[12].name, score: parseInt(dataJB.categories[12].score_out_of_10)},
        {name: dataJB.categories[13].name, score: parseInt(dataJB.categories[13].score_out_of_10)},
        {name: dataJB.categories[14].name, score: parseInt(dataJB.categories[14].score_out_of_10)},
        {name: dataJB.categories[15].name, score: parseInt(dataJB.categories[15].score_out_of_10)},
        //{name: dataJB.categories[16].name, score: parseInt(dataJB.categories[16].score_out_of_10)}, 
    ];   
    

    console.log(window.screen.width)

    //Normal laptop screen graph.
    if(window.screen.width > 800)
    {   
       const width = 1000;
        const height = 500;
        const margin = {top: 50, bottom: 50, left: 50, right: 50}
        
        const svg = d3.select('#graph1')
            .append('svg')
                .attr('height', height - margin.top - margin.bottom)
                .attr('width', width - margin.right - margin.left)
                .attr('viewBox', [0, 0, width, height]);

        const x = d3.scaleBand()
            .domain(d3.range(graphData.length))
            .range([margin.left, width - margin.right])
            .padding(0.3);
            
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
                .attr('font-size', '15px')
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
    //Tablet screen graph.
    else if(window.screen.width < 800 && window.screen.width > 430)
    {
        const width = 900;
        const height = 500;
        const margin = {top: 50, bottom: 110, left: 50, right: 50}
        
        const svg = d3.select('#graph1')
            .append('svg')
                .attr('height', height - margin.top - margin.bottom)
                .attr('width', width - margin.right - margin.left)
                .attr('viewBox', [0, 0, width, height]);

        const x = d3.scaleBand()
            .domain(d3.range(graphData.length))
            .range([margin.left, width - margin.right])
            .padding(0.3);
            
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
                .attr('font-size', '15px')
                .attr('color', 'rgb(206, 206, 206)')
                    .selectAll('text')  
                    .style('text-anchor', 'end')
                    .attr('dx', '-0.8em')
                    .attr('dy', '0.4em')
                    .attr('transform', 'rotate(-45)')
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
    //Smartphone screen graph.
    else if (window.screen.width <= 430)
    {
        const width = 500;
        const height = 300;
        const margin = {top: 30, bottom: 30, left: 50, right: 90}
        
        const svg = d3.select('#graph1')
            .append('svg')
                .attr('height', height)
                .attr('width', width - margin.right - margin.left)
                .attr('viewBox', [0, 0, width, height]);

        const x = d3.scaleBand()
            .domain(d3.range(graphData.length))
            .range([margin.left, width - margin.right])
            .padding(0.3);
            
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
                .attr('font-size', '12px')
                .attr('color', 'rgb(206, 206, 206)')
                .selectAll('text')  
                        .style('text-anchor', 'end')
                        .attr('dx', '-0.8em')
                        .attr('dy', '0.4em')
                        .attr('transform', 'rotate(-45)')
        }
        function yAxis(g) {
            g.attr('transform', `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, graphData.format))
                .attr('font-size', '12px')
                .attr('color', 'rgb(206, 206, 206)')
        }
        svg.append('g').call(yAxis);
        svg.append('g').call(xAxis);
        svg.node();  
    }  
}

 //Function that gets data from API and creates the New York graph.
async function getNewYorkData()
{ 
    //API request
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:new-york/scores/');
    const dataNYC = await response.json();
    
   console.log('NYC Data',dataNYC.categories);

    //Sorting data for D3    
    var graphData = [ 
        {name: dataNYC.categories[5].name, score: parseInt(dataNYC.categories[5].score_out_of_10)},
        {name: dataNYC.categories[1].name, score: parseInt(dataNYC.categories[1].score_out_of_10)},
        //{name: dataNYC.categories[2].name, score: parseInt(dataNYC.categories[2].score_out_of_10)},
        //{name: dataNYC.categories[3].name, score: parseInt(dataNYC.categories[3].score_out_of_10)},
        //{name: dataNYC.categories[4].name, score: parseInt(dataNYC.categories[4].score_out_of_10)},
        {name: dataNYC.categories[7].name, score: parseInt(dataNYC.categories[7].score_out_of_10)},
        //{name: dataNYC.categories[6].name, score: parseInt(dataNYC.categories[6].score_out_of_10)},
        {name: dataNYC.categories[0].name, score: parseInt(dataNYC.categories[0].score_out_of_10)},
        {name: dataNYC.categories[8].name, score: parseInt(dataNYC.categories[8].score_out_of_10)},
        //{name: dataNYC.categories[9].name, score: parseInt(dataNYC.categories[9].score_out_of_10)},
        //{name: dataNYC.categories[10].name, score: parseInt(dataNYC.categories[10].score_out_of_10)},
        {name: dataNYC.categories[11].name, score: parseInt(dataNYC.categories[11].score_out_of_10)},
        //{name: dataNYC.categories[12].name, score: parseInt(dataNYC.categories[12].score_out_of_10)},
        {name: dataNYC.categories[13].name, score: parseInt(dataNYC.categories[13].score_out_of_10)},
        {name: dataNYC.categories[14].name, score: parseInt(dataNYC.categories[14].score_out_of_10)},
        {name: dataNYC.categories[15].name, score: parseInt(dataNYC.categories[15].score_out_of_10)},
        //{name: dataNYC.categories[16].name, score: parseInt(dataNYC.categories[16].score_out_of_10)}, 
    ];   
    
    


    if(window.screen.width > 430)
    {
    var data = d3.pie().sort(null).value(function(d){return d.score;})(graphData);
    

    console.log('THIS IS THE PIE DATA', data)

    var svg = d3.select('#graph2'),
    
            width = svg.attr('width'),
            height = svg.attr('height'),
            radius = Math.min(width, height)/2

    var g = svg.append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`)

    var color = d3.scaleOrdinal(['#6e1a09','#96250e','#c43012','#c44712',
    '#c45312','#c45c12','#c46b12','#c47412','#c48612'])
    
    
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 50)
        .padAngle(.1)
        .padRadius(70);

    var arcs = g.selectAll('arc')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'arc')

        
        
    arcs.append('path')
        .attr('fill', function(d, i)
            {
                return color(i);
            })
        .attr('d', arc);         


    const label = d3.arc().outerRadius(radius).innerRadius(radius-100);
    arcs.append('text')
    .text(d => d.data.name)
    .attr('transform', d => `translate(${label.centroid(d)})`)
    .attr('font-size', '15px')
    .attr('fill', 'rgb(206,206,206)')
}
else
{
    var data = d3.pie().sort(null).value(function(d){return d.score;})(graphData);
    

    console.log('THIS IS THE PIE DATA', data)

    var svg = d3.select('#graph2'),
    
            width = svg.attr('width'),
            height = svg.attr('height'),
            radius = Math.min(width, height)/2

    var g = svg.append('g')
        .attr('transform', `translate(${width/2-110}, ${height/2})`)

    var color = d3.scaleOrdinal(['#c48612','#c47412','#c46b12',
    '#c45c12','#c45312','#c44712','#c43012','#96250e','#6e1a09'])
    
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 120)
        .padAngle(.1)
        .padRadius(70);

    var arcs = g.selectAll('arc')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'arc')

        
        
    arcs.append('path')
        .attr('fill', function(d, i)
            {
                return color(i);
            })
        .attr('d', arc);         


    const label = d3.arc().outerRadius(radius).innerRadius(radius-230);
    arcs.append('text')
    .text(d => d.data.name)
    .attr('transform', d => `translate(${label.centroid(d)})`)
    .attr('font-size', '15px')
    .attr('fill', 'rgb(206,206,206)')
}
}

  //Function that gets data from API and creates the Interactive graph for Dar Es Salaam.
  async function getInteractiveData()
 { 
    
    //Laptop view
     if(window.screen.width > 430)
    {
        
            
            
           
             //API request for Salaam
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:dar-es-salaam/scores/');
    const dataDES = await response.json();
    
   console.log('DES Data',dataDES.categories);

    //Sorting data for Dar Es Salaam    
    const graphDataDES = [ 
        {id: 'd1', name: dataDES.categories[5].name, score: parseInt(dataDES.categories[5].score_out_of_10)},
        {id: 'd2', name: dataDES.categories[1].name, score: parseInt(dataDES.categories[1].score_out_of_10)},
        {id: 'd3', name: dataDES.categories[7].name, score: parseInt(dataDES.categories[7].score_out_of_10)},
        {id: 'd4', name: dataDES.categories[0].name, score: parseInt(dataDES.categories[0].score_out_of_10)},
        {id: 'd5', name: dataDES.categories[8].name, score: parseInt(dataDES.categories[8].score_out_of_10)},
        {id: 'd6', name: dataDES.categories[13].name, score: parseInt(dataDES.categories[13].score_out_of_10)},
        {id: 'd7', name: dataDES.categories[14].name, score: parseInt(dataDES.categories[14].score_out_of_10)},
        {id: 'd8', name: dataDES.categories[11].name, score: parseInt(dataDES.categories[11].score_out_of_10)},
        {id: 'd9', name: dataDES.categories[15].name, score: parseInt(dataDES.categories[15].score_out_of_10)},
    ]; 
    
    var data = d3.pie().sort(null).value(function(d){return d.score;})(graphDataDES);
    

    

    var svg = d3.select('#graph3'),
    
            width = svg.attr('width'),
            height = svg.attr('height'),
            radius = Math.min(width, height)/2

    var g = svg.append('g')
        .attr('transform', `translate(${width/2}, ${height/2})`)

    var color = d3.scaleOrdinal(['#6e1a09','#96250e','#c43012','#c44712',
    '#c45312','#c45c12','#c46b12','#c47412','#c48612'])
    
    
    var arc = d3.arc()
        .innerRadius(20)
        .outerRadius(radius - 50)
        .padAngle(.1)
        .padRadius(70);

    var arcHover = d3.arc().outerRadius(radius - 35).innerRadius(35);
    var arcClicked = d3.arc().outerRadius(radius - 30).innerRadius(35);

    var arcs = g.selectAll('arc')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'arc')

        
        
    var path = arcs.append('path')
        .attr('fill', function(d, i)
            {
                return color(i);
            })
        .attr('d', arc);         

    path.on('mouseenter', function(d) {
        d3.select(this)
            .attr('stroke', 'white')
            .transition()
            .duration(300)
            .attr('d', arcHover)
            .attr('stroke-width', 2)
            .style('opacity', 0.5);

            const label = d3.arc().outerRadius(radius).innerRadius(radius-100);
            arcs.append('text')
            .text(d => d.data.score)
            .attr('transform', d => `translate(${label.centroid(d)})`)
            .attr('font-size', '15px')
            .attr('fill', 'rgb(206,206,206)')
    })

    .on('mouseleave', function(d) {
        d3.select(this)
            .transition()
            .duration(300)
            .attr('d', arc)
            .attr('stroke', 'none')
            .style('opacity', 1);

            remove(arcs.text);
            clicked = false;
            
    });
    let clicked = false;
    path.on('click', function(d) {
        
            d3.select(this)
            .attr('stroke', 'white')
            .transition()
            .duration(300)
            .attr('d', arcClicked)
            .attr('stroke-width', 3)
            .style('opacity', 0.4);
            
            
            
            clicked = !clicked;
            console.log(clicked);
    })

            
        
    


}
}



//initializing all graphs.
getJoburgData();
getNewYorkData();
getInteractiveData();