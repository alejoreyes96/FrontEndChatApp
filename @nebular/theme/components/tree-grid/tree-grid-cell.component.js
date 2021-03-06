/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, takeWhile } from 'rxjs/operators';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NB_WINDOW } from '../../theme.options';
import { NbCdkCell, NbCdkFooterCell, NbCellDirective, NbFooterCellDirective, NbHeaderCellDirective, NbCdkHeaderCell, } from '../cdk/table';
import { NB_TREE_GRID } from './tree-grid-injection-tokens';
import { NbTreeGridColumnDefDirective } from './tree-grid-column-def.directive';
import { NB_DEFAULT_ROW_LEVEL } from './data-source/tree-grid.model';
import { NbColumnsService } from './tree-grid-columns.service';
var NbTreeGridCellDirective = /** @class */ (function (_super) {
    __extends(NbTreeGridCellDirective, _super);
    function NbTreeGridCellDirective(columnDef, elementRef, tree, platformId, window, sanitizer, directionService, columnService, cd) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.platformId = platformId;
        _this.window = window;
        _this.sanitizer = sanitizer;
        _this.directionService = directionService;
        _this.columnService = columnService;
        _this.cd = cd;
        _this.alive = true;
        _this.initialLeftPadding = '';
        _this.initialRightPadding = '';
        _this.tree = tree;
        _this.columnDef = columnDef;
        _this.elementRef = elementRef;
        return _this;
    }
    NbTreeGridCellDirective_1 = NbTreeGridCellDirective;
    Object.defineProperty(NbTreeGridCellDirective.prototype, "columnWidth", {
        get: function () {
            this.latestWidth = this.tree.getColumnWidth();
            return this.latestWidth || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTreeGridCellDirective.prototype, "leftPadding", {
        get: function () {
            if (this.directionService.isLtr()) {
                return this.getStartPadding();
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTreeGridCellDirective.prototype, "rightPadding", {
        get: function () {
            if (this.directionService.isRtl()) {
                return this.getStartPadding();
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            var style = this.window.getComputedStyle(this.elementRef.nativeElement);
            this.initialLeftPadding = style.paddingLeft;
            this.initialRightPadding = style.paddingRight;
        }
        this.columnService.onColumnsChange()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.latestWidth !== _this.tree.getColumnWidth(); }))
            .subscribe(function () { return _this.cd.detectChanges(); });
    };
    NbTreeGridCellDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbTreeGridCellDirective.prototype.toggleRow = function () {
        this.tree.toggleCellRow(this);
    };
    Object.defineProperty(NbTreeGridCellDirective.prototype, "initialStartPadding", {
        get: function () {
            return this.directionService.isLtr()
                ? this.initialLeftPadding
                : this.initialRightPadding;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridCellDirective.prototype.getStartPadding = function () {
        var rowLevel = this.tree.getCellLevel(this, this.columnDef.name);
        if (rowLevel === NB_DEFAULT_ROW_LEVEL) {
            return null;
        }
        var nestingLevel = rowLevel + 1;
        var padding = '';
        if (this.tree.levelPadding) {
            padding = "calc(" + this.tree.levelPadding + " * " + nestingLevel + ")";
        }
        else if (this.initialStartPadding) {
            padding = "calc(" + this.initialStartPadding + " * " + nestingLevel + ")";
        }
        if (!padding) {
            return null;
        }
        return this.sanitizer.bypassSecurityTrustStyle(padding);
    };
    var NbTreeGridCellDirective_1;
    __decorate([
        HostBinding('style.width'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NbTreeGridCellDirective.prototype, "columnWidth", null);
    __decorate([
        HostBinding('style.padding-left'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbTreeGridCellDirective.prototype, "leftPadding", null);
    __decorate([
        HostBinding('style.padding-right'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbTreeGridCellDirective.prototype, "rightPadding", null);
    NbTreeGridCellDirective = NbTreeGridCellDirective_1 = __decorate([
        Directive({
            selector: 'td[nbTreeGridCell]',
            host: {
                'class': 'nb-tree-grid-cell',
                'role': 'gridcell',
            },
            providers: [{ provide: NbCdkCell, useExisting: NbTreeGridCellDirective_1 }],
        }),
        __param(2, Inject(NB_TREE_GRID)),
        __param(3, Inject(PLATFORM_ID)),
        __param(4, Inject(NB_WINDOW)),
        __metadata("design:paramtypes", [NbTreeGridColumnDefDirective,
            ElementRef, Object, Object, Object, DomSanitizer,
            NbLayoutDirectionService,
            NbColumnsService,
            ChangeDetectorRef])
    ], NbTreeGridCellDirective);
    return NbTreeGridCellDirective;
}(NbCellDirective));
export { NbTreeGridCellDirective };
var NbTreeGridHeaderCellDirective = /** @class */ (function (_super) {
    __extends(NbTreeGridHeaderCellDirective, _super);
    function NbTreeGridHeaderCellDirective(columnDef, elementRef, tree, columnService, cd) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnService = columnService;
        _this.cd = cd;
        _this.alive = true;
        _this.tree = tree;
        return _this;
    }
    NbTreeGridHeaderCellDirective_1 = NbTreeGridHeaderCellDirective;
    Object.defineProperty(NbTreeGridHeaderCellDirective.prototype, "columnWidth", {
        get: function () {
            this.latestWidth = this.tree.getColumnWidth();
            return this.latestWidth || null;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridHeaderCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.columnService.onColumnsChange()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.latestWidth !== _this.tree.getColumnWidth(); }))
            .subscribe(function () { return _this.cd.detectChanges(); });
    };
    NbTreeGridHeaderCellDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    var NbTreeGridHeaderCellDirective_1;
    __decorate([
        HostBinding('style.width'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NbTreeGridHeaderCellDirective.prototype, "columnWidth", null);
    NbTreeGridHeaderCellDirective = NbTreeGridHeaderCellDirective_1 = __decorate([
        Directive({
            selector: 'th[nbTreeGridHeaderCell]',
            host: {
                'class': 'nb-tree-grid-header-cell',
                'role': 'columnheader',
            },
            providers: [{ provide: NbCdkHeaderCell, useExisting: NbTreeGridHeaderCellDirective_1 }],
        }),
        __param(2, Inject(NB_TREE_GRID)),
        __metadata("design:paramtypes", [NbTreeGridColumnDefDirective,
            ElementRef, Object, NbColumnsService,
            ChangeDetectorRef])
    ], NbTreeGridHeaderCellDirective);
    return NbTreeGridHeaderCellDirective;
}(NbHeaderCellDirective));
export { NbTreeGridHeaderCellDirective };
var NbTreeGridFooterCellDirective = /** @class */ (function (_super) {
    __extends(NbTreeGridFooterCellDirective, _super);
    function NbTreeGridFooterCellDirective(columnDef, elementRef, tree, columnService, cd) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnService = columnService;
        _this.cd = cd;
        _this.alive = true;
        _this.tree = tree;
        return _this;
    }
    NbTreeGridFooterCellDirective_1 = NbTreeGridFooterCellDirective;
    Object.defineProperty(NbTreeGridFooterCellDirective.prototype, "columnWidth", {
        get: function () {
            this.latestWidth = this.tree.getColumnWidth();
            return this.latestWidth || null;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridFooterCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.columnService.onColumnsChange()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.latestWidth !== _this.tree.getColumnWidth(); }))
            .subscribe(function () { return _this.cd.detectChanges(); });
    };
    NbTreeGridFooterCellDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    var NbTreeGridFooterCellDirective_1;
    __decorate([
        HostBinding('style.width'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NbTreeGridFooterCellDirective.prototype, "columnWidth", null);
    NbTreeGridFooterCellDirective = NbTreeGridFooterCellDirective_1 = __decorate([
        Directive({
            selector: 'td[nbTreeGridFooterCell]',
            host: {
                'class': 'nb-tree-grid-footer-cell',
                'role': 'gridcell',
            },
            providers: [{ provide: NbCdkFooterCell, useExisting: NbTreeGridFooterCellDirective_1 }],
        }),
        __param(2, Inject(NB_TREE_GRID)),
        __metadata("design:paramtypes", [NbTreeGridColumnDefDirective,
            ElementRef, Object, NbColumnsService,
            ChangeDetectorRef])
    ], NbTreeGridFooterCellDirective);
    return NbTreeGridFooterCellDirective;
}(NbFooterCellDirective));
export { NbTreeGridFooterCellDirective };
//# sourceMappingURL=tree-grid-cell.component.js.map