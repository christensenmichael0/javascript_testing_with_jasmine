/* feedreader.js
 
  This is the spec file that Jasmine will read and contains
  all of the tests that will be run against your application.

 All of our tests are placed within the $() function,
  since some of these tests may require DOM elements. We want
 to ensure they don't run until the DOM is ready.
 */
$(function() {

    describe('RSS Feeds', function() {
        /* 
        Make sure that the allFeeds variable has been defined and that 
        it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
        Loop through each feed in the allFeeds object and ensure it 
        has a URL defined and is not empty
        */

        function testFeedURL(feedIndex) {
            it('url is defined and not empty', function() {
                expect(allFeeds[feedIndex].url).toBeTruthy();
                expect(allFeeds[feedIndex].url.replace(/\s/g,'').length).not.toBe(0);
            });
        }

        for (var feedIndex = 0; feedIndex < allFeeds.length; feedIndex++) {
            testFeedURL(feedIndex);
        }


        /*
        Loop through each feed in the allFeeds object and ensure it 
        has a name defined and is not empty
        */

        function testFeedName(feedIndex) {
            it('name is defined and not empty', function() {
                expect(allFeeds[feedIndex].name).toBeTruthy();
                expect(allFeeds[feedIndex].name.replace(/\s/g,'').length).not.toBe(0);
            });
        }

        for (var feedIndex = 0; feedIndex < allFeeds.length; feedIndex++) {
            testFeedName(feedIndex);
        }

    });


    describe('The menu', function() {


        //Ensure that the menu element is hidden by default

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });


        // Ensure the menu changes visibility when the menu icon is clicked

        it('changes visibility when icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });



    /*
    Ensures when the loadFeed completes its work there is at least
    a single .entry element within the .feed container
    */

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has at least a single entry', function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    /*
            Ensure when a new feed is loaded by the loadFeed function that 
            the content actually changes.
            */

    describe('New Feed Selection', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                initFeed = $('.feed').html();

            loadFeed(1, function() {
                newFeed = $('.feed').html();
                done();
            });
        });
        });

        it('content updates', function() {
            expect(initFeed).not.toEqual(newFeed);
        });
    });
}());