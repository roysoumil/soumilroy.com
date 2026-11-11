import type { CSSProperties } from "react";

type Node = { x: number; y: number; w: number; h: number; shape?: "round" | "window" };
type Link = { x: number; y: number; direction: "up" | "down"; duration: number; delay: number };

// Listed top-first so the DOM reads in the order the eye does. `level` is the
// height in the stack (0 is the floor). Node and link positions are
// percentages of the plate; a link belongs to the lower of the two layers it
// joins and rises one gap to the layer above.
const LAYERS: { name: string; tech: string[]; level: number; nodes: Node[]; links: Link[] }[] = [
  {
    name: "Interface",
    tech: ["react", "typescript"],
    level: 4,
    nodes: [
      { x: 50, y: 44, w: 70, h: 56, shape: "window" },
      { x: 30, y: 85, w: 30, h: 8 },
    ],
    links: [],
  },
  {
    name: "AI",
    tech: ["openai", "llama"],
    level: 3,
    // A model in the middle with the tools it calls around it.
    nodes: [
      { x: 50, y: 50, w: 26, h: 26, shape: "round" },
      { x: 30, y: 32, w: 10, h: 10, shape: "round" },
      { x: 70, y: 30, w: 10, h: 10, shape: "round" },
      { x: 30, y: 70, w: 10, h: 10, shape: "round" },
      { x: 68, y: 70, w: 10, h: 10, shape: "round" },
    ],
    links: [
      { x: 50, y: 50, direction: "up", duration: 2.8, delay: 2.1 },
      { x: 70, y: 30, direction: "down", duration: 3.3, delay: 3.2 },
    ],
  },
  {
    name: "Services",
    tech: ["go", "python"],
    level: 2,
    nodes: [
      { x: 30, y: 32, w: 28, h: 18 },
      { x: 68, y: 28, w: 20, h: 14 },
      { x: 68, y: 70, w: 22, h: 22 },
    ],
    links: [
      { x: 30, y: 32, direction: "up", duration: 3.0, delay: 2.6 },
      { x: 68, y: 70, direction: "down", duration: 3.4, delay: 3.8 },
    ],
  },
  {
    name: "Data",
    tech: ["mysql", "postgres"],
    level: 1,
    nodes: [
      { x: 30, y: 32, w: 24, h: 24, shape: "round" },
      { x: 68, y: 70, w: 24, h: 24, shape: "round" },
    ],
    links: [
      { x: 30, y: 32, direction: "down", duration: 3.1, delay: 2.4 },
      { x: 68, y: 70, direction: "up", duration: 2.6, delay: 3.6 },
    ],
  },
  {
    name: "Platform",
    tech: ["docker", "azure"],
    level: 0,
    nodes: [
      { x: 30, y: 32, w: 18, h: 18 },
      { x: 68, y: 32, w: 18, h: 18 },
      { x: 30, y: 70, w: 18, h: 18 },
      { x: 68, y: 70, w: 18, h: 18 },
    ],
    links: [
      { x: 30, y: 32, direction: "up", duration: 3.2, delay: 1.9 },
      { x: 68, y: 70, direction: "down", duration: 2.9, delay: 2.7 },
    ],
  },
];

// Top-first, for anything that needs to refer to the layers (the work cards
// light the ones a project covers).
export const LAYER_NAMES = LAYERS.map((layer) => layer.name);

// Half the top level: layers are placed relative to it so the stack stays
// centred on the stage however many there are.
const MID = (LAYERS.length - 1) / 2;

const pct = (n: number) => `${n}%`;

// The whole scene is CSS 3D (see the .stack-* rules in globals.css): no
// canvas, so it server-renders, follows the theme tokens, and the layer names
// stay real text. The cursor tilt arrives as --tilt-x / --tilt-z inherited
// from the hero section, which also handles dragging the stack round.
export default function StackScene() {
  return (
    <div className="stack-scene">
      <ul
        className="stack-stage"
        aria-label="Stack, from the interface down to the platform"
        style={{ "--mid": MID } as CSSProperties}
      >
        {/* The floor the stack stands on: the page's only background pattern.
            It lives in the stage, so it turns with the stack. */}
        <li aria-hidden="true" className="stack-floor" />
        {LAYERS.map((layer) => (
          <li
            key={layer.name}
            className="stack-layer"
            data-floor={layer.level === 0 ? "" : undefined}
            style={{ "--level": layer.level } as CSSProperties}
          >
            <div className="stack-plate">
              <span aria-hidden="true" className="stack-cast" />
              <span aria-hidden="true" className="stack-side is-front" />
              <span aria-hidden="true" className="stack-side is-left" />
              {layer.nodes.map((node, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`stack-node ${node.shape ? `is-${node.shape}` : ""}`}
                  style={{ left: pct(node.x), top: pct(node.y), width: pct(node.w), height: pct(node.h) }}
                />
              ))}
              {layer.links.map((link, i) => (
                <span key={i} aria-hidden="true" className="stack-link" style={{ left: pct(link.x), top: pct(link.y) }}>
                  <span
                    className={`stack-packet is-${link.direction}`}
                    style={{ animationDuration: `${link.duration}s`, animationDelay: `${link.delay}s` }}
                  />
                </span>
              ))}
              <span className="stack-label">
                <span>
                  <span className="stack-label-name">{layer.name}</span>
                  <span className="stack-label-tech font-mono">{layer.tech.join(", ")}</span>
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
