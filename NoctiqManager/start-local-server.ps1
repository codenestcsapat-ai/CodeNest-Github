$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$port = 8000

while (Test-NetConnection -ComputerName 127.0.0.1 -Port $port -InformationLevel Quiet) {
  $port++
}

function Start-WithNode {
  $serverFile = Join-Path $env:TEMP "noctiq-static-server.js"
  @'
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = Number(process.argv[2] || 8000);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const requested = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const file = path.resolve(root, requested);

  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
});

server.on("error", (error) => {
  console.error(`Nem sikerult elinditani a szervert: ${error.message}`);
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Noctiq Manager fut: http://127.0.0.1:${port}`);
  console.log("Leallitas: Ctrl+C");
});
'@ | Set-Content -Path $serverFile -Encoding UTF8

  Push-Location $root
  try {
    node $serverFile $port
  } finally {
    Pop-Location
  }
}

function Start-WithPython {
  Push-Location $root
  try {
    Write-Host "Noctiq Manager fut: http://127.0.0.1:$port"
    Write-Host "Leallitas: Ctrl+C"
    python -m http.server $port --bind 127.0.0.1
  } finally {
    Pop-Location
  }
}

if (Get-Command node -ErrorAction SilentlyContinue) {
  Start-WithNode
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
  Start-WithPython
} else {
  Write-Host "Nincs telepitve Node.js vagy Python."
  Write-Host "Telepitsd a Node.js LTS verziot, majd futtasd ujra ezt a fajlt."
  exit 1
}
