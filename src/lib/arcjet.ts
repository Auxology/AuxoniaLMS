import arcjet from '@arcjet/next';
import { shield } from '@arcjet/next';
import { env } from '@/env';

export default arcjet({
    key: env.ARCJET_KEY,

    characteristics: ['fingerprint'],

    rules: [
        shield({
            mode: 'LIVE',
        }),
    ],
});
