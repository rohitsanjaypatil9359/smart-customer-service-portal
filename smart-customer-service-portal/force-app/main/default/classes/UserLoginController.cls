public with sharing class UserLoginController {
    
    @AuraEnabled
    public static UserProfile__c loginUser(String email, String password) {
        List<UserProfile__c> users = [
            SELECT Id, Full_Name__c, Email__c, Password__c, Role__c
            FROM UserProfile__c
            WHERE Email__c = :email
            LIMIT 1
        ];
        
        if (!users.isEmpty()) {
            UserProfile__c user = users[0];
            if (user.Password__c == password) {
                return user;
            } else {
                throw new AuraHandledException('Invalid password');
            }
        } else {
            throw new AuraHandledException('User not found');
        }
    }
}
