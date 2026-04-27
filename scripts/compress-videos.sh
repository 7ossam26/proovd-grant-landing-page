#!/usr/bin/env bash
set -e
VIDEOS_DIR="public/assets/videos"

for f in "$VIDEOS_DIR"/hero-phone-*.mp4; do
  name=$(basename "$f" .mp4)

  echo "→ Compressing $name.mp4"
  ffmpeg -y -i "$f" \
    -vcodec libx264 -crf 22 -preset slow \
    -vf "scale=480:-2" \
    -an -movflags +faststart \
    "$VIDEOS_DIR/${name}-opt.mp4"

  echo "→ Generating $name.webm"
  ffmpeg -y -i "$f" \
    -c:v libvpx-vp9 -crf 28 -b:v 0 \
    -vf "scale=480:-2" \
    -an \
    "$VIDEOS_DIR/${name}.webm"

  # Replace original with optimized version
  mv "$VIDEOS_DIR/${name}-opt.mp4" "$f"
  echo "✓ Done: $name"
done

echo ""
echo "All videos compressed. Final sizes:"
ls -lh "$VIDEOS_DIR"/
