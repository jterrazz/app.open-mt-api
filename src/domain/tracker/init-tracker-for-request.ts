import { ITrackerRepository } from '@domain/tracker/tracker-repository';

export type InitTrackerForRequest = (userId?: number) => ITrackerRepository;

export const initTrackerForRequestFactory = (
    trackerRepository: ITrackerRepository,
): InitTrackerForRequest => {
    return (userId) => {
        trackerRepository.start();

        return trackerRepository;
    };
};
