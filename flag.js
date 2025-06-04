// decode-b64-rot15.js
// run with:  node decode-b64-rot15.js

const b64 = `QmluZ28KRWNvZGluZzogUk9UMTUKRW5jb2RlZCBGbGFnOiBVYXB2Tns5MXJzODI0NzB0OTIwOTkzc3U3dDdwcXUzOTQ3NTVyOX0=`;
const decoded = Buffer.from(b64, 'base64').toString('utf8');

console.log('— Base-64 decode —\n' + decoded);

// ───────────────────────────────── ROT-15 helper ─────────────────────────────────
function rotN(text, shift) {
  const a = 'a'.charCodeAt(0), A = 'A'.charCodeAt(0);
  return text.replace(/[a-zA-Z]/g, ch => {
    const base = ch <= 'Z' ? A : a;
    return String.fromCharCode(((ch.charCodeAt(0) - base - shift + 26) % 26) + base);
  });
}

// if the decoded blob itself contains a ROT-15 flag, decode it, too
const m = decoded.match(/Encoded Flag:\s*([^\n\r]+)/);
if (m) {
  const rot15 = m[1].trim();
  const flag   = rotN(rot15, 15);     // subtract 15 to undo a +15 encoding
  console.log('\n— ROT-15 decode —\n' + flag);
}
