// install image-magick for different platform

const os = require('os');

const platform = os.platform().toLowerCase();

if (!['darwin', 'win32'].includes(platform)) {
    console.error('@imagez/image-magick only support macOS/linux for now');
    process.exit(1);
}

const runner = require(`./${platform}.js`);

(async () => {
    const exist = await runner.exist();

    if (exist) {
        console.log('Find image-magick exist');
        return;
    }

    console.log('Install image-magick');

    await runner.install();

    console.log('Install image-magick success');
})().catch((e) => {
    console.error(`[image-magick] install failed: ${e.message || e}`);
});
