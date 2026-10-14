const fs = require('node:fs');
const path = require('node:path');
const report = JSON.parse(fs.readFileSync('browser-results.json', 'utf8'));
const summary = { stats: report.stats, projects: {}, failures: [] };
fs.mkdirSync('browser-evidence', { recursive: true });
function visit(suites) {
  for (const suite of suites) {
    for (const spec of suite.specs || []) {
      for (const test of spec.tests) {
        const project = summary.projects[test.projectName] ||= { passed: 0, failed: 0, skipped: 0 };
        const result = test.results.at(-1);
        const status = result.status === 'passed' ? 'passed' : result.status === 'skipped' ? 'skipped' : 'failed';
        project[status]++;
        if (status === 'failed') summary.failures.push({ project: test.projectName, title: spec.title, errors: result.errors?.map(e => e.message) });
        for (const attachment of result.attachments || []) {
          if (attachment.contentType === 'image/png' && attachment.body) {
            const filename = `${test.projectName}-${attachment.name}.png`.replace(/[^a-zA-Z0-9_.-]/g, '_');
            fs.writeFileSync(path.join('browser-evidence', filename), Buffer.from(attachment.body, 'base64'));
          }
        }
      }
    }
    visit(suite.suites || []);
  }
}
visit(report.suites);
fs.writeFileSync('browser-evidence/summary.json', JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
