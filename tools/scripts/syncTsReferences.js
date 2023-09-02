const fs = require('node:fs');
const path = require('node:path');

const run = () => {
  if (process.env.IS_CI === '1') {
    return process.exit(0);
  }

  const processPath = process.cwd();

  const tsConfigPath = path.resolve(processPath, 'tsconfig.json');
  const tsConfigBuildPath = path.resolve(processPath, 'tsconfig.build.json');
  const packageJsonPath = path.resolve(processPath, 'package.json');

  const tsConfigContents = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  const tsConfigBuildContents = JSON.parse(fs.readFileSync(tsConfigBuildPath, 'utf8'));
  const packageJsonContents = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  const isInternalPackage = (packageName) => {
    const prefixes = ['@common/', '@libs/', '@apps/'];

    return prefixes.some((prefix) => packageName.startsWith(prefix));
  };

  const transformPackageNameToPath = (packageName) => {
    const packageDirectoryPath = packageName.slice(1);

    const nameWithoutDashes = packageDirectoryPath
      .split('-')
      .map((part, index) => {
        if (index === 0) {
          return part;
        }

        return part[0].toUpperCase() + part.slice(1);
      })
      .join('');

    const packagePath = path.join(processPath, '..', '..', nameWithoutDashes);

    return fs.realpathSync.native(packagePath).split('/').slice(-2).join('/');
  };

  const dependencies = {
    ...packageJsonContents.dependencies,
    ...packageJsonContents.devDependencies,
  };

  const devReferences = [];
  const buildReferences = [];

  Object.keys({ ...dependencies }).forEach((packageName) => {
    if (!isInternalPackage(packageName)) {
      return;
    }

    const workspacePath = `../../${transformPackageNameToPath(packageName)}`;

    devReferences.push({
      path: `${workspacePath}/tsconfig.json`,
    });

    buildReferences.push({
      path: `${workspacePath}/tsconfig.build.json`,
    });
  });

  fs.writeFileSync(
    tsConfigPath,
    JSON.stringify(
      {
        ...tsConfigContents,
        references: devReferences,
      },
      null,
      2,
    ) + '\n',
  );

  fs.writeFileSync(
    tsConfigBuildPath,
    JSON.stringify(
      {
        ...tsConfigBuildContents,
        references: buildReferences,
      },
      null,
      2,
    ) + '\n',
  );

  console.log(`Synced references for ${processPath}`);
};

run();
