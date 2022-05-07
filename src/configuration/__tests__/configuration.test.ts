import { configurationFactory } from '@configuration/configuration';

describe('configuration', () => {
    test('throws when a required variable is missing', async () => {
        // Given
        const nodeEnv = null;

        // When
        // @ts-ignore
        const ft = () => configurationFactory(nodeEnv);

        // Then
        expect(ft).toThrow();
    });

    test('returns application configuration', async () => {
        // When
        const result = configurationFactory();

        // Then
        expect(result).toBeDefined();
    });

    test('throws if mixpanel variable is not set in production', async () => {
        // Given
        // TODO
        // When
        // Then
    });
});
