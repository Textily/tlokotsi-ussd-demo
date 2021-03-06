go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var MenuState = vumigo.states.MenuState;
    var Choice = vumigo.states.Choice;
    var ChoiceState = vumigo.states.ChoiceState;
    var EndState = vumigo.states.EndState;
    var FreeText = vumigo.states.FreeText;

    var GoApp = App.extend(function(self) {
        App.call(self, 'states:language');

        self.states.add('states:language', function(name) {
            return new MenuState(name, {
                question: 'Choose Language',

                choices: [
                    new Choice('states:main', 'English'),
                    new Choice('states:notsupported', 'Sesotho'),
                    new Choice('states:notsupported', 'Isizulu'),
                    new Choice('states:exit', 'Exit')],

            });
        });

        self.states.add('states:notsupported', function(name) {
            return new ChoiceState(name, {
                question: 'Sesotho & Isizulu menus are currently not active. Please user english version.',

                choices: [
                    new Choice('states:join', 'English'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:main', function(name) {
            return new ChoiceState(name, {
                question: 'TLHOLO - VICTORY',

                choices: [
                    new Choice('states:join', 'Join Tlholo'),
                    new Choice('states:covers', 'Covers'),
                    new Choice('states:status','Policy Status'),
                    new Choice('states:claim', 'Claim Documents'),
                    new Choice('states:rules', 'Motjha-O-Tjhele'),
                    new Choice('states:contact','Our Offices'),
                    new Choice('states:about', 'About Tlholo'),
                    new Choice('states:terms', 'T & C'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:join', function(name){
            return new FreeText(name,{
                question: 'Enter your name and Tlholo representative will call you back shortly:',
                next: function(content){

                    self.contact.extra.join = content;

                    return self.im.contacts.save(self.contact).then(function(){
                        return "states:exit";
                    });
                }
            });
        });

        self.states.add('states:status', function(name){
            return new ChoiceState(name,{
                question: 'Your policy is in good standing.',

                choices: [
                    new Choice('states:main', 'Main menu'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:covers', function(name){
            return new ChoiceState(name,{
                question: 'Types of Covers:',

                choices: [
                    new Choice('states:single_cover', 'Single Cover'),
                    new Choice('states:family_cover', 'Family Cover'),
                    new Choice('states:main', 'Main menu'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:single_cover', function(name){
            return new EndState(name,{
                text: 'Age: [18-64] cover[5000 - 20 000] premium[R80-R180]\nAge: [65-74] cover[5000 - 10 000] premium[R100-R170]\nAge: [75-84] cover[5000] premium[R190]',
                next: 'states:language'
            });
        });

        self.states.add('states:family_cover', function(name){
            return new EndState(name,{
                text: 'Our family covers premium\nranges from R80 to R280\ndepending on how many family\nmembers you would like to include\nConsultant will call you shortly',
                next: 'states:language'
            });
        });

        self.states.add('states:claim', function(name){
            return new EndState(name,{
                text: 'Required documents(certified) at claim stage:\nDeath Certificate\nDeaceased ID\nClaimant ID\nOne Month Bank Statement',
                next: 'states:language'
            });
        });

        self.states.add('states:rules', function(name){
            return new EndState(name,{
                text: 'Motjha-O-Tjhele premiums ranges between R200-R250\nThere are conditions for Motjha-O-Tjhele\nA consultant will call you shortly',
                next: 'states:language'
            });
        });

        self.states.add('states:contact', function(name){
            return new EndState(name,{
                text: 'Our Offices\nQwaqwa\nABSA Building\n071 908 2988\n\nBotshabelo\nReahola Complex\n083 669 5913\n\nBloemfontein\n154 Maitland Str\n\n083 669 5913',
                next: 'states:language'
            });
        });

        self.states.add('states:about', function(name){
            return new EndState(name,{
                text: 'Tlholo Victory Financial Services is an authorised\nFinancial services provider\nThe benefits are currently underwritten by Liberty Life',
                next: 'states:language'
            });
        });

        self.states.add('states:terms', function(name){
            return new EndState(name,{
                text: 'Six months WAITING period, excerpt suicide 24 Months\n & accidental death 1 month\nR50 Once off Joining fee\nPolicy lapses upon non payment of two premiums',
                next: 'states:language'
            });
        });

        self.states.add('states:exit', function(name) {
            return new EndState(name, {
                text: 'Tlholo - Victory\nVictors Not Victims\nDemo by Textily(Pty) Ltd',
                next: 'states:language'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
