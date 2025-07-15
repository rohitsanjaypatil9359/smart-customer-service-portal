public with sharing class UserProfileController {
    
    @AuraEnabled
    public static String createUserProfile(String fullName, String email, String password, String role) {
        try {
            UserProfile__c newUser = new UserProfile__c();
            newUser.Full_Name__c = fullName;
            newUser.Email__c = email;
            newUser.Password__c = password;
            newUser.Role__c = role;

            insert newUser;
            return 'Success';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}
