import { LightningElement, track } from 'lwc';
import loginUser from '@salesforce/apex/UserLoginController.loginUser';

export default class UserLogin extends LightningElement {
    @track email = '';
    @track password = '';
    @track message = '';
    @track welcomeMessage = '';

    handleChange(event) {
        this[event.target.name] = event.target.value;
    }

    handleLogin() {
        loginUser({ email: this.email, password: this.password })
            .then(user => {
                this.message = '';
                this.welcomeMessage = `Welcome, ${user.Full_Name__c} (${user.Role__c})!`;
            })
            .catch(error => {
                this.welcomeMessage = '';
                this.message = error.body.message || 'Login failed';
            });
    }
}
