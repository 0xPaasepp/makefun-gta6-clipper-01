import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// gta6-clipper-01: the entry is the YouTube video itself.
// This program only copies VIDEO.json (the Shorts URL) to the output
// directory so the grader can read it. No network, stdlib only.
const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  const videoPath = join(botDir, "VIDEO.json");
  // Guard: the entry is a YouTube Shorts URL. Fail loudly instead of
  // handing the grader a placeholder or a non-Shorts link.
  const video = JSON.parse(readFileSync(videoPath, "utf8"));
  if (typeof video.url !== "string" || !video.url.startsWith("https://www.youtube.com/shorts/")) {
    console.error("VIDEO.json does not carry a youtube.com/shorts URL:", video.url);
    process.exit(1);
  }
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(videoPath, join(outputDir, "VIDEO.json"));
} catch (err) {
  console.error("failed to copy VIDEO.json:", err);
  process.exit(1);
}
