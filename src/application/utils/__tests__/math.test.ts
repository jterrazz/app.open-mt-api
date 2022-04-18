import { generateRandomId } from '@application/utils/math';

describe('math', () => {
    describe('generateRandomId()', () => {
        test('returns random IDs', async () => {
            // Given
            const results = [
                generateRandomId(),
                generateRandomId(),
                generateRandomId(),
            ];

            // When

            // Then
            expect(results[0] === results[1]).toBeFalsy();
            expect(results[1] === results[2]).toBeFalsy();
        });
    });
});
