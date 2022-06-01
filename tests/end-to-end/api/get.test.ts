import { createEndToEndApplication } from '../../utils/create-end-to-end-application';
import { useFakeTimers, useRealTimers } from '@tests/utils/timer';
import request from 'supertest';

const endToEndApplication = createEndToEndApplication();

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('END TO END - GET /api', function () {
    test('returns the API status', async () => {
        // When
        const response = await request(endToEndApplication.app.callback()).get(
            '/',
        );

        // Then
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            env: 'test',
            state: 'UP',
            time: '2000-01-01T00:00:00.000Z',
            version: '1.0.0',
        });
        expect(response.headers['content-type']).toContain('json');
    });

    test('returns global API headers', async () => {
        // When
        const response = await request(endToEndApplication.app.callback()).get(
            '/',
        );

        // Then
        expect(response.headers).toEqual(
            expect.objectContaining({
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                'api-version': require('../../../package.json').version,
            }),
        );
    });
});
