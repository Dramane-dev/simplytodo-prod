import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TUser } from 'src/app/types/TUser';
import { StorageService } from 'src/app/services/storage/storage.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';

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
    public userInformationsForm: FormGroup = new FormGroup({
        lastname: new FormControl(""),
        firstname: new FormControl(""),
        email: new FormControl(
            "",
            Validators.compose([Validators.required, Validators.email])
        ),
        password: new FormControl(
            "",
            Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(16)])
        ),
        confirmedPassword: new FormControl("", Validators.required),
        bio: new FormControl("")
    });

    constructor(
        private _storageService: StorageService,
        private _responsive: BreakpointObserver,
        private _notifierService: NotifierService
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

    updateUserInformations(): void {
        if (this.userInformationsForm.valid) {

        } else {
            this._notifierService.notify("error", "Une information semble être manquante...");
        }
        console.log("update user informations");
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
