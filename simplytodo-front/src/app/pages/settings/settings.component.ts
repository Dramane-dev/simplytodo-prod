import { Component, OnDestroy, OnInit } from '@angular/core';
import { TUser } from 'src/app/types/TUser';
import { StorageService } from 'src/app/services/storage/storage.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
    public fileUrl: string = '../../../assets/images/user-image.png';
    public currentUser: TUser | null = null;
    public subscriptions: Subscription = new Subscription();
    public mobilePhoneMode: boolean = false;

    constructor(
        private _storageService: StorageService,
        private _responsive: BreakpointObserver
    ) {}

    ngOnInit(): void {
        let userHaveAnImage: boolean = this.checkUserImage();

        this.subscriptions.add(
            this._responsive.observe([Breakpoints.Small, Breakpoints.XSmall])
             .subscribe(result => {
                 if (result.matches) {
                    this.mobilePhoneMode = true;
                } else {
                    this.mobilePhoneMode = false;
                }
             })
        );

        if (userHaveAnImage) {
            this.getUserImageFromStorage()
                .then((imageUrl) => {
                    this.fileUrl = imageUrl;
                })
                .catch((error) => {
                    this.fileUrl = '';
                });
        }

        this._storageService
            .getFromLocalStorage('userInformations')
            .then((user) => {
                this.currentUser = JSON.parse(user);
            })
            .catch((error) => {
                this.currentUser = null;
            });
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0];

        if (file) {
            let reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e: any) => {
                let { result } = e.target;
                this.fileUrl = result;
                this._storageService.saveFromLocalStorage('user-profile-image', this.fileUrl);
            };
        }
    }

    checkUserImage(): boolean {
        return this._storageService.getFromLocalStorage('user-profile-image') !== null;
    }

    async getUserImageFromStorage(): Promise<string> {
        return (await this._storageService.getFromLocalStorage('user-profile-image')) as string;
    }

    deleteUserImageFromStorage(): void {
        this._storageService.removeFromLocalStorage('user-profile-image');
        this.resetUserImage();
    }

    resetUserImage(): void {
        this.fileUrl = '../../../assets/images/user-image.png';
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
