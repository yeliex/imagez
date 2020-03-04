import * as ImageMagick from '../typing';
import { ReadStream, createWriteStream } from 'fs';
import { Readable } from 'stream';
import * as assert from 'assert';
import { executor } from '../executor';

export interface ConvertOptions {
    colors?: number;
    quality?: number;
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

    const args = optionsToArgs(options);

    const outputStream = output ? createWriteStream(output as string) : new Readable();

    const res = typeof input === 'string' ? await executor('convert', [input, ...args, '-'], {
        output: outputStream,
    }) : await executor('convert', ['-', ...args, '-'], {
        input,
        output: outputStream,
    });

    console.log(res);

    return output ? null : outputStream as Readable;
}
