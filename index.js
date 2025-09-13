#!/usr/bin/env node

const axios = require('axios');
const fs = require('fs');

// Set max number of concurrent requests
const maxConcurrency = 5; // Limit parallel requests to 5 at a time

// ✅ Normalize a URL (add https:// if missing)
function normalizeUrl(url) {
  if (!/^https?:\/\//i.test(url)) {
    return 'https://' + url;
  }
  return url;
}

// ✅ Validate a URL
function isValidUrl(url) {
  try {
    const parsed = new URL(normalizeUrl(url));
    return !!parsed.hostname && parsed.hostname.includes('.');
  } catch {
    return false;
  }
}

// ✅ Check the status of a single URL
async function checkLink(rawUrl) {
  const url = normalizeUrl(rawUrl);

  if (!isValidUrl(url)) {
    return `${rawUrl} - ❌ Invalid URL format`;
  }

  try {
    const response = await axios.get(url);
    return `${url} - ${response.status} ${response.statusText}`;
  } catch (error) {
    if (error.response) {
      return `${url} - ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      return `${url} - No response from server (Timeout / Connection error)`;
    } else {
      return `${url} - Error: ${error.message}`;
    }
  }
}

// ✅ Check multiple links from a file
async function checkLinksFromFile(filePath, format = 'text', isParallel = false) {
  try {
    const rawLinks = fs.readFileSync(filePath, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => !!line); // Remove empty lines

    const normalizedLinks = rawLinks.map(normalizeUrl);
    const validLinks = normalizedLinks.filter(isValidUrl);

    const skippedCount = rawLinks.length - validLinks.length;

    if (skippedCount > 0) {
      console.log(`⚠️ Skipped ${skippedCount} invalid URL(s).`);
    }

    const results = [];

    const processBatch = async (batch) => {
      const batchResults = await Promise.all(batch.map(link => checkLink(link)));
      results.push(...batchResults);
    };

    if (isParallel) {
      const batches = [];
      for (let i = 0; i < validLinks.length; i += maxConcurrency) {
        batches.push(validLinks.slice(i, i + maxConcurrency));
      }

      for (const batch of batches) {
        await processBatch(batch);
      }
    } else {
      for (const link of validLinks) {
        const result = await checkLink(link);
        results.push(result);
      }
    }

    // Format output
    let output;
    if (format === 'csv') {
      output = 'URL, Status Code, Status Message\n';
      results.forEach(result => {
        const [url, status] = result.split(' - ');
        const statusCode = status.split(' ')[0];
        const statusMessage = status.split(' ').slice(1).join(' ');
        output += `${url}, ${statusCode}, ${statusMessage}\n`;
      });
    } else if (format === 'json') {
      const jsonResults = results.map(result => {
        const [url, status] = result.split(' - ');
        const statusCode = status.split(' ')[0];
        const statusMessage = status.split(' ').slice(1).join(' ');
        return { url, statusCode, statusMessage };
      });
      output = JSON.stringify(jsonResults, null, 2);
    } else {
      output = results.join('\n');
    }

    // Save to file
    const extension = format === 'csv' ? 'csv' : format === 'json' ? 'json' : 'txt';
    const fileName = `link_status_report.${extension}`;
    fs.writeFileSync(fileName, output);
    console.log(`✅ Link status report saved to ${fileName}`);
  } catch (error) {
    console.error(`❌ Error reading the file: ${error.message}`);
  }
}

// ✅ CLI Handler
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('No command provided. Usage:');
  console.log('To check a single link: node index.js check <URL>');
  console.log('To check links from a file: node index.js checkfile <path_to_file> [csv|json|text] [--parallel]');
} else {
  const command = args[0];

  if (command === 'check') {
    const rawUrl = args[1];
    if (rawUrl) {
      checkLink(rawUrl).then((result) => {
        console.log(result);
      });
    } else {
      console.log('❗ Please provide a URL after "check"');
    }
  } else if (command === 'checkfile') {
    const localArgs = [...args]; // Copy args
    const isParallel = localArgs.includes('--parallel');
    if (isParallel) {
      localArgs.splice(localArgs.indexOf('--parallel'), 1);
    }

    const filePath = localArgs[1];
    const format = localArgs[2] || 'text';

    if (filePath) {
      checkLinksFromFile(filePath, format, isParallel);
    } else {
      console.log('❗ Please provide a file path after "checkfile"');
    }
  } else {
    console.log('❌ Invalid command. Usage:');
    console.log('To check a single link: node index.js check <URL>');
    console.log('To check links from a file: node index.js checkfile <path_to_file> [csv|json|text] [--parallel]');
  }
}
