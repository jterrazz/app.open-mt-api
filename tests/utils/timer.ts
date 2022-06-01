export const useFakeTimers = () => {
    jest.useFakeTimers().setSystemTime(
        new Date('2000-01-01T00:00:00.000Z').getTime(),
    );
};

export const useRealTimers = () => {
    jest.useRealTimers();
};
