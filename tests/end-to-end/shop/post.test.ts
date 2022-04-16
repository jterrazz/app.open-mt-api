import { createEndToEndApplication } from '@tests/end-to-end/create-end-to-end-application';
import { useFakeTimers, useRealTimers } from '@application/utils/node/timer';
import request from 'supertest';

const { app } = createEndToEndApplication();

beforeAll(() => {
    useFakeTimers();
});

afterAll(() => {
    useRealTimers();
});

describe('END TO END - POST /shop', function () {
    // test('creates a new shop', async () => {
    //     // Given
    //     const params = {
    //         handle: 'the_new_shop_handle',
    //         name: 'the_new_shop_name',
    //     };
    //
    //     // When
    //     const response = await request(app.callback())
    //         .post('/shop')
    //         .send(params);
    //
    //     // Then
    //     expect(response.status).toEqual(200);
    //     expect(response.body).toEqual({
    //         handle: 'the_new_shop_handle',
    //         name: 'the_new_shop_name',
    //     });
    //     expect(response.headers['content-type']).toContain('json');
    // });

    test('does not create a new shop if user is not authenticated', async () => {
        // Given
        const params = {
            handle: 'the_new_shop_handle',
            name: 'the_new_shop_name',
        };

        // When
        const response = await request(app.callback())
            .post('/shop')
            .send(params);

        // Then
        expect(response.status).toEqual(403);
    });

    // test('does not create a duplicated shop', async () => {
    //     // Given
    //     const params = {
    //         handle: 'the_duplicated_shop_handle',
    //         name: 'the_duplicated_shop_name',
    //     };
    //
    //     // When
    //     await request(app.callback()).post('/shop').send(params);
    //     const secondResponse = await request(app.callback())
    //         .post('/shop')
    //         .send(params);
    //
    //     // Then
    //     expect(secondResponse.status).toEqual(422);
    //     expect(secondResponse.body).toEqual({
    //         message: "bad fields [ 'handle' ]",
    //         meta: {
    //             fields: ['handle'],
    //         },
    //     });
    // });
    //
    // test('does not create a shop that is missing required information', async () => {
    //     // Given
    //     const params = {
    //         handle: 'the_shop_handle_missing_name',
    //     };
    //
    //     // When
    //     await request(app.callback()).post('/shop').send(params);
    //     const secondResponse = await request(app.callback())
    //         .post('/shop')
    //         .send(params);
    //
    //     // Then
    //     expect(secondResponse.status).toEqual(422);
    //     expect(secondResponse.body).toEqual({
    //         message: "bad fields [ 'name' ]",
    //         meta: {
    //             fields: ['name'],
    //         },
    //     });
    // });
});
