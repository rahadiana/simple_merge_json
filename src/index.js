'use strict'
const fs = require('fs');
const path = require('path');

exports.MergeJson = (dir) => {
  return new Promise((resolve, reject) => {
    const data = { r: [] };

    fs.readdir(dir, (err, files) => {
      if (err) return reject(err);

      // Only keep files that end with .json (case-insensitive)
      const jsonFiles = files.filter(f => f && f.toLowerCase().endsWith('.json'));

      try {
        jsonFiles.forEach(file => {
          const fullPath = path.join(dir, file);
          const raw = fs.readFileSync(fullPath, 'utf8');
          const content = JSON.parse(raw);

          // If the JSON file contains an array, concat it; otherwise push the value
          if (Array.isArray(content)) data.r = data.r.concat(content);
          else data.r.push(content);
        });

        // Return the merged array (as a JSON string) to preserve previous behavior
        resolve(JSON.stringify(data.r));
      } catch (e) {
        reject(e);
      }
    });
  });
};