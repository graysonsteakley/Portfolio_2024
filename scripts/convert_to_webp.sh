#!/bin/bash

# Directory containing images
DIR="../src/images"

# Output directory for WebP images
OUTPUT_DIR="../src/images"

# Create the output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Loop through all image files in the directory
for img in "$DIR"/*.{jpg,jpeg,png}; do
  if [[ -f $img ]]; then
    # Get the filename without extension
    filename=$(basename "$img")
    filename="${filename%.*}"
    
    # Convert the image to WebP format
    cwebp -q 80 "$img" -o "$OUTPUT_DIR/$filename.webp"
    
    if [[ $? -eq 0 ]]; then
      # Delete the original image if the conversion was successful
      rm "$img"
      echo "Converted and deleted $img"
    else
      echo "Failed to convert $img"
    fi
  fi
done

echo "All images have been converted to WebP format and original files deleted."
