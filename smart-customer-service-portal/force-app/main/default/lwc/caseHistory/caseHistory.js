import { LightningElement, track } from 'lwc';
import getCasesByEmail from '@salesforce/apex/CaseController.getCasesByEmail';

export default class CaseHistory extends LightningElement {
    @track email = '';
    @track cases = [];
    @track error = '';

    columns = [
        { label: 'Case Number', fieldName: 'CaseNumber' },
        { label: 'Subject', fieldName: 'Subject' },
        { label: 'Status', fieldName: 'Status' },
        { label: 'Priority', fieldName: 'Priority' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
    ];

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    loadCases() {
        getCasesByEmail({ email: this.email })
            .then(result => {
                this.cases = result;
                this.error = '';
            })
            .catch(error => {
                this.error = 'Error loading cases: ' + error.body.message;
                this.cases = [];
            });
    }
}
