#!/bin/bash
# ===================================================================
# WebP Conversion Script for QR-Generator Logos
# CodeNest - Lighthouse Performance Optimization
# ===================================================================

echo "🖼️  WebP Image Conversion Script"
echo "=================================="
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ Error: cwebp is not installed"
    echo ""
    echo "Installation instructions:"
    echo "  Ubuntu/Debian: sudo apt-get install webp"
    echo "  macOS:         brew install webp"
    echo "  Windows:       Download from https://developers.google.com/speed/webp/download"
    exit 1
fi

# Create output directory
echo "📁 Creating output directory..."
mkdir -p public_optimized
echo "✅ Directory created: public_optimized/"
echo ""

# Convert logo_png.png
echo "🔄 Converting logo_png.png..."
if [ -f "logo_png.png" ]; then
    cwebp -q 90 logo_png.png -o public_optimized/logo_png.webp
    if [ $? -eq 0 ]; then
        ORIGINAL_SIZE=$(stat -f%z logo_png.png 2>/dev/null || stat -c%s logo_png.png)
        WEBP_SIZE=$(stat -f%z public_optimized/logo_png.webp 2>/dev/null || stat -c%s public_optimized/logo_png.webp)
        SAVINGS=$((100 - (WEBP_SIZE * 100 / ORIGINAL_SIZE)))
        echo "✅ logo_png.webp created"
        echo "   Original: $(numfmt --to=iec-i --suffix=B $ORIGINAL_SIZE 2>/dev/null || echo "${ORIGINAL_SIZE} bytes")"
        echo "   WebP:     $(numfmt --to=iec-i --suffix=B $WEBP_SIZE 2>/dev/null || echo "${WEBP_SIZE} bytes")"
        echo "   Savings:  ${SAVINGS}%"
    else
        echo "❌ Failed to convert logo_png.png"
    fi
else
    echo "⚠️  logo_png.png not found"
fi
echo ""

# Convert logo_footer-modified.png
echo "🔄 Converting logo_footer-modified.png..."
if [ -f "logo_footer-modified.png" ]; then
    cwebp -q 90 logo_footer-modified.png -o public_optimized/logo_footer-modified.webp
    if [ $? -eq 0 ]; then
        ORIGINAL_SIZE=$(stat -f%z logo_footer-modified.png 2>/dev/null || stat -c%s logo_footer-modified.png)
        WEBP_SIZE=$(stat -f%z public_optimized/logo_footer-modified.webp 2>/dev/null || stat -c%s public_optimized/logo_footer-modified.webp)
        SAVINGS=$((100 - (WEBP_SIZE * 100 / ORIGINAL_SIZE)))
        echo "✅ logo_footer-modified.webp created"
        echo "   Original: $(numfmt --to=iec-i --suffix=B $ORIGINAL_SIZE 2>/dev/null || echo "${ORIGINAL_SIZE} bytes")"
        echo "   WebP:     $(numfmt --to=iec-i --suffix=B $WEBP_SIZE 2>/dev/null || echo "${WEBP_SIZE} bytes")"
        echo "   Savings:  ${SAVINGS}%"
    else
        echo "❌ Failed to convert logo_footer-modified.png"
    fi
else
    echo "⚠️  logo_footer-modified.png not found"
fi
echo ""

echo "🎉 Conversion complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Verify WebP files in public_optimized/"
echo "   2. Deploy qr-generator.html with updated picture elements"
echo "   3. Configure server caching (.htaccess or nginx.conf)"
echo "   4. Test with Lighthouse"
echo ""
