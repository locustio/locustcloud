"use client";
import dynamic from "next/dynamic";

const DevVisualEditing =
  process.env.NODE_ENV === "development"
    ? dynamic(() => import("next-sanity").then((mod) => mod.VisualEditing), {
        ssr: false,
      })
    : () => null;

export default function VisualEditing() {
  return <DevVisualEditing />;
}
