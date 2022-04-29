import { trackerRepositoryInMemoryFactory } from '@infrastructure/repositories/tracker.repository-in-memory';

describe('trackerRepositoryInMemory', function () {
    it('should track events', function () {
        // Given
        const tracker = trackerRepositoryInMemoryFactory();

        // When
        jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
        tracker.start();
        jest.setSystemTime(new Date('2020-01-02'));
        tracker.requestedGetApiState();
        jest.setSystemTime(new Date('2020-01-03'));
        tracker.stop();
        jest.useRealTimers();

        // Then
        const result = tracker.exportEvents();
        expect(result).toEqual([
            { date: new Date('2020-01-01'), event: 'start' },
            { date: new Date('2020-01-02'), event: 'requested_get_api_state' },
            { date: new Date('2020-01-03'), event: 'stop' },
        ]);
    });
});
