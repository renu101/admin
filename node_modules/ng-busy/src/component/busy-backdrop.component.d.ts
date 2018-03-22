import { TrackerService } from '../service/tracker.service';
export declare class BusyBackdropComponent {
    private tracker;
    constructor(tracker: TrackerService);
    isActive(): boolean;
}
