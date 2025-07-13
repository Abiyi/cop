const width = window.innerWidth;
const height = window.innerHeight * 0.9;

const svg = d3.select("#graph").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("malla_data.json").then(data => {
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
      .attr("class", "link");

  const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
      .attr("class", "node");

  node.append("circle")
      .attr("r", 20)
      .attr("fill", "#8f9779"); // verde/beige neutro

  node.append("text")
      .text(d => d.name)
      .attr("x", 25)
      .attr("y", 5);

  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x},${d.y})`);
  });
});
