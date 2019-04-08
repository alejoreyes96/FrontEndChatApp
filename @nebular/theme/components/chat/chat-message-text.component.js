/**
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * Chat message component.
 *
 * @styles
 *
 */
var NbChatMessageTextComponent = /** @class */ (function () {
    function NbChatMessageTextComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbChatMessageTextComponent.prototype, "sender", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbChatMessageTextComponent.prototype, "message", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Date)
    ], NbChatMessageTextComponent.prototype, "date", void 0);
    NbChatMessageTextComponent = __decorate([
        Component({
            selector: 'nb-chat-message-text',
            template: "\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\"><style> .fa {font-size: 30px; cursor: pointer;user-select: none;}.fa:hover {color: darkblue;}</style>  <p class=\"sender\" *ngIf=\"sender || date\">{{ sender }} <time>{{ date  | date:'shortTime' }}</time></p>\n    <p class=\"text\" *ngIf=\"message\"> {{ message }}</p> <p class=\"sender\"><i class=\"fa fa-thumbs-up\"></i> &nbsp; &nbsp;   <i class=\"fa fa-thumbs-down\"></i></p>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
    ], NbChatMessageTextComponent);
    return NbChatMessageTextComponent;
}());
export { NbChatMessageTextComponent };
//# sourceMappingURL=chat-message-text.component.js.map