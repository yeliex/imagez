import { resolve } from 'path';
import { stat, createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import { TEST_BASE, TEST_TEMP_BASE } from '../../fixture';
import { convert } from '../../../src/';

describe('ImageMagick convert', () => {
    it('should support filename', async () => {
        const input = resolve(TEST_BASE, 'resource/1.jpeg');
        const output = resolve(TEST_TEMP_BASE, 'convert_1.png');

        await convert(input, output);

        const fileStat = await promisify(stat)(output);

        fileStat.isFile().should.equal(true);
        fileStat.size.should.greaterThan(0);
    });

    it('should support stream input', async () => {
        const input = createReadStream(resolve(TEST_BASE, 'resource/2.png'));
        const output = resolve(TEST_TEMP_BASE, 'convert_2.jpg');

        await convert(input, output);

        const fileStat = await promisify(stat)(output);

        fileStat.isFile().should.equal(true);
        fileStat.size.should.greaterThan(0);
    });

    it('should support output stream', async function () {
        const input = createReadStream(resolve(TEST_BASE, 'resource/2.png'));

        const output = createWriteStream(resolve(TEST_TEMP_BASE, 'convert_3.png'), {
            autoClose: true,
        });

        const res = await convert(input);

        res.pipe(output);

        return new Promise((rec, rej) => {
            output.once('close', async () => {
                const fileStat = await promisify(stat)(output.path);

                fileStat.isFile().should.equal(true);
                fileStat.size.should.greaterThan(0);

                rec();
            });
            output.once('error', rej);
        });
    });

    it('should support output stream', async function () {
        const input = resolve(TEST_BASE, 'resource/2.png');

        const output = createWriteStream(resolve(TEST_TEMP_BASE, 'convert_3.png'), {
            autoClose: true,
        });

        const res = await convert(input);

        res.pipe(output);

        return new Promise((rec, rej) => {
            output.once('close', async () => {
                const fileStat = await promisify(stat)(output.path);

                fileStat.isFile().should.equal(true);
                fileStat.size.should.greaterThan(0);

                rec();
            });
            output.once('error', rej);
        });
    });

    it('should support input output stream', async function () {
        const input = createReadStream(resolve(TEST_BASE, 'resource/2.png'));

        const output = createWriteStream(resolve(TEST_TEMP_BASE, 'convert_4.png'), {
            autoClose: true,
        });

        const res = await convert(input);

        res.pipe(output);

        return new Promise((rec, rej) => {
            output.once('close', async () => {
                const fileStat = await promisify(stat)(output.path);

                fileStat.isFile().should.equal(true);
                fileStat.size.should.greaterThan(0);

                rec();
            });
            output.once('error', rej);
        });
    });

    it('should support args', async () => {
        const input = resolve(TEST_BASE, 'resource/1.jpeg');
        const output = resolve(TEST_TEMP_BASE, 'convert_5.png');

        await convert(input, output, {
            colors: 8,
            format: 'png',
        });

        const fileStat = await promisify(stat)(output);

        fileStat.isFile().should.equal(true);
        fileStat.size.should.greaterThan(0);
    });

    it('should support args with stream input', async () => {
        const input = createReadStream(resolve(TEST_BASE, 'resource/2.png'));

        const output = createWriteStream(resolve(TEST_TEMP_BASE, 'convert_6.png'), {
            autoClose: true,
        });

        const res = await convert(input, {
            colors: 8,
            format: 'png',
        });

        res.pipe(output);

        return new Promise((rec, rej) => {
            output.once('close', async () => {
                const fileStat = await promisify(stat)(output.path);

                fileStat.isFile().should.equal(true);
                fileStat.size.should.greaterThan(0);

                rec();
            });
            output.once('error', rej);
        });
    });
});
