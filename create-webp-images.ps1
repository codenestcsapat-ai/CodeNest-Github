
# WebP Image Creation Script for CodeNest
Write-Host "WebP Image Creator for CodeNest" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$ImageMagickPath = "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"
$OutputDir = "public_optimized"
$Quality = 90

# Create output directory if needed
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
    Write-Host "Created directory: $OutputDir" -ForegroundColor Green
}

# Function to convert image to WebP
function Convert-ToWebP {
    param(
        [string]$InputFile,
        [string]$OutputFile,
        [int]$Width,
        [int]$Height,
        [int]$Quality = 90
    )
    
    if (-not (Test-Path $InputFile)) {
        Write-Host "File not found: $InputFile" -ForegroundColor Red
        return $false
    }
    
    try {
        $Arguments = @(
            $InputFile,
            "-resize", "$($Width)x$($Height)^",
            "-gravity", "center",
            "-background", "none",
            "-extent", "$($Width)x$($Height)",
            "-quality", $Quality,
            $OutputFile
        )
        
        $null = & $ImageMagickPath $Arguments 2>&1
        
        if ((Test-Path $OutputFile)) {
            $OrigSize = (Get-Item $InputFile).Length
            $WebPSize = (Get-Item $OutputFile).Length
            $Savings = [Math]::Round((1 - ($WebPSize / $OrigSize)) * 100, 1)
            
            $name = [System.IO.Path]::GetFileName($OutputFile)
            $webpsizekb = [Math]::Round($WebPSize / 1KB, 1)
            Write-Host "DONE: $name ($webpsizekb KB, saved: $Savings%)" -ForegroundColor Green
            return $true
        }
        else {
            Write-Host "Failed to create: $OutputFile" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "Error: $_" -ForegroundColor Red
        return $false
    }
}

# Check ImageMagick installation
Write-Host "Checking ImageMagick..." -ForegroundColor Yellow
$MagickCheck = Get-Command $ImageMagickPath -ErrorAction SilentlyContinue

if (-not $MagickCheck) {
    Write-Host "ImageMagick not found!" -ForegroundColor Red
    Write-Host "Install: choco install imagemagick" -ForegroundColor Yellow
    exit 1
}

Write-Host "ImageMagick found" -ForegroundColor Green
Write-Host ""

# Process Logo Images
Write-Host "Processing Logo Images..." -ForegroundColor Cyan
Write-Host ""

if (Test-Path "logo_png.png") {
    Write-Host "Header Logo 64x64:" -ForegroundColor Yellow
    Convert-ToWebP -InputFile "logo_png.png" -OutputFile "$OutputDir/logo_png-64.webp" -Width 64 -Height 64 -Quality $Quality
    Write-Host ""
}

if (Test-Path "logo_png.png") {
    Write-Host "Header Logo 112x112:" -ForegroundColor Yellow
    Convert-ToWebP -InputFile "logo_png.png" -OutputFile "$OutputDir/logo_png-112.webp" -Width 112 -Height 112 -Quality $Quality
    Write-Host ""
}

if (Test-Path "logo_footer-modified.png") {
    Write-Host "Footer Logo 96x96:" -ForegroundColor Yellow
    Convert-ToWebP -InputFile "logo_footer-modified.png" -OutputFile "$OutputDir/logo_footer-modified-96.webp" -Width 96 -Height 96 -Quality $Quality
    Write-Host ""
    
    Write-Host "Footer Logo 168x168:" -ForegroundColor Yellow
    Convert-ToWebP -InputFile "logo_footer-modified.png" -OutputFile "$OutputDir/logo_footer-modified-168.webp" -Width 168 -Height 168 -Quality $Quality
    Write-Host ""
}

# Process Hero Image
Write-Host ""
Write-Host "Processing Hero Image..." -ForegroundColor Cyan
Write-Host ""

if (Test-Path "i_b_l.jpg") {
    Write-Host "Hero Image 400x300:" -ForegroundColor Yellow
    Convert-ToWebP -InputFile "i_b_l.jpg" -OutputFile "$OutputDir/i_b_l-400.webp" -Width 400 -Height 300 -Quality $Quality
    Write-Host ""
    
    Write-Host "Hero Image 600x450:" -ForegroundColor Yellow
    Convert-ToWebP -InputFile "i_b_l.jpg" -OutputFile "$OutputDir/i_b_l-600.webp" -Width 600 -Height 450 -Quality $Quality
    Write-Host ""
    
    Write-Host "Hero Image 800x602:" -ForegroundColor Yellow
    Convert-ToWebP -InputFile "i_b_l.jpg" -OutputFile "$OutputDir/i_b_l-800.webp" -Width 800 -Height 602 -Quality $Quality
    Write-Host ""
}

# Summary
Write-Host ""
Write-Host "Conversion Complete!" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green
Write-Host ""

$WebPFiles = Get-ChildItem "$OutputDir/*.webp" -ErrorAction SilentlyContinue
if ($WebPFiles) {
    Write-Host "Generated WebP files:" -ForegroundColor Cyan
    foreach ($file in $WebPFiles) {
        $size = [Math]::Round($file.Length / 1KB, 1)
        Write-Host "$($file.Name) - $size KB" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green

