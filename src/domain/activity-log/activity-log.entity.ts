export class ActivityLogEntity {
    activity: string;
    userId: string;
    timestamp: Date;

    constructor(activity: string, userId: string, timestamp: Date) {
        this.activity = activity;
        this.userId = userId;
        this.timestamp = timestamp;
    }
}
