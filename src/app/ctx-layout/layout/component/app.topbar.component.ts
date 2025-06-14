import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {MenuItem} from 'primeng/api';
import {StyleClassModule} from 'primeng/styleclass';

import {AppConfigurator} from './app.configurator.component';
import {LayoutService} from '../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                @if (layoutService.isDarkTheme()) {
                    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 67" width="800" height="50">
                        <title>Dark Mode Logo</title>
                        <defs>
                            <image
                                width="61"
                                height="51"
                                id="img1"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAzCAMAAAATtvCrAAAAAXNSR0IB2cksfwAAAg1QTFRFBwUDJiQiVVNSZGNiRUNCFxUTc3JxwcDA7+/v////0dDQk5KRJiUjoqKhoqGh4ODfNTQy4ODgZGNhg4KBRURCycnJ0NDQNjQywMDBAQEBenp6amppAwMClJOTIyIjRURE2trawcDBAwECAgEAwMDAoKGgAwEBAwICs7OzBAMBAwIBAgICQUFBoqGgAgEBoaGhYWFgAgIASEhINTQ0ysnKYWBgAgIBw8PDBQQEDAsL2dnZY2JiS0pKYmFgRkVFBAMDW1xcBAMCysrKoaGgzMzMBAQDVFNUbW1uAQIAXFtaRkZECgsK0tLSPDw8XV1dwcHBY2NiQ0REubq5BAID6enpBAECDQwMqqqpOzs6bW1tfHx7LC0skZGREhER39/fIiIhAwMDk5SU+Pj4NDQ0AQECampqAwEADg0Nm5qaAgECGhsbJCMiEhIRioqKVFNTJSQjfn5+aWlqHBsbQkFB09PTkpKRBAIBAwIAiouKLCsrMjIy6enoAQEAqampubm5IiIipqamDQwLBAICIyMiLi0tZmZlCwwLjI2M2tnZVlZVDgwLPDs7ra2t+Pn4ZGRkAgMCLCsqQkJBHBwaAwMBExMTlJOUw8PCAgQCS0tKGxsbNTU1wsLCWFdWIyMjurm5AgMDurq6sbGwSkpLgICAkJCRW1tbVFRUQUJDenp7wcHAdHNx0dHQc3Nxg4OBVVRSI2hETwAAAK90Uk5TALr///8A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5W/nuYAAANNSURBVHicndZ9SBNhGADw99naaftwNl0tNbQUhyT+UVmWWAbRB0ImKbmwzArSkIoogqgg8J+okArDysQ+RCs0k4Q+CaSUgpCQpDQrCLVsan5sTuftutvd7t47T93u+WfP3vd+e573vvYCkgQASId8QanALTkY/6KBWSz3205KXuthalbJhYcUDuN1iFv2WNkghiU6FFz+a0o7KNIm5+zrlYZ2ANOm8YAsz706dCJQjBA5yWm9JoA186Gzs9rg15WSBuF0M3qeRgn2Lp3WQSplmiLdoLg0UxwUrpoJYhjQAvaEU4Yx8ZxhZM4byAWLRtjMCDCEz5jAIbqO4fTj90eiSVATbGahZ3uEiSiAflxHMw9vt0THQZiTq73Qoe8UJqxA/sJ1gkPvQvM/i7UBfE8mXRvXiVOaLkwnMaXt5o9iTWDa6MH0qjHHX0wnA7w3LO+NbJ1Jm92mFqzzUR3WeaqbIFtRWk9Us3+1rZauQUGntye9QWjt76XweiYtWreodrAFIt7Rn5u+x76U15vbIQbv3IMEvaXT+oz53AZfEprkNfFNtG4QznmGqiu+0Ztltq1okNWeGK1YDw/5dFZfRD2b7WxJHW+S1dGkqPPRMF/tHPpS17KpjU7vy2mLJr1bpIP6OL3OEz/gK5gPUAky2riYNGM6fcnblBo23d9hfO4bpg5+WFMhozN6+jNu8eO2F4nWm2x6qAX9HOUnCmtt/2qma3S4IWx9mW+8mF7gFTY9VpddKvR0HBozL8nok9W6rDvcE3yKxp/YtUbvfrr1oqDRyvTgEpiu0ZknaAfAeXoRydDxY+MFdvR0TcE5DKNIbWrsWV7rPL7xEriBIrbTVR/30o2fYAcv283lnbi2rS6Nf8XlBiDUwkxuylVEaAZ05FE4wg1dKysuRqIoa94ARWxaDuEOfEqf60oDuN7GD1TYjUVijW4DFLCZFjTqwP578dABerBPKWbe5+LWA4m4drrtYKWtuyhaPsxXWtr7//1orxJMTVBerWTjgdC9bG7foqR3FXOy2TNWlxcovpuDeB0wr8pzYzpAruLuEf5a1x/we9tFeSaRRCOkDvHLU9W5/CtBdJ+pKwvnslV7KGwzLb1Lw0c0y2akX2t3iffh/wH+hgpMn/jjHwAAAABJRU5ErkJggg=="
                            />
                        </defs>
                        <style></style>
                        <use id="Dark Mode Logo" href="#img1" x="21" y="9" />
                    </svg>
                } @else {
                    <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 67" width="800" height="50">
                        <title>Light Mode Logo</title>
                        <defs>
                            <image
                                width="61"
                                height="51"
                                id="img1"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAzCAMAAAATtvCrAAAAAXNSR0IB2cksfwAAAg1QTFRF+Pr82dvdqqytm5ydury96OrsjI2OPj8/EBAQAAAALi8vbG1u2drcXV1eXV5eHx8gysvNHx8fm5yefH1+uru9NjY2Ly8vycvNPz8+/v7+hYWFlZWW/Pz9a2xs3N3curu7JSUlPj8+/P79/f7/Pz8/X15f/P7+/P39TExM+/z+/P3+/f39vr6+XV5f/f7+Xl5enp6f/f3/t7e3ysvLNTY1np+f/f3+PDw8+vv78/T0JiYmnJ2dtLW1nZ6fubq6+/z8pKOj+/z9NTU1Xl5fMzMz+/v8q6yrkpKR/v3/o6Slubm79fT1LS0tw8PDoqKiPj4+nJydvLu7RkVG+/38FhYW+/798vPzVVVWxMTFkpKSg4OE09LTbm5u7e7uICAg3d3e/Pz8bGtrBwcHy8vL/v79lZWV/P7/8fLyZGVl/f795eTk29zd7e3udXV1q6ys2tvcgYGBlpaV4+Tkvb6+LCwsbW1u+/3+/P3/dXR109TUzc3NFhYX/v7/VlZWRkZG3d3dWVlZ8vP0+/393Nzd0dLSmZma9PP0c3JzJSYmqamq8fP0w8TEUlJSBwYHm5ub/fz909TVvb2+4+Pl/Pz+7Ozsa2xrPDw9/fv9tLS15OTkysrKPT09p6ip3NzcRUZG/fz8RUVFTk5PtbW0f39/b29upKSkq6urvr28hYWEPj4/i4yOLi4vjIyOfHx+qqutqSmY7wAAAK90Uk5TALr///8A/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////5W/nuYAAANNSURBVHicndZ9SBNhGADw99naaftwNl0tNbQUhyT+UVmWWAbRB0ImKbmwzArSkIoogqgg8J+okArDysQ+RCs0k4Q+CaSUgpCQpDQrCLVsan5sTuftutvd7t47T93u+WfP3vd+e573vvYCkgQASId8QanALTkY/6KBWSz3205KXuthalbJhYcUDuN1iFv2WNkghiU6FFz+a0o7KNIm5+zrlYZ2ANOm8YAsz706dCJQjBA5yWm9JoA186Gzs9rg15WSBuF0M3qeRgn2Lp3WQSplmiLdoLg0UxwUrpoJYhjQAvaEU4Yx8ZxhZM4byAWLRtjMCDCEz5jAIbqO4fTj90eiSVATbGahZ3uEiSiAflxHMw9vt0THQZiTq73Qoe8UJqxA/sJ1gkPvQvM/i7UBfE8mXRvXiVOaLkwnMaXt5o9iTWDa6MH0qjHHX0wnA7w3LO+NbJ1Jm92mFqzzUR3WeaqbIFtRWk9Us3+1rZauQUGntye9QWjt76XweiYtWreodrAFIt7Rn5u+x76U15vbIQbv3IMEvaXT+oz53AZfEprkNfFNtG4QznmGqiu+0Ztltq1okNWeGK1YDw/5dFZfRD2b7WxJHW+S1dGkqPPRMF/tHPpS17KpjU7vy2mLJr1bpIP6OL3OEz/gK5gPUAky2riYNGM6fcnblBo23d9hfO4bpg5+WFMhozN6+jNu8eO2F4nWm2x6qAX9HOUnCmtt/2qma3S4IWx9mW+8mF7gFTY9VpddKvR0HBozL8nok9W6rDvcE3yKxp/YtUbvfrr1oqDRyvTgEpiu0ZknaAfAeXoRydDxY+MFdvR0TcE5DKNIbWrsWV7rPL7xEriBIrbTVR/30o2fYAcv283lnbi2rS6Nf8XlBiDUwkxuylVEaAZ05FE4wg1dKysuRqIoa94ARWxaDuEOfEqf60oDuN7GD1TYjUVijW4DFLCZFjTqwP578dABerBPKWbe5+LWA4m4drrtYKWtuyhaPsxXWtr7//1orxJMTVBerWTjgdC9bG7foqR3FXOy2TNWlxcovpuDeB0wr8pzYzpAruLuEf5a1x/we9tFeSaRRCOkDvHLU9W5/CtBdJ+pKwvnslV7KGwzLb1Lw0c0y2akX2t3iffh/wH+hgpMn/jjHwAAAABJRU5ErkJggg=="
                            />
                        </defs>
                        <style></style>
                        <use id="Light Mode Logo copy" href="#img1" x="21" y="9" />
                    </svg>
                }
                <span>UniAlgo</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) { }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({...state, darkTheme: !state.darkTheme}));
    }
}
