"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type ContentRect = { left: number; top: number; width: number; height: number };

export function FlowLineAnimation({ contentRef }: { contentRef: React.RefObject<HTMLElement | null> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [contentRect, setContentRect] = useState<ContentRect | null>(null);

  useEffect(() => {
    const content = contentRef?.current;
    if (!content) return;

    const updateRect = () => {
      const rect = content.getBoundingClientRect();
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      setContentRect({
        left: rect.left - containerRect.left,
        top: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
      });
    };

    updateRect();
    const resizeObserver = new ResizeObserver(updateRect);
    resizeObserver.observe(content);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [contentRef]);

  useEffect(() => {
    const svg = svgRef.current;
    const rect = contentRect;
    if (!svg || !rect || rect.width === 0 || rect.height === 0) return;

    // Path around content box with responsive padding (24–48px for natural spacing on mobile)
    const padding = Math.max(24, Math.min(48, Math.min(rect.width, rect.height) * 0.1));
    const cornerRadius = Math.min(padding * 1.2, Math.min(rect.width, rect.height) * 0.08);
    const x1 = rect.left - padding;
    const y1 = rect.top - padding;
    const x2 = rect.left + rect.width + padding;
    const y2 = rect.top + rect.height + padding;
    const r = Math.min(cornerRadius, (x2 - x1) / 2, (y2 - y1) / 2);

    // Rounded rectangle path (clockwise): top → top-right arc → right → bottom-right arc → bottom → bottom-left arc → left → top-left arc
    const rectPath = `M ${x1 + r} ${y1} L ${x2 - r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1 + r} L ${x2} ${y2 - r} A ${r} ${r} 0 0 1 ${x2 - r} ${y2} L ${x1 + r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2 - r} L ${x1} ${y1 + r} A ${r} ${r} 0 0 1 ${x1 + r} ${y1} Z`;

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

    const particleGrad1 = defs.append("radialGradient").attr("id", "particle-gradient-1");
    particleGrad1.append("stop").attr("offset", "0%").attr("stop-color", "#0ea5e9");
    particleGrad1.append("stop").attr("offset", "60%").attr("stop-color", "#0369a1");
    particleGrad1.append("stop").attr("offset", "100%").attr("stop-color", "#0c4a6e");

    const particleGrad2 = defs.append("radialGradient").attr("id", "particle-gradient-2");
    particleGrad2.append("stop").attr("offset", "0%").attr("stop-color", "#e11d48");
    particleGrad2.append("stop").attr("offset", "60%").attr("stop-color", "#be123c");
    particleGrad2.append("stop").attr("offset", "100%").attr("stop-color", "#9f1239");

    const gradient = defs
      .append("linearGradient")
      .attr("id", "trail-gradient")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "rgba(3, 105, 161, 0)");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "rgba(3, 105, 161, 0.7)");

    const gradient2 = defs
      .append("linearGradient")
      .attr("id", "trail-gradient-2")
      .attr("gradientUnits", "userSpaceOnUse");
    gradient2.append("stop").attr("offset", "0%").attr("stop-color", "rgba(190, 18, 60, 0)");
    gradient2.append("stop").attr("offset", "100%").attr("stop-color", "rgba(190, 18, 60, 0.7)");

    const trailPath = d3
      .select(svg)
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#trail-gradient)")
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

    const trailPath2 = d3
      .select(svg)
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#trail-gradient-2)")
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round");

    const particle = d3
      .select(svg)
      .append("circle")
      .attr("r", 1.5)
      .attr("fill", "url(#particle-gradient-1)")
      .attr("stroke", "rgba(14, 165, 233, 0.9)")
      .attr("stroke-width", 0.5);

    const particle2 = d3
      .select(svg)
      .append("circle")
      .attr("r", 1.5)
      .attr("fill", "url(#particle-gradient-2)")
      .attr("stroke", "rgba(225, 29, 72, 0.9)")
      .attr("stroke-width", 0.5);

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
  }, [contentRect]);

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
