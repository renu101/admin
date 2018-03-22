import { Subscription } from 'rxjs/Subscription';
import { TemplateRef, Type, ChangeDetectorRef } from '@angular/core';
export declare class BusyConfig implements IBusyConfig {
    template: TemplateRef<any> | Type<any>;
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
    constructor(config?: IBusyConfig);
}
export declare class DefaultBusyComponent {
    private msg;
    private _changeDetectionRef;
    private _msg;
    constructor(msg: string, _changeDetectionRef: ChangeDetectorRef);
    message: string;
}
export interface IBusyConfig {
    template?: TemplateRef<any> | Type<any>;
    delay?: number;
    minDuration?: number;
    backdrop?: boolean;
    message?: string;
    wrapperClass?: string;
    busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>;
}
export declare const BUSY_CONFIG_DEFAULTS: {
    template: typeof DefaultBusyComponent;
    delay: number;
    minDuration: number;
    backdrop: boolean;
    message: string;
    wrapperClass: string;
};
