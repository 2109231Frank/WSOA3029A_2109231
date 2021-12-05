  
 //Function that gets data from API and creates the Joburg graphs.  
async function getJoburgData()
{ 
    //API request.
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:johannesburg/scores/');
    const dataJB = await response.json();
    
    

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
    
    console.log('Joburg Data',graphData);
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
                .attr('fill', 'rgb(93, 133, 138)')
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
                .attr('fill', 'rgb(93, 133, 138)')
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
                .attr('fill', 'rgb(93, 133, 138)')
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

    var color = d3.scaleOrdinal(['#2ec8db','#2cb6c7','#28a8b8','#28a8b8',
    '#2295a3','#51a6b0','#5ba2ab','#60a0a8','#47777d'])
    
    
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 50)
        .padAngle(0)
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
        .attr('d', arc)
        ;         


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

    var color = d3.scaleOrdinal(['#2ec8db','#2cb6c7','#28a8b8','#28a8b8',
    '#2295a3','#51a6b0','#5ba2ab','#60a0a8','#47777d'])
    
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 120)
        .padAngle(0)
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
        
        {id: 'd2', name: dataDES.categories[1].name, score: parseInt(dataDES.categories[1].score_out_of_10)},
        {id: 'd5', name: dataDES.categories[8].name, score: parseInt(dataDES.categories[8].score_out_of_10)},
        {id: 'd6', name: dataDES.categories[13].name, score: parseInt(dataDES.categories[13].score_out_of_10)},
        {id: 'd7', name: dataDES.categories[14].name, score: parseInt(dataDES.categories[14].score_out_of_10)},
        {id: 'd1', name: dataDES.categories[5].name, score: parseInt(dataDES.categories[5].score_out_of_10)},
        {id: 'd3', name: dataDES.categories[7].name, score: parseInt(dataDES.categories[7].score_out_of_10)},
        {id: 'd4', name: dataDES.categories[0].name, score: parseInt(dataDES.categories[0].score_out_of_10)},
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

    var color = d3.scaleOrdinal(['#2ec8db','#2cb6c7','#28a8b8','#28a8b8',
    '#2295a3','#51a6b0','#5ba2ab','#60a0a8','#47777d'])
    
    
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

            const outerLabel = d3.arc().outerRadius(radius).innerRadius(radius-80);
    arcs.append('text')
    
    .text(d => d.data.name)
    .attr('transform', d => `translate(${outerLabel.centroid(d)})`)
    .attr('font-size', '15px')
    .attr('fill', 'white');
    })

    .on('mouseleave', function(d) {
        d3.select(this)
            .transition()
            .duration(300)
            .attr('d', arc)
            .attr('stroke', 'none')
            .style('opacity', 1);
    location.reload();

            
            //clicked = false;
            
    });
    /*let clicked = false;
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
    })*/

            

    const label = d3.arc().outerRadius(radius).innerRadius(radius-100);
    arcs.append('text')
    .text(d => d.data.score)
    .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .attr('font-size', '15px')
    .attr('fill', 'rgb(206,206,206)');

    //Below was supposed to make a legend which I would have used for interactivity, but I wasn't able to fix it.

   /*var legend = svg.append('g')
        .attr('tranform', 'translate(500, 300)')
        .selectAll('.legend')
        .data(graphDataDES);
    
        var Legend = legend.enter()
        .append('g')
        .classed('legend', true)
        .attr('tranform', function(d, i) {
            return 'translate(20,'+ (i+1)*30 +')';
        });

    Legend.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', function(d, i)
            {
                return color(i);
            });
    
    Legend.append('text')
            .text(function(d){
                return d.name;
            })
            .attr('fill', 'white')
            .attr('x',15)
            .attr('y',12);*/


}
else{
//API request for Salaam
const response = await fetch('https://api.teleport.org/api/urban_areas/slug:dar-es-salaam/scores/');
const dataDES = await response.json();

console.log('DES Data',dataDES.categories);

//Sorting data for Dar Es Salaam    
const graphDataDES = [ 
    
    {id: 'd2', name: dataDES.categories[1].name, score: parseInt(dataDES.categories[1].score_out_of_10)},
    {id: 'd5', name: dataDES.categories[8].name, score: parseInt(dataDES.categories[8].score_out_of_10)},
    {id: 'd6', name: dataDES.categories[13].name, score: parseInt(dataDES.categories[13].score_out_of_10)},
    {id: 'd7', name: dataDES.categories[14].name, score: parseInt(dataDES.categories[14].score_out_of_10)},
    {id: 'd1', name: dataDES.categories[5].name, score: parseInt(dataDES.categories[5].score_out_of_10)},
    {id: 'd3', name: dataDES.categories[7].name, score: parseInt(dataDES.categories[7].score_out_of_10)},
    {id: 'd4', name: dataDES.categories[0].name, score: parseInt(dataDES.categories[0].score_out_of_10)},
    {id: 'd8', name: dataDES.categories[11].name, score: parseInt(dataDES.categories[11].score_out_of_10)},
    {id: 'd9', name: dataDES.categories[15].name, score: parseInt(dataDES.categories[15].score_out_of_10)},
]; 

var data = d3.pie().sort(null).value(function(d){return d.score;})(graphDataDES);




var svg = d3.select('#graph3'),

        width = svg.attr('width'),
        height = svg.attr('height'),
        radius = Math.min(width, height)/2

var g = svg.append('g')
    .attr('transform', `translate(${width/2-110}, ${height/2})`)

var color = d3.scaleOrdinal(['#2ec8db','#2cb6c7','#28a8b8','#28a8b8',
'#2295a3','#51a6b0','#5ba2ab','#60a0a8','#47777d'])


var arc = d3.arc()
    .innerRadius(15)
    .outerRadius(radius - 120)
    .padAngle(.1)
    .padRadius(70);

var arcHover = d3.arc().outerRadius(radius - 95).innerRadius(20);
//var arcClicked = d3.arc().outerRadius(radius - 30).innerRadius(35);

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
        
        .transition()
        .duration(300)
        .attr('d', arcHover)
        .attr('stroke-width', 2)
        .attr('stroke', 'white')
        .style('opacity', 0.5);

        const outerLabel = d3.arc().outerRadius(radius-120).innerRadius(radius-100);
arcs.append('text')

.text(d => d.data.name)
.attr('transform', d => `translate(${outerLabel.centroid(d)})`)
.attr('font-size', '12px')
.attr('fill', 'white');
})

.on('mouseleave', function(d) {
    d3.select(this)
        .transition()
        .duration(300)
        .attr('d', arc)
        .attr('stroke', 'none')
        .style('opacity', 1);
location.reload();

        
        //clicked = false;
        
});
/*let clicked = false;
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
})*/

        

const label = d3.arc().outerRadius(radius).innerRadius(radius-100);
arcs.append('text')
.text(d => d.data.score)
.attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
.attr("dy", ".35em")
.style("text-anchor", "middle")
.attr('font-size', '15px')
.attr('fill', 'rgb(206,206,206)');
}
}

                    //INITIAL DATA DRIVEN ART ATTEMPT.
//Data Driven Art
/*async function getArtData()
{
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:johannesburg/scores/');
    const dataArt = await response.json(); 

var graphData = [
    {name: dataArt.categories[0].name, score: (parseInt(dataArt.categories[0].score_out_of_10)-2)},
];
console.log('ART DATA', graphData);

const svg = d3.select('#graph4')
const width = 650;
const height = 1000;
const margin = {top: 20, bottom: 20, left: 120, right: 20};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const color = d3.scaleLinear(['#630000','#a10000','#c40000','#ff0000','#8a0087','#140099']);
const xScale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, innerWidth]);
const yScale = d3.scaleBand()
        .domain(graphData.map(d => d.name))
        .range([0, innerHeight]);
const yAxis = d3.axisLeft(yScale);
const g = svg.append('g')
g.selectAll('rect')
.data(graphData)
.enter()
.append('rect')
.attr('y', d => yScale(d.name))
.attr('width', 50)
.attr('height', 50)
};*/
//getArtData();

async function getAucklandData()
{ if(window.screen.width > 430)
    {
    //API request
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:auckland/scores/');
    const dataAuck = await response.json();
    //Sorting data for D3    
    var graphData = [ 
        {name: dataAuck.categories[5].name, score: parseInt(dataAuck.categories[5].score_out_of_10)},
        {name: dataAuck.categories[1].name, score: parseInt(dataAuck.categories[1].score_out_of_10)},
        {name: dataAuck.categories[2].name, score: parseInt(dataAuck.categories[2].score_out_of_10)},
        {name: dataAuck.categories[7].name, score: parseInt(dataAuck.categories[7].score_out_of_10)},
        {name: dataAuck.categories[6].name, score: parseInt(dataAuck.categories[6].score_out_of_10)},
        {name: dataAuck.categories[0].name, score: parseInt(dataAuck.categories[0].score_out_of_10)},
        {name: dataAuck.categories[8].name, score: parseInt(dataAuck.categories[8].score_out_of_10)},
        {name: dataAuck.categories[9].name, score: parseInt(dataAuck.categories[9].score_out_of_10)},
        {name: dataAuck.categories[10].name, score: parseInt(dataAuck.categories[10].score_out_of_10)},
        {name: dataAuck.categories[11].name, score: parseInt(dataAuck.categories[11].score_out_of_10)},
        {name: dataAuck.categories[12].name, score: parseInt(dataAuck.categories[12].score_out_of_10)},
        {name: dataAuck.categories[13].name, score: parseInt(dataAuck.categories[13].score_out_of_10)},
        {name: dataAuck.categories[14].name, score: parseInt(dataAuck.categories[14].score_out_of_10)},
        {name: dataAuck.categories[15].name, score: parseInt(dataAuck.categories[15].score_out_of_10)},
        {name: dataAuck.categories[16].name, score: parseInt(dataAuck.categories[16].score_out_of_10)},
        {name: dataAuck.categories[4].name, score: parseInt(dataAuck.categories[4].score_out_of_10)},
        {name: dataAuck.categories[3].name, score: parseInt(dataAuck.categories[3].score_out_of_10)},
    ];   console.log('AUCKLAND Data',graphData);

   
var width = 650;
var height = 650;
var color = d3.scaleOrdinal(['#2ec8db','#2cb6c7','#28a8b8','#28a8b8',
'#2295a3','#51a6b0','#5ba2ab','#60a0a8','#47777d']);
const chart = graphData => d3.pack()
    .size([width, height])
    .padding(5)(d3.hierarchy({children: graphData})
    .sum(d => d.score));

const svg = d3.select('#graph4')
    .style('width', width)
    .style('height', height);
    
    
const root = chart(graphData);



const node = svg.selectAll()
    .data(root.children)
    .enter()
    .append('g')
    .attr('transform', `translate(0,0)`)
    .style('stroke', 'rgb(206, 206, 206)')
    .attr('stroke-width', 1.5 );
    
            
const circle = node.append('circle')
    .style('fill', color)
    .on('mouseover', function() {
        d3.select(this)
        .style('stroke', 'rgb(206, 206, 206)')
        .attr('stroke-width', 3)
        .attr('r', d => d.r + 10) 
        circleLabelName.style('opacity', 1)
        circleLabelScore.style('opacity', 1)   
        })
    .on('mouseout', function () {
        d3.select(this)
        .attr('stroke-width', 4 )
        .attr('r', d => d.r)
        circleLabelName.style('opacity', 0)
        circleLabelScore.style('opacity', 0)
});
    
const circleLabelName = node.append('text')
    .attr('transform', 'translate(-30, 0)')
    .text(d => d.data.name)
    .style('fill', 'rgb(206, 206, 206)')
    .style('opacity', 0)
    .style('stroke', 'none')
    .style('font-size', 15)

const circleLabelScore = node.append('text')
    .attr('transform', 'translate(0, 20)') 
    .text(d => d.data.score)
    .style('fill', 'rgb(206, 206, 206)')
    .style('opacity', 0)
    .style('stroke', 'none')
    .style('font-size', 15)
    
    node.transition()
        .ease(d3.easeExpInOut)
        .duration(2000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(2000)
        .attr('r', (d => d.r-15))


    //ATEMPT AT MAKING DRAG
        
        /*drag = {

  function dragstarted(event, d) {
    d3.select(this).raise()
    .style("opacity", 0.5);
  }

  function dragged(event, d) {
    d3.select(this)
    .attr("cx", d.x = event.x)
    .attr("cy", d.y = event.y);
  }

  function dragended(event, d) {
    d3.select(this)
    .style("opacity", 1);
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}*/
        
        //ATTEMPT AT CREATING CENTER GRAVITY FOR FINAL CHART
    /*var force = d3.forceSimulation()
        .velocityDecay(0.8)
        .alphaDecay(0)
        .force('collision', d3.forceCollide(d => d.r).strength(1))

        
    force.on('tick', function(){
        svg.selectAll('circle')
        .attr('cx', function(d) {return d.x;})
        .attr('cy', function(d) {return d.y;})
    })

    function generateForce(){
        force.force('charge', d3.forceManyBody().strength(5));
        force.force('x', d3.forceX(width/2));
        force.force('y', d3.forceX(height/2));
        force.restart();
        
    }
    generateForce()*/

}
else{
    
    //API request
    const response = await fetch('https://api.teleport.org/api/urban_areas/slug:auckland/scores/');
    const dataAuck = await response.json();
    //Sorting data for D3    
    var graphData = [ 
        {name: dataAuck.categories[5].name, score: parseInt(dataAuck.categories[5].score_out_of_10)},
        {name: dataAuck.categories[1].name, score: parseInt(dataAuck.categories[1].score_out_of_10)},
        {name: dataAuck.categories[2].name, score: parseInt(dataAuck.categories[2].score_out_of_10)},
        {name: dataAuck.categories[7].name, score: parseInt(dataAuck.categories[7].score_out_of_10)},
        {name: dataAuck.categories[6].name, score: parseInt(dataAuck.categories[6].score_out_of_10)},
        {name: dataAuck.categories[0].name, score: parseInt(dataAuck.categories[0].score_out_of_10)},
        {name: dataAuck.categories[8].name, score: parseInt(dataAuck.categories[8].score_out_of_10)},
        {name: dataAuck.categories[9].name, score: parseInt(dataAuck.categories[9].score_out_of_10)},
        {name: dataAuck.categories[10].name, score: parseInt(dataAuck.categories[10].score_out_of_10)},
        {name: dataAuck.categories[11].name, score: parseInt(dataAuck.categories[11].score_out_of_10)},
        {name: dataAuck.categories[12].name, score: parseInt(dataAuck.categories[12].score_out_of_10)},
        {name: dataAuck.categories[13].name, score: parseInt(dataAuck.categories[13].score_out_of_10)},
        {name: dataAuck.categories[14].name, score: parseInt(dataAuck.categories[14].score_out_of_10)},
        {name: dataAuck.categories[15].name, score: parseInt(dataAuck.categories[15].score_out_of_10)},
        {name: dataAuck.categories[16].name, score: parseInt(dataAuck.categories[16].score_out_of_10)},
        {name: dataAuck.categories[4].name, score: parseInt(dataAuck.categories[4].score_out_of_10)},
        {name: dataAuck.categories[3].name, score: parseInt(dataAuck.categories[3].score_out_of_10)},
    ];   console.log('AUCKLAND Data',graphData);

   
var width = 400;
var height = 400;
var color = d3.scaleOrdinal(['#2ec8db','#2cb6c7','#28a8b8','#28a8b8',
'#2295a3','#51a6b0','#5ba2ab','#60a0a8','#47777d']);
const chart = graphData => d3.pack()
    .size([width, height])
    .padding(5)(d3.hierarchy({children: graphData})
    .sum(d => d.score));

const svg = d3.select('#graph4')
    .style('width', width)
    .style('height', height);
    
    
const root = chart(graphData);



const node = svg.selectAll()
    .data(root.children)
    .enter()
    .append('g')
    .attr('transform', `translate(0,0)`)
    .style('stroke', 'rgb(206, 206, 206)')
    .attr('stroke-width', 1.5 );
    
            
const circle = node.append('circle')
    .style('fill', color)
    .on('mouseover', function() {
        d3.select(this)
        .style('stroke', 'rgb(206, 206, 206)')
        .attr('stroke-width', 3)
        .attr('r', d => d.r + 10) 
        circleLabelName.style('opacity', 1)
        circleLabelScore.style('opacity', 1)   
        })
    .on('mouseout', function () {
        d3.select(this)
        .attr('stroke-width', 4 )
        .attr('r', d => d.r)
        circleLabelName.style('opacity', 0)
        circleLabelScore.style('opacity', 0)
});
    
const circleLabelName = node.append('text')
    .attr('transform', 'translate(-30, 0)')
    .text(d => d.data.name)
    .style('fill', 'rgb(206, 206, 206)')
    .style('opacity', 0)
    .style('stroke', 'none')
    .style('font-size', 12)

const circleLabelScore = node.append('text')
    .attr('transform', 'translate(0, 20)') 
    .text(d => d.data.score)
    .style('fill', 'rgb(206, 206, 206)')
    .style('opacity', 0)
    .style('stroke', 'none')
    .style('font-size', 12)
    
    node.transition()
        .ease(d3.easeExpInOut)
        .duration(2000)
        .attr('transform', d => `translate(${d.x}, ${d.y})`);
    
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(2000)
        .attr('r', (d => d.r-8))
}
}

//initializing all graphs.
getAucklandData();
getJoburgData();
getNewYorkData();
getInteractiveData();