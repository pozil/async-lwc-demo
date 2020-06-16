public with sharing class SampleController {
    @AuraEnabled(Cacheable=true)
    public static String getData() {
        return 'Some data';
    }
}
