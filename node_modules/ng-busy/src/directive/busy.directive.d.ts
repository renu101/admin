import { DoCheck, ViewContainerRef, ComponentFactoryResolver, Injector, Renderer2, TemplateRef, ElementRef, Type, ApplicationRef, EventEmitter } from '@angular/core';
import { TrackerService } from '../service/tracker.service';
import { BusyService } from '../service/busy.service';
/**
 * ### Syntax
 *
 * - `<div [ngBusy]="busy">...</div>`
 * - `<div [ngBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [ngBusy]="{busy: busy, message: 'Loading...', backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
export declare class BusyDirective implements DoCheck {
    private service;
    private tracker;
    private resolver;
    private vcr;
    private element;
    private injector;
    private appRef;
    private renderer;
    options: any;
    busyStart: EventEmitter<{}>;
    busyStop: EventEmitter<{}>;
    private optionsRecord;
    private optionsNorm;
    private busyRef;
    private backdropRef;
    private componentViewRef;
    backdrop: boolean;
    template: TemplateRef<any> | Type<any>;
    constructor(service: BusyService, tracker: TrackerService, resolver: ComponentFactoryResolver, vcr: ViewContainerRef, element: ElementRef, injector: Injector, appRef: ApplicationRef, renderer: Renderer2);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private normalizeOptions(options);
    private dectectOptionsChange();
    private destroyComponents();
    private createBackdrop();
    private createBusy();
    private generateNgContent(injector);
}
