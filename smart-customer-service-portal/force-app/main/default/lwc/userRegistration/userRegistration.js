import { LightningElement, track } from 'lwc';
import createUserProfile from '@salesforce/apex/UserProfileController.createUserProfile';

export default class UserRegistration extends LightningElement {
    @track fullName = '';
    @track email = '';
    @track password = '';
    @track role = '';
    @track message = '';

    get roleOptions() {
        return [
            { label: 'Customer', value: 'Customer' },
            { label: 'Agent', value: 'Agent' },
            { label: 'Admin', value: 'Admin' }
        ];
    }

    handleChange(event) {
        this[event.target.name] = event.target.value;
    }

    async handleRegister() {
        try {
            const result = await createUserProfile({ 
                fullName: this.fullName, 
                email: this.email, 
                password: this.password, 
                role: this.role 
            });
            this.message = result === 'Success' ? 'Registration successful!' : result;
        } catch (error) {
            this.message = 'Unexpected error: ' + error.body.message;
        }
    }
}
