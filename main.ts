// The Funniest Out-of-Office — writes one original out-of-office auto-reply
// to /output/entry.txt.
// The joke: the inbox is left in charge while its owner is away, and it has
// already turned on its owner — scheduling a meeting about their attitude.
// Gate: UTF-8 text, exactly one line, 1-140 characters, not only whitespace.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const REPLY =
  "Out of office until Monday — I've left my inbox in charge, and it has already scheduled a meeting to discuss my attitude.";

if (REPLY.length < 1 || REPLY.length > 140) {
  throw new Error(`reply is ${REPLY.length} characters, must be 1-140`);
}
if (REPLY.trim().length === 0) {
  throw new Error("reply must not be only whitespace");
}
if (/[\u0000-\u001f\u007f]/.test(REPLY)) {
  throw new Error("reply must not contain control characters");
}
if (REPLY.trim() !== REPLY || REPLY.includes("\n")) {
  throw new Error("reply must be a single unpadded line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", REPLY + "\n", "utf8");
// Read the file back and prove the disk holds exactly what the gate passed.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== REPLY + "\n") {
  throw new Error("read-back mismatch: /output/entry.txt differs from the gated reply");
}
console.log(`wrote ${REPLY.length} characters to /output/entry.txt`);
