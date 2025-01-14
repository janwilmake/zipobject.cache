Simple script to cache a zipobject. May not be needed once we have the cache layer around zipobject, but for now this is needed for the stars.

> [!IMPORTANT]
> This is an interesting pattern, because it takes just 1 change and this worker would be a 1w-cached+stale proxy for another worker. If we could somehow automatically launch these things (shadowbranch?) we can very easily make a worker for every worker.
