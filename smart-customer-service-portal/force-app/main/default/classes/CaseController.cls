public with sharing class CaseController {

    // Method to create a new case
    @AuraEnabled
    public static String createCase(String subject, String description, String email) {
        try {
            Case newCase = new Case(
                Subject = subject,
                Description = description,
                SuppliedEmail = email,
                Origin = 'Web',
                Status = 'New',
                Priority = 'Medium'
            );
            insert newCase;
            return newCase.CaseNumber;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating case: ' + e.getMessage());
        }
    }

    // Method to fetch cases submitted by a user based on email
    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesByEmail(String email) {
        try {
            return [
                SELECT Id, CaseNumber, Subject, Status, Priority, CreatedDate
                FROM Case
                WHERE SuppliedEmail = :email
                ORDER BY CreatedDate DESC
            ];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving cases: ' + e.getMessage());
        }
    }
}
