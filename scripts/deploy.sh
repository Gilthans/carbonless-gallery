#!/usr/bin/env bash
set -euo pipefail
npm run build
aws s3 sync public/ "s3://${STATUS_BUCKET:?set STATUS_BUCKET}/" --delete
aws cloudfront create-invalidation --distribution-id "${STATUS_CDN:?set STATUS_CDN}" --paths '/*'
