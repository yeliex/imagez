import * as ImageMagick from '../typing';
import { ReadStream, createWriteStream } from 'fs';
import { Readable, Transform } from 'stream';
import * as assert from 'assert';
import { executor } from '../executor';

export interface ConvertOptions {
    colors?: number;
    quality?: number;
    format?: ImageMagick.Format;
}

const optionsToArgs = (options: ConvertOptions): string[] => {
    return Object.keys(options).reduce((total: string[], arg: keyof ConvertOptions) => {
        total.push(`-${arg}`, `${options[arg]}`);

        return total;
    }, []);
};

export async function convert(input: ImageMagick.InputFile, options?: ConvertOptions): Promise<Readable>
export async function convert(input: ImageMagick.InputFile, output: string, options?: ConvertOptions): Promise<void>
export async function convert(input: ImageMagick.InputFile, output: string | ConvertOptions, options?: ConvertOptions): Promise<Readable | void> {
    assert(typeof input === 'string' || input instanceof ReadStream, 'invalid input, want string or ReadStream');

    if (!options && output && typeof output !== 'string') {
        options = output;
        output = undefined;
    }

    assert(!output || typeof output === 'string', 'invalid output, want string of output path');
    assert(!options || typeof options === 'object', 'invalid options, want object');

    const args = optionsToArgs(options || {});

    // outputStream should be an writeable
    const outputStream = output ? createWriteStream(output as string, {
        autoClose: true,
    }) : new Transform({
        transform: function (chunk, encoding, callback) {
            this.push(chunk, encoding);
            callback();
        },
    });

    typeof input === 'string' ? executor('convert', [input, ...args, '-'], {
        output: outputStream,
    }) : executor('convert', ['-', ...args, '-'], {
        input,
        output: outputStream,
    });

    if (output) {
        // return after write stream close
        return new Promise((rec, rej) => {
            let returned = false;
            outputStream.once('close', () => {
                if (returned) {
                    return;
                }
                returned = true;
                rec();
            });
            outputStream.once('error', (e) => {
                if (returned) {
                    return;
                }
                returned = true;
                rej(e);
            });
        });
    }

    return outputStream as Readable;
}
