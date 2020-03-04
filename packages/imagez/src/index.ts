import { ReadStream } from 'fs';
import { identify, convert, Identify } from '@imagez/imagemagick';
import * as assert from 'assert';
import { MIME_TYPE, SUPPORT_MIME } from './const';

export default class ImageZ {
    private readonly file: ReadStream;
    private readonly ready: Promise<void>;

    public info: Identify;
    public colorNum: string;

    constructor(file: ReadStream) {
        this.file = file;

        this.ready = this.init();
    }

    get path() {
        return this.file.path;
    }

    get quality(): number {
        if (this.info.mimeType !== MIME_TYPE.JPEG) {
            return 0;
        }
        return this.info.quality;
    }

    get isAlpha(): boolean {
        if (this.info.mimeType !== MIME_TYPE.PNG) {
            return false;
        }

        return !!this.info.channelDepth.alpha;
    }

    get isPNG8(): boolean {
        if (this.info.mimeType !== MIME_TYPE.PNG) {
            return false;
        }
        return this.info.type && this.info.type === 'Palette';
    }

    private async init() {
        const info = this.info = await identify(this.file);

        assert(SUPPORT_MIME.includes(info.mimeType as any), 'Unsupported file type');

        this.colorNum = await identify(this.file, '%k');
    }

    public async toPNG8() {

    }

    public async toWEBP() {

    }

    public async resize() {

    }

    public async crop() {

    }
}
