import * as Stream from 'node:stream';

import { describe, expectTypeOf, it } from 'vitest';

import * as Ammo from '../src/index.js';

describe('typings', () => {
    describe('header()', () => {
        it('returns ranges or null', () => {
            expectTypeOf(Ammo.header('bytes=2-9', 10)).toEqualTypeOf<Ammo.Range[] | null>();
        });

        it('invalid calls rejected', () => {
            // @ts-expect-error header and length are required
            Ammo.header();
            // @ts-expect-error header must be a string
            Ammo.header({}, 45);
            // @ts-expect-error length is required
            Ammo.header('x');
        });
    });

    describe('Clip', () => {
        it('is a transform stream', () => {
            expectTypeOf(new Ammo.Clip({ from: 2, to: 9 })).toExtend<Stream.Transform>();
        });

        it('invalid calls rejected', () => {
            try {
                // @ts-expect-error range is required
                new Ammo.Clip();
            } catch {}

            try {
                // @ts-expect-error range.to must be a number
                new Ammo.Clip({ from: 0, to: 'a' });
            } catch {}
        });
    });

    describe('Range', () => {
        it('has readonly bounds', () => {
            const range: Ammo.Range = { from: 0, to: 1 };

            expectTypeOf(range.from).toBeNumber();
            expectTypeOf(range.to).toBeNumber();

            // @ts-expect-error from is readonly
            range.from = 1;
        });
    });
});
