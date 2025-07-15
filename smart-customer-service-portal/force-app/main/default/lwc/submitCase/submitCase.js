import { LightningElement, track } from 'lwc';
import createCase from '@salesforce/apex/CaseController.createCase';

export default class SubmitCase extends LightningElement {
    @track email = '';
    @track subject = '';
    @track description = '';
    @track successMessage = '';
    @track errorMessage = '';

    handleInput(event) {
        const field = event.target.label.toLowerCase();
        if (field.includes('email')) this.email = event.target.value;
        if (field.includes('subject')) this.subject = event.target.value;
        if (field.includes('description')) this.description = event.target.value;
    }

    handleSubmit() {
        createCase({ subject: this.subject, description: this.description, email: this.email })
            .then(caseNumber => {
                this.successMessage = `Case #${caseNumber} submitted successfully!`;
                this.errorMessage = '';
                this.subject = '';
                this.description = '';
            })
            .catch(error => {
                this.errorMessage = 'Error creating case: ' + error.body.message;
                this.successMessage = '';
            });
    }
}
