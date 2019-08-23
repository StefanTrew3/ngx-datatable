import { NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
export declare class VisibilityService {
    private readonly zone;
    private readonly intersectionObserverSupported;
    private readonly observersMap;
    constructor(zone: NgZone);
    observe(element: HTMLElement): Observable<boolean>;
    unobserve(element: HTMLElement): void;
}
export interface IVisibilityObserver {
    visibilityChange: Subject<boolean>;
    start(): void;
    stop(): void;
}
export declare class IntersectionVisibilityObserver implements IVisibilityObserver {
    private readonly element;
    private readonly zone;
    readonly visibilityChange: Subject<boolean>;
    private intersectionObserver;
    constructor(element: HTMLElement, zone: NgZone);
    start(): void;
    stop(): void;
    private onIntersectionChanged;
}
export declare class OffsetCalculationVisibilityObserver implements IVisibilityObserver {
    private readonly element;
    private readonly zone;
    visibilityChange: Subject<boolean>;
    private timeout;
    constructor(element: HTMLElement, zone: NgZone);
    start(): void;
    stop(): void;
    private runCheck;
    private onVisibilityChange;
}
