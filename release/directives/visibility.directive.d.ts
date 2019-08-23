import { EventEmitter, ElementRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { VisibilityService } from '../services';
import { Subscription } from 'rxjs';
/**
 * Visibility Observer Directive
 *
 * Usage:
 *
 * 		<div
 * 			visibilityObserver
 * 			(visible)="onVisible($event)">
 * 		</div>
 *
 */
export declare class VisibilityDirective implements OnInit, OnDestroy {
    private element;
    private zone;
    private readonly visibilityService;
    isVisible: boolean;
    visible: EventEmitter<any>;
    visibleSubscription: Subscription;
    constructor(element: ElementRef, zone: NgZone, visibilityService: VisibilityService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
