/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { NbSharedModule } from '../shared/shared.module';
import { NbOverlayModule } from '../cdk';
import { NbIconModule } from '../icon/icon.module';
import { NbTooltipComponent } from './tooltip.component';
import { NbTooltipDirective } from './tooltip.directive';
var NbTooltipModule = /** @class */ (function () {
    function NbTooltipModule() {
    }
    NbTooltipModule = __decorate([
        NgModule({
            imports: [NbSharedModule, NbOverlayModule, NbIconModule],
            declarations: [NbTooltipComponent, NbTooltipDirective],
            exports: [NbTooltipDirective],
            entryComponents: [NbTooltipComponent],
        })
    ], NbTooltipModule);
    return NbTooltipModule;
}());
export { NbTooltipModule };
//# sourceMappingURL=tooltip.module.js.map