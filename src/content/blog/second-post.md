---
title: "Second post"
description: "Lorem ipsum dolor sit amet"
pubDate: "May 27 2024"
heroImage: "/blog-placeholder-4.jpg"
---

# Optimizing Images for the Web with WebP and a Simple Bash Script

In today's web development landscape, optimizing images is crucial for improving site performance and enhancing user experience. One of the best ways to optimize images is by converting them to the WebP format. WebP is a modern image format that provides superior compression and quality compared to traditional formats like JPEG and PNG.

In this post, I'll walk you through the process of converting images to WebP format using a simple bash script. This script will not only convert your images but also delete the original files to save space.

I implemented this today converting my portfolio images to webp format.

## Why WebP?

WebP offers several advantages:

- **Smaller file sizes**: WebP images are typically 25-34% smaller than comparable JPEG images.
- **Lossless and lossy compression**: WebP supports both lossless and lossy compression, giving you flexibility based on your needs.
- **Transparency and animation**: WebP supports transparency (like PNG) and animation (like GIF).

## Installing the WebP Tool

First, you need to install the WebP tools on your machine. If you're using macOS, you can easily install them using Homebrew.

```bash
brew install webp
The Bash Script
Here's a simple bash script that converts all JPEG and PNG images in a specified directory to WebP format and then deletes the original files.
```

```bash
Copy code
#!/bin/bash

# Directory containing images
DIR="./images"

# Output directory for WebP images
OUTPUT_DIR="./webp_images"

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
```

How the Script Works
Set the directories: The script defines the directory containing the original images (DIR) and the directory where the converted WebP images will be saved (OUTPUT_DIR).

Create the output directory: If the output directory does not exist, it will be created.

Loop through images: The script loops through all JPEG and PNG files in the input directory.

Convert images: Each image is converted to WebP format with a quality setting of 80. You can adjust the quality setting based on your requirements.

Delete original images: If the conversion is successful, the original image file is deleted.

Running the Script
Save the script as convert_to_webp.sh.
Make the script executable:

```bash
chmod +x convert_to_webp.sh
Run the script:
./convert_to_webp.sh
```

That's it! Your images will be converted to WebP format, and the original files will be deleted, leaving you with optimized images ready for the web.

Conclusion
Optimizing images is an essential part of web development, and converting them to WebP format is a great way to achieve this. With the simple bash script provided, you can automate the process and ensure your images are web-friendly. Give it a try and see the difference in your website's performance!

Feel free to share your thoughts or ask questions in the comments below. Happy optimizing!
