import { lookpath } from 'lookpath';
import * as ChildProcess from 'child_process';
import * as FS from 'fs';
import * as Stream from 'stream';
import { ChildProcessByStdio } from 'child_process';

const flags = {
    path: '',
};

const ready: Promise<void> = (async () => {
    const path = flags.path = await lookpath('magick');

    if (!path) {
        throw new Error('cannot find path of magick, please check install');
    }
})();

interface ExecutorOptions extends ChildProcess.SpawnOptions {
    input?: FS.ReadStream;
}

interface ExecutorOptionsWithOutput<T extends Stream.Writable> extends ExecutorOptions {
    output: T;
}

export async function executor(command: string, args: string[], options?: ExecutorOptions): Promise<string>
export async function executor<T extends Stream.Writable = Stream.Writable>(command: string, args: string[], options?: ExecutorOptionsWithOutput<T>): Promise<ChildProcessByStdio<Stream.Writable, Stream.Readable, Stream.Readable>>
export async function executor<T extends Stream.Writable = Stream.Writable>(command: string, args: string[], options?: ExecutorOptionsWithOutput<T>): Promise<ChildProcessByStdio<Stream.Writable, Stream.Readable, Stream.Readable> | string> {
    await ready;
    const { input, output, ...others } = options || {};

    const proc = ChildProcess.spawn(command, args, {
        ...others,
        stdio: 'pipe',
    });

    let message = '';
    let error: null | Error = null;

    return new Promise((rec, rej) => {
        let returned = false;
        if (input) {
            input.pipe(proc.stdin);
        }

        proc.on('error', (err) => {
            if (returned) {
                return;
            }
            rej(err);
            returned = true;
        });
        proc.once('exit', (code) => {
            if (returned) {
                return;
            }
            returned = true;
            if (code === 0) {
                !output && rec(message);
                return;
            }
            error = error || new Error();
            error.message = `exit with code ${code}\n${error.message}`;
            rej(error);
        });
        if (output) {
            proc.stdout.pipe(output);
            rec(proc);
            returned = true;
        } else {
            proc.stdout.on('data', (data) => {
                message += data;
            });
        }
    });
}
