import { resolve } from 'path';
import { createReadStream } from 'fs';
import { TEST_BASE } from '../../fixture';
import { identify } from '../../../src';

describe('ImageMagick Identify', () => {
    it('should support filename', async () => {
        const res = await identify(resolve(TEST_BASE, 'resource/1.jpeg'));

        res.baseName.should.equal('1.jpeg');
        res.format.should.equal('JPEG');
        res.mimeType.should.equal('image/jpeg');
    });
    it('should support stream', async () => {
        const file = createReadStream(resolve(TEST_BASE, 'resource/1.jpeg'));
        const res = await identify(file);

        res.baseName.should.equal('1.jpeg');
        res.format.should.equal('JPEG');
        res.mimeType.should.equal('image/jpeg');
    });
    it('should support return format', async () => {
        const res = await identify(resolve(TEST_BASE, 'resource/1.jpeg'), '%k');

        res.should.equal('58530');
    });
    it('should support stream return format', async () => {
        const file = createReadStream(resolve(TEST_BASE, 'resource/1.jpeg'));

        const res = await identify(file, '%k');

        res.should.equal('58530');
    });
    it('should support custom args', async () => {
        const res = await identify(resolve(TEST_BASE, 'resource/1.jpeg'), ['-format', '%k']);

        res.should.equal('58530');
    });
    it('should support stream custom args', async () => {
        const file = createReadStream(resolve(TEST_BASE, 'resource/1.jpeg'));

        const res = await identify(file, ['-format', '%k']);

        res.should.equal('58530');
    });
    it('should get actual type', async () => {
        const file = createReadStream(resolve(TEST_BASE, 'resource/2.png'));
        const res = await identify(file);

        res.baseName.should.equal('2.png');
        res.format.should.equal('JPEG');
        res.mimeType.should.equal('image/jpeg');
    });
    it('should get alpha correct', async () => {
        const file = createReadStream(resolve(TEST_BASE, 'resource/3.png'));
        const res = await identify(file);

        res.channelDepth.should.own.property('alpha');
    });
});
