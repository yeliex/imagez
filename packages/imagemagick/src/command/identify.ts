import { omit } from 'lodash';
import * as ImageMagick from '../typing';
import { executor } from '../executor';
import { ReadStream, writeFileSync } from 'fs';
import * as assert from 'assert';
import { basename } from 'path';

const serializeResponse = (output: string): ImageMagick.Identify[] => {
    writeFileSync('/Users/yeliex/a.json', output, 'utf8');

    const list: any[] = JSON.parse(output);

    return list.map((item) => {
        return omit(item.image, ['name', 'version']);
    }) as any;
};

export async function identify(input: ImageMagick.InputFile): Promise<ImageMagick.Identify>
export async function identify(input: ImageMagick.InputFile, format: string): Promise<string>
export async function identify(input: ImageMagick.InputFile, args: string | string[]): Promise<string>
export async function identify(input: ImageMagick.InputFile, args?: string | string[]): Promise<ImageMagick.Identify | string> {
    assert(typeof input === 'string' || input instanceof ReadStream, 'invalid input, want string or ReadStream');

    if (!args) {
        const res = typeof input === 'string' ?
            await executor('convert', [input, 'json:-']) :
            await executor('convert', ['-', 'json:-'], {
                input,
            });

        const obj = serializeResponse(res)[0];

        if (input instanceof ReadStream) {
            obj.baseName = typeof input.path === 'string' ? basename(input.path) : 'Unknown';
        }

        return obj;
    }

    args = Array.isArray(args) ? args : [args];

    if (args.length === 1 && args[0].startsWith('%')) {
        args.unshift('-format');
    }

    return typeof input === 'string' ?
        await executor('identify', [...args, input]) :
        await executor('identify', [...args, '-'], {
            input,
        });
}
