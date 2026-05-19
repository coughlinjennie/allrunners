import * as d3 from 'd3';
import '../main.css';

const svg = d3.select('#d3-stained-glass');
const width = 800;
const height = 600;

// Random seed points scattered across the canvas
const numPoints = 40;
const points = Array.from({ length: numPoints }, () => [
  Math.random() * width,
  Math.random() * height,
]);

const delaunay = d3.Delaunay.from(points);
const voronoi = delaunay.voronoi([0, 0, width, height]);

// A rich stained-glass palette
const color = d3.scaleOrdinal(
  d3.quantize(d3.interpolateRainbow, numPoints)
);

// Draw filled cells
svg
  .selectAll('path.cell')
  .data([...voronoi.cellPolygons()])
  .join('path')
  .attr('class', 'cell')
  .attr('d', (cell) => 'M' + cell.join('L') + 'Z')
  .attr('fill', (_, i) => color(i))
  .attr('fill-opacity', 0.85)
  .attr('stroke', '#1a1a2e')
  .attr('stroke-width', 2.5);
