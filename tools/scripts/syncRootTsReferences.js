const glob = require('glob');
const fs = require('node:fs');
const path = require('node:path');

const run = () => {
  if (process.env.IS_CI === '1') {
    return process.exit(0);
  }

  const processPath = process.cwd();

  const workspaces = ['common', 'libs', 'apps'].flatMap((directory) => {
    return glob.globSync(`${directory}/*`);
  });

  const references = workspaces
    .map((workspace) => {
      const isTsProject = fs.existsSync(`${workspace}/tsconfig.json`);

      if (!isTsProject) {
        return null;
      }

      return {
        path: workspace,
      };
    })
    .filter(Boolean);

  const tsConfigPath = path.resolve(processPath, 'tsconfig.dev.json');

  const tsConfigContents = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

  fs.writeFileSync(
    tsConfigPath,
    JSON.stringify(
      {
        ...tsConfigContents,
        references,
      },
      null,
      2,
    ) + '\n',
  );

  console.log(`Synced references for ${processPath}`);
};

run();
