/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { InjectionToken } from '@angular/core';
import { NbToastStatus } from './model';
import { NbGlobalLogicalPosition } from '../cdk';
export var NB_TOASTR_CONFIG = new InjectionToken('Default toastr options');
/**
 * The `NbToastrConfig` class describes configuration of the `NbToastrService.show` and global toastr configuration.
 * */
var NbToastrConfig = /** @class */ (function () {
    function NbToastrConfig(config) {
        var _a;
        /**
         * Determines where on the screen toast have to be rendered.
         * */
        this.position = NbGlobalLogicalPosition.TOP_END;
        /**
         * Status chooses color scheme for the toast.
         * */
        this.status = NbToastStatus.PRIMARY;
        /**
         * Duration is timeout between toast appears and disappears.
         * */
        this.duration = 3000;
        /**
         * Destroy by click means you can hide the toast by clicking it.
         * */
        this.destroyByClick = true;
        /**
         * If preventDuplicates is true then the next toast with the same title and message will not be rendered.
         * */
        this.preventDuplicates = false;
        /**
         * Determines render icon or not.
         * */
        this.hasIcon = true;
        /**
         * Icon name that can be provided to render custom icon.
         * */
        this.icon = 'email';
        /**
         * Toast status icon-class mapping.
         * */
        this.icons = (_a = {},
            _a[NbToastStatus.DANGER] = 'flash-outline',
            _a[NbToastStatus.SUCCESS] = 'checkmark-outline',
            _a[NbToastStatus.INFO] = 'question-mark-outline',
            _a[NbToastStatus.WARNING] = 'alert-triangle-outline',
            _a[NbToastStatus.PRIMARY] = 'email-outline',
            _a);
        this.patchIcon(config);
        Object.assign(this, config);
    }
    NbToastrConfig.prototype.patchIcon = function (config) {
        if (!('icon' in config)) {
            config.icon = this.icons[config.status || NbToastStatus.PRIMARY];
            config.iconPack = 'nebular-essentials';
        }
    };
    return NbToastrConfig;
}());
export { NbToastrConfig };
//# sourceMappingURL=toastr-config.js.map