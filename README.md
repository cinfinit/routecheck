# 🛠️ RouteCheck CLI - Because Links Deserve to Be Valid! [![NPM version](https://img.shields.io/npm/v/routecheck.svg?style=flat)](https://www.npmjs.com/package/routecheck) [![NPM downloads](https://img.shields.io/npm/dm/routecheck.svg?style=flat)](https://npmjs.org/package/routecheck) 

Are your links alive, or are they already dead?

With RouteCheck CLI, you’ll never have to worry about broken links (404s) or orphaned pages again! This command-line tool is your trusty sidekick to make sure your website’s links are always in tip-top shape.

## 🚀 Features

- **Check URLs**: Check a single URL or batch-check multiple links from a file.
- **Format Flexibility**: Output the results in text, CSV, or JSON.
- **Parallel Processing**: Speed up the process with the `--parallel` flag and check multiple links simultaneously.
- **Detailed Results**: Get an HTTP status code and the health of each link. Dead links? We’ll let you know!

## 📦 Installation

**Install via npm:**

You can install RouteCheck CLI globally using npm:

```bash
npm install -g routecheck
```

## ⚡ Usage

**Check a single URL:**

```bash
npx routecheck http://example.com
```

You’ll get a simple text-based output telling you if the link is alive or not, including the HTTP status code.

**Check multiple links from a file:**

Save a list of links in a `.txt` file (e.g., `links.txt`), one URL per line. Then run:

```bash
npx routecheck checkfile links.txt
```

It will process all the URLs in the file and let you know the status of each one.

**Add parallel requests (for speed!):**

Want to speed up the process when checking many links? Use the `--parallel` flag:

```bash
npx routecheck checkfile links.txt --parallel
```

This will check all the URLs at once, instead of one by one, making your checking experience lightning-fast!

**Output in different formats:**

If you’re fancy and need the results in CSV or JSON, here’s how you do it:

- **Text (default):**
  ```bash
  npx routecheck checkfile links.txt
  ```
- **CSV:**
  ```bash
  npx routecheck checkfile links.txt csv
  ```
- **JSON:**
  ```bash
  npx routecheck checkfile links.txt json
  ```

## 🎯 Why Use RouteCheck CLI?

- **SEO-friendly**: Broken links can hurt your SEO rankings. This tool ensures that your links are always healthy.
- **Time-saver**: Instead of clicking every link on your website manually, this CLI automates the entire process.
- **Batch Processing**: Whether it’s one URL or a thousand, this tool handles it all—quickly and efficiently.
- **Works Locally**: Use it from your terminal. No need for extra software or complex installations.


## 🤔 FAQ

**Q: What does this tool do?**

A: It checks URLs for status codes (like 404s) and helps you make sure your links are alive!

**Q: Can I use it for my website?**

A: Absolutely! In fact, we highly recommend it.

**Q: Does this tool check for everything?**

A: It checks links for HTTP status codes. We don't deal with deep-dives into content or redirects... yet. 😉

## 👏 Shoutout

Link-checking made simple and easy. Because no one likes broken links... except maybe broken-hearted websites. 😅

## 👨‍💻 Author

**[cinfinit](https://github.com/cinfinit)**

Builder of tools, breaker of links (intentionally), and occasional debugger of existential crises. Passionate about clean code, developer tooling, and making the web a better place (one unbroken link at a time).

When not coding, probably debugging life .

