export const COMPRESS_MAP = {
    61: 10,
    62: 10,
    63: 10,
    64: 10,
    65: 10,
    66: 10,
    67: 20,
    68: 20,
    69: 30,
    70: 30,
    71: 30,
    72: 40,
    73: 40,
    74: 40,
    75: 40,
    76: 40,
    77: 40,
    78: 40,
    79: 40,
    80: 40,
    81: 40,
    82: 50,
    83: 50,
    84: 55,
    85: 55,
    86: 60,
    87: 60,
    88: 65,
    89: 65,
    90: 65,
    91: 70,
    92: 70,
    93: 75,
    94: 80,
    95: 85,
    96: 85,
    97: 90,
    98: 95,
    99: 99,
    100: 99,
};

export enum MIME_TYPE {
    PNG = 'image/png',
    JPEG = 'image/jpeg',
    GIF = 'image/gif'
}

export const SUPPORT_MIME = [
    MIME_TYPE.PNG,
    MIME_TYPE.JPEG,
    MIME_TYPE.GIF,
];

const MIME_TYPE_EXT_MAP = {
    [MIME_TYPE.PNG]: '.png',
    [MIME_TYPE.JPEG]: '.jpg',
    [MIME_TYPE.GIF]: '.gif',
};
