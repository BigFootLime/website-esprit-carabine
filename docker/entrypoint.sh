#!/bin/sh
set -e

# Ensure uploads dir exists and is writable by nextjs (uid/gid 1001)
mkdir -p /app/public/uploads
chown -R 1001:1001 /app/public/uploads

# Hand off to the app as nextjs
exec su-exec nextjs:nodejs "$@"
