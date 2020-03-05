import { resolve, join } from 'path';
import { mkdtempSync, mkdirSync, rmdirSync } from 'fs';
import { tmpdir } from 'os';
import { name } from '../../package.json';

export const TEST_BASE = resolve(__dirname, '../');

const TMP_BASE = join(tmpdir(), name.replace('/', '_'));

try {
    mkdirSync(TMP_BASE);
} catch (e) {
    if (e.code !== 'EEXIST') {
        throw e;
    }
}

export const TEST_TEMP_BASE = mkdtempSync(TMP_BASE + '/');

const exist = () => {
    console.log('Cleanup...');
    rmdirSync(TEST_TEMP_BASE, {
        recursive: true,
    });
    console.log('Finished');
};

process.once('exit', exist);
process.once('SIGINT', exist);
