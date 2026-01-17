# ===================================================================
# WebP Conversion Script for QR-Generator Logos (PowerShell)
# CodeNest - Lighthouse Performance Optimization
# ===================================================================

Write-Host "🖼️  WebP Image Conversion Script" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if cwebp is available
$cwebpPath = Get-Command cwebp -ErrorAction SilentlyContinue

if (-not $cwebpPath) {
    Write-Host "❌ Error: cwebp is not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Download WebP tools from:" -ForegroundColor Yellow
    Write-Host "https://developers.google.com/speed/webp/download" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Extract and add to PATH, or use full path to cwebp.exe" -ForegroundColor Yellow
    exit 1
}

# Create output directory
Write-Host "📁 Creating output directory..." -ForegroundColor Yellow
if (-not (Test-Path "public_optimized")) {
    New-Item -ItemType Directory -Path "public_optimized" | Out-Null
    Write-Host "✅ Directory created: public_optimized/" -ForegroundColor Green
} else {
    Write-Host "✅ Directory exists: public_optimized/" -ForegroundColor Green
}
Write-Host ""

# Function to convert image and show stats
function Convert-ToWebP {
    param(
        [string]$InputFile,
        [string]$OutputFile,
        [int]$Quality = 90
    )
    
    if (Test-Path $InputFile) {
        Write-Host "🔄 Converting $InputFile..." -ForegroundColor Yellow
        
        # Run cwebp
        & cwebp -q $Quality $InputFile -o $OutputFile 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0 -and (Test-Path $OutputFile)) {
            $originalSize = (Get-Item $InputFile).Length
            $webpSize = (Get-Item $OutputFile).Length
            $savings = [Math]::Round((1 - ($webpSize / $originalSize)) * 100, 1)
            
            Write-Host "✅ $([System.IO.Path]::GetFileName($OutputFile)) created" -ForegroundColor Green
            Write-Host "   Original: $([Math]::Round($originalSize / 1KB, 1)) KB" -ForegroundColor Gray
            Write-Host "   WebP:     $([Math]::Round($webpSize / 1KB, 1)) KB" -ForegroundColor Gray
            Write-Host "   Savings:  $savings%" -ForegroundColor Cyan
        } else {
            Write-Host "❌ Failed to convert $InputFile" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️  $InputFile not found" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Convert logos
Convert-ToWebP -InputFile "logo_png.png" -OutputFile "public_optimized/logo_png.webp" -Quality 90
Convert-ToWebP -InputFile "logo_footer-modified.png" -OutputFile "public_optimized/logo_footer-modified.webp" -Quality 90

Write-Host "🎉 Conversion complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Verify WebP files in public_optimized/" -ForegroundColor White
Write-Host "   2. Deploy qr-generator.html with updated picture elements" -ForegroundColor White
Write-Host "   3. Configure server caching (.htaccess or nginx.conf)" -ForegroundColor White
Write-Host "   4. Test with Lighthouse" -ForegroundColor White
Write-Host ""

# Optional: Open the folder
$response = Read-Host "Open public_optimized folder? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Invoke-Item "public_optimized"
}
