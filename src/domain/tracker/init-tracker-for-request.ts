import { ITrackerRepository } from '@domain/tracker/tracker.repository';

export type InitTrackerForRequest = (userId?: number) => ITrackerRepository;
