# Waitlist records

Each waitlist signup is stored as one JSON file in this directory while running locally.

For a hosted deployment, set `WAITLIST_STORAGE_DIR` to a persistent, access-restricted directory. Serverless filesystems, including Vercel's runtime filesystem, are not persistent and should not be used for waitlist records.
