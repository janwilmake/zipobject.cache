# January 8, 2025

✅ Made an initial version that required a queue and a kv

✅ After implementing nachocache stale, heavily simplified this implementation by just proxying it via nachocache.

✅ Finish `uithub.size` by using uithub api, stale-cached for up to a week. Make uithub.size publicly available. Make it work for sub directories too. Use this in the og:image generator.

✅ Work with private repos as well through Authorization header, storing only the size, but not making it public. This means it won't work for private repo badges yet, but that's ok.

✅ Converted to zipobject cache and it's just a simple nachoche around zipobject, nothing more.
