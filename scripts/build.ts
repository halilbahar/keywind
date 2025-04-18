import archiver from 'archiver';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import themeMeta from '../META-INF/keycloak-themes.json';

const name = themeMeta.themes[0].name;

const dir = 'out';
const file = `${name}.jar`;
const path = `${dir}/${file}`;

!existsSync(dir) && mkdirSync(dir);

const output = createWriteStream(`${__dirname}/../${path}`);
const archive = archiver('zip');

archive.on('error', (error) => {
  throw error;
});

archive.pipe(output);

// Copy META-INF as is
archive.directory('META-INF', 'META-INF');

// Copy theme folder but rename 'keywind' dynamically
archive.directory(`theme/keywind`, `theme/${name}`);

archive.finalize();
