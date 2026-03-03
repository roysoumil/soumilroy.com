"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export function FlowLineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      setDimensions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    const { width, height } = dimensions;
    if (!svg || width === 0 || height === 0) return;

    // Rectangular path: top -> right -> bottom -> left (clockwise)
    const padding = 24;
    const rectPath = `M ${padding} ${padding} L ${width - padding} ${padding} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

    d3.select(svg).selectAll("*").remove();

    const pathEl = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
    pathEl.setAttribute("d", rectPath);
    pathEl.setAttribute("visibility", "hidden");
    const pathLength = pathEl.getTotalLength();

    const trail: { x: number; y: number }[] = [];
    const trail2: { x: number; y: number }[] = [];
    const trailLength = 180;
    let frameCount = 0;

    const defs = d3.select(svg).append("defs");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "trail-gradient")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "rgba(9, 105, 218, 0)");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(9, 105, 218, 0.4)");

    const gradient2 = defs
      .append("linearGradient")
      .attr("id", "trail-gradient-2")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient2.append("stop").attr("offset", "0%").attr("stop-color", "rgba(9, 105, 218, 0)");
    gradient2.append("stop").attr("offset", "100%").attr("stop-color", "rgba(9, 105, 218, 0.4)");

    const trailPath = d3
      .select(svg)
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#trail-gradient)")
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

    const trailPath2 = d3
      .select(svg)
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#trail-gradient-2)")
      .attr("stroke-width", 5)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

    const particle = d3
      .select(svg)
      .append("circle")
      .attr("r", 3)
      .attr("fill", "#0969da")
      .attr("stroke", "rgba(255, 255, 255, 0.9)")
      .attr("stroke-width", 1.5);

    const particle2 = d3
      .select(svg)
      .append("circle")
      .attr("r", 3)
      .attr("fill", "#0969da")
      .attr("stroke", "rgba(255, 255, 255, 0.9)")
      .attr("stroke-width", 1.5);

    const timer = d3.timer((elapsed) => {
      const phase = ((elapsed / 1000) * 280) % pathLength;
      const phase2 = (pathLength / 2 + phase) % pathLength;

      const point = pathEl.getPointAtLength(phase);
      const point2 = pathEl.getPointAtLength(phase2);

      particle.attr("cx", point.x).attr("cy", point.y);
      particle2.attr("cx", point2.x).attr("cy", point2.y);

      if (frameCount++ % 1 === 0) {
        trail.push({ x: point.x, y: point.y });
        if (trail.length > trailLength) trail.shift();
        trail2.push({ x: point2.x, y: point2.y });
        if (trail2.length > trailLength) trail2.shift();
      }

      if (trail.length >= 2) {
        const d = trail.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
        trailPath.attr("d", d);
        gradient.attr("x1", trail[0].x).attr("y1", trail[0].y).attr("x2", trail[trail.length - 1].x).attr("y2", trail[trail.length - 1].y);
      }
      if (trail2.length >= 2) {
        const d2 = trail2.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
        trailPath2.attr("d", d2);
        gradient2.attr("x1", trail2[0].x).attr("y1", trail2[0].y).attr("x2", trail2[trail2.length - 1].x).attr("y2", trail2[trail2.length - 1].y);
      }
    });

    return () => {
      timer.stop();
      d3.select(svg).selectAll("*").remove();
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full">
      <svg
        ref={svgRef}
        className="h-full w-full"
        preserveAspectRatio="none"
      />
    </div>
  );
}
