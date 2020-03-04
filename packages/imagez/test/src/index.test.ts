import ImageZ from '../../src';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { TEST_BASE } from '../fixture';

describe('imagez', () => {
    it('should', async () => {
        const file = createReadStream(resolve(TEST_BASE, 'resource/1.jpeg'));

        const image = new ImageZ(file);

        console.log(image);
    });
});
