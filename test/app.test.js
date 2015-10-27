var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;


describe("app", function() {
    describe("GoApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function() {
            it("should present the main menu", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:main',
                        reply: [
                            'TLHOLO - VICTORY',
                            '1. Join Tlholo',
                            '2. Covers',
                            '3. Claim Documents',
                            '4. Motjha-O-Tjhele',
                            '5. Our Offices',
                            '6. About Tlholo',
                            '7. Terms & Conditions',
                            '8. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see the covers menu", function() {
            it("should present covers menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('2')
                    .check.interaction({
                        state: 'states:covers',
                        reply: [
                            'Types of Covers:',
                            '1. Single Cover',
                            '2. Family Cover',
                            '3. Main menu',
                            '4. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see single cover details menu", function() {
            it("should show single covers details", function() {
                return tester
                    .setup.user.state('states:covers')
                    .input('1')
                    .check.interaction({
                        state: 'states:single_cover',
                        reply: [
                            'Age: [18-64] cover[5000 - 20 000] premium[R80-R180]',
                            'Age: [65-74] cover[5000 - 10 000] premium[R100-R170]',
                            'Age: [75-84] cover[5000] premium[R190]'
                        ].join('\n')
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to see family cover details menu", function() {
            it("should show  family covers details", function() {
                return tester
                    .setup.user.state('states:covers')
                    .input('2')
                    .check.interaction({
                        state: 'states:family_cover',
                        reply: 'Our family covers premium\nranges from R80 to R280\ndepending on how many family\nmembers you would like to include\nConsultant will call you shortly'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to see claim stage requred docs", function() {
            it("should show required docs", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('3')
                    .check.interaction({
                        state: 'states:claim',
                        reply: 'Required documents(certified) at claim stage:\nDeath Certificate\nDeaceased ID\nClaimant ID\nOne Month Bank Statement'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });        

        describe("when the user asks to see Motjha-O-Tjhele menu", function() {
            it("should show Motjha-O-Tjhele menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('4')
                    .check.interaction({
                        state: 'states:rules',
                        reply: 'Motjha-O-Tjhele premiums ranges between R200-R250\nThere are conditions for Motjha-O-Tjhele\nA consultant will call you shortly'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to see Tlholo contact details", function() {
            it("should present contact details menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('5')
                    .check.interaction({
                        state: 'states:contact',
                        reply: 'Our Offices\nQwaqwa\nABSA Building\n071 908 2988\n\nBotshabelo\nReahola Complex\n083 669 5913\n\nBloemfontein\n154 Maitland Str\n\n083 669 5913'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to see about menu", function() {
            it("should present about menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('6')
                    .check.interaction({
                        state: 'states:about',
                        reply: 'Tlholo Victory Financial Services is an authorised\nFinancial services provider\nThe benefits are currently underwritten by Liberty Life'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to see terms and conditions menu", function() {
            it("should present terms and conditions menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('7')
                    .check.interaction({
                        state: 'states:terms',
                        reply: 'Six months WAITING period, excerpt suicide 24 Months\n & accidental death 1 month\nR50 Once off Joining fee\nPolicy lapses upon non payment of two premiums'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });

        describe("when the user asks to exit", function() {
            it("should say Tlholo - Victory, show demo by Textily (Pty) Ltd and end the session", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('8')
                    .check.interaction({
                        state: 'states:exit',
                        reply: 'Tlholo - Victory\nVictors Not Victims\nDemo by Textily(Pty) Ltd'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });
    });
});