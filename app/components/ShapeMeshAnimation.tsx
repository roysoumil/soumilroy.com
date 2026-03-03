"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type ShapeType = "circle" | "square" | "triangle" | "hexagon";

interface ShapeNode {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  baseSize: number;
  baseOpacity: number;
  rotation: number;
  phase: number;
}

const SHAPE_PATHS: Record<ShapeType, string> = {
  circle: "", // handled separately
  square: "M -1 -1 L 1 -1 L 1 1 L -1 1 Z",
  triangle: "M 0 -1 L 1 1 L -1 1 Z",
  hexagon: "M 0 -1 L 0.866 -0.5 L 0.866 0.5 L 0 1 L -0.866 0.5 L -0.866 -0.5 Z",
};

const COLORS = [
  "rgba(9, 105, 218, 0.35)",
  "rgba(9, 105, 218, 0.25)",
  "rgba(3, 102, 214, 0.3)",
  "rgba(1, 80, 170, 0.28)",
  "rgba(84, 174, 255, 0.4)",
  "rgba(31, 35, 40, 0.2)",
  "rgba(48, 54, 61, 0.18)",
  "rgba(110, 118, 129, 0.25)",
];

export function ShapeMeshAnimation() {
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

    d3.select(svg).selectAll("*").remove();

    const g = d3.select(svg).append("g");

    // Content wrapper bounds (max-w-5xl = 1024px, centered)
    const contentMaxWidth = 1024;
    const padding = 48;
    const contentWidth = Math.min(contentMaxWidth, width - padding);
    const contentLeft = (width - contentWidth) / 2;
    const contentRight = contentLeft + contentWidth;
    const contentTop = height * 0.18;
    const contentBottom = height * 0.82;

    const shapes: ShapeNode[] = [];
    const shapeTypes: ShapeType[] = ["circle", "square", "triangle", "hexagon"];
    const numShapes = 48;

    for (let i = 0; i < numShapes; i++) {
      const type = shapeTypes[i % shapeTypes.length];
      let x: number;
      let y: number;

      // Place shapes around the content wrapper: left, right, top, bottom strips
      const zone = i % 4;
      switch (zone) {
        case 0: // left of content
          x = d3.randomUniform(0, contentLeft)();
          y = d3.randomUniform(0, height)();
          break;
        case 1: // right of content
          x = d3.randomUniform(contentRight, width)();
          y = d3.randomUniform(0, height)();
          break;
        case 2: // above content
          x = d3.randomUniform(contentLeft, contentRight)();
          y = d3.randomUniform(0, contentTop)();
          break;
        default: // below content
          x = d3.randomUniform(contentLeft, contentRight)();
          y = d3.randomUniform(contentBottom, height)();
      }

      const baseSize = 3 + Math.random() * 8;
      shapes.push({
        id: i,
        type,
        x,
        y,
        baseSize,
        baseOpacity: 0.5 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const colorScale = d3.scaleOrdinal(COLORS).domain(shapes.map((_, i) => String(i)));

    shapes.forEach((shape) => {
      const el = g.append("g").attr("transform", `translate(${shape.x},${shape.y})`);

      if (shape.type === "circle") {
        el.append("circle")
          .attr("r", shape.baseSize)
          .attr("fill", colorScale(String(shape.id)))
          .attr("stroke", "none");
      } else {
        el.append("path")
          .attr("d", SHAPE_PATHS[shape.type])
          .attr("fill", colorScale(String(shape.id)))
          .attr("stroke", "none")
          .attr("transform", `scale(${shape.baseSize}) rotate(${shape.rotation})`);
      }
    });

    const nodes = g.selectAll("g");

    const timer = d3.timer((elapsed) => {
      const t = elapsed * 0.001;

      shapes.forEach((shape, i) => {
        const node = nodes.filter((_, j) => j === i);
        if (node.empty()) return;

        // Gentle floating motion (bounded oscillation)
        const dx = Math.sin(t * 0.5 + shape.phase) * 10;
        const dy = Math.cos(t * 0.4 + shape.phase * 1.3) * 8;

        const x = shape.x + dx;
        const y = shape.y + dy;

        // Breathing scale
        const scale = 0.85 + 0.15 * Math.sin(t * 0.8 + shape.phase);
        const size = shape.baseSize * scale;

        // Subtle opacity pulse
        const opacity = shape.baseOpacity * (0.7 + 0.3 * Math.sin(t * 0.6 + shape.phase * 2));

        const rotation = shape.rotation + Math.sin(t * 0.3 + shape.phase) * 8;

        node.attr("transform", `translate(${x},${y})`);

        const circle = node.select("circle");
        const path = node.select("path");

        if (!circle.empty()) {
          circle.attr("r", size).attr("opacity", opacity);
        }
        if (!path.empty()) {
          path.attr("transform", `scale(${size}) rotate(${rotation})`).attr("opacity", opacity);
        }
      });
    });

    return () => {
      timer.stop();
      d3.select(svg).selectAll("*").remove();
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 h-full w-full">
      <svg ref={svgRef} className="h-full w-full" preserveAspectRatio="none" />
    </div>
  );
}
