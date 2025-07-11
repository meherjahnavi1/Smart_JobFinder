const { spawn } = require('child_process');

const runSpacyParser = (text) => {
  return new Promise((resolve, reject) => {
    const process = spawn('python3', ['server/spacy_parser.py']);

    let output = '';
    let error = '';

    process.stdin.write(text);
    process.stdin.end();

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      error += data.toString();
    });

    process.on('close', (code) => {
      if (code === 0) {
        try {
          resolve(JSON.parse(output));
        } catch (err) {
          reject('JSON parse failed: ' + err);
        }
      } else {
        reject(error);
      }
    });
  });
};

module.exports = { runSpacyParser };
