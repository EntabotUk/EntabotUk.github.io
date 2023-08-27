
!function($){

    "use strict";

    var Typed = function(el, options){

        // chosen element to manipulate text
        this.el = $(el);
        // options
        this.options = $.extend({}, $.fn.typed.defaults, options);

        // text content of element
        this.text = this.el.text();

        // typing speed
        this.typeSpeed = this.options.typeSpeed;

        // amount of time to wait before backspacing
        this.backDelay = this.options.backDelay;

        // input strings of text
        this.strings = this.options.strings;

        // character number position of current string
        this.strPos = 0;

        // current array position
        this.arrayPos = 0;

        // current string based on current values[] array position
        this.string = this.strings[this.arrayPos];

        // number to stop backspacing on.
        // default 0, can change depending on how many chars
        // you want to remove at the time
        this.stopNum = 0;

        // Looping logic
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 1;
        if (this.loop === false){
            // number in which to stop going through array
            // set to strings[] array (length - 1) to stop deleting after last string is typed
            this.stopArray = this.strings.length-1;
        }
        else{
            this.stopArray = this.strings.length;
        }

        // All systems go!
        this.init();
        this.build();
    }

        Typed.prototype =  {

            constructor: Typed

            , init: function(){
                // begin the loop w/ first current string (global self.string)
                // current string will be passed as an argument each time after this
                this.typewrite(this.string, this.strPos);
            }

            , build: function(){
                this.el.after("<span id=\"typed-cursor\">|</span>");
            }

            // pass current string state to each function
            , typewrite: function(curString, curStrPos){

                // varying values for setTimeout during typing
                // can't be global since number changes each time loop is executed
                var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
                var self = this;

                // ------------- optional ------------- //
                // backpaces a certain string faster
                // ------------------------------------ //
                // if (self.arrayPos == 1){
                //  self.backDelay = 50;
                // }
                // else{ self.backDelay = 500; }

                // containg entire typing function in a timeout
                setTimeout(function() {

                    // make sure array position is less than array length
                    if (self.arrayPos < self.strings.length){

                        // start typing each new char into existing string
                        // curString is function arg
                        self.el.text(self.text + curString.substr(0, curStrPos));

                        // check if current character number is the string's length
                        // and if the current array position is less than the stopping point
                        // if so, backspace after backDelay setting
                        if (curStrPos > curString.length && self.arrayPos < self.stopArray){
                            clearTimeout(clear);
                            var clear = setTimeout(function(){
                                self.backspace(curString, curStrPos);
                            }, self.backDelay);
                        }

                        // else, keep typing
                        else{
                            // add characters one by one
                            curStrPos++;
                            // loop the function
                            self.typewrite(curString, curStrPos);
                            // if the array position is at the stopping position
                            // finish code, on to next task
                            if (self.loop === false){
                                if (self.arrayPos === self.stopArray && curStrPos === curString.length){
                                    // animation that occurs on the last typed string
                                    // fires callback function
                                    var clear = self.options.callback();
                                    clearTimeout(clear);
                                }
                            }
                        }
                    }
                    // if the array position is greater than array length
                    // and looping is active, reset array pos and start over.
                    else if (self.loop === true && self.loopCount === false){
                        self.arrayPos = 0;
                        self.init();
                    }
                        else if(self.loopCount !== false && self.curLoop < self.loopCount){
                            self.arrayPos = 0;
                            self.curLoop = self.curLoop+1;
                            self.init();
                        }

                // humanized value for typing
                }, humanize);

            }

            , backspace: function(curString, curStrPos){

                // varying values for setTimeout during typing
                // can't be global since number changes each time loop is executed
                var humanize = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
                var self = this;

                setTimeout(function() {

                    // ----- this part is optional ----- //
                    // check string array position
                    // on the first string, only delete one word
                    // the stopNum actually represents the amount of chars to
                    // keep in the current string. In my case it's 14.
                     if (self.arrayPos == 1, 2, 3, 4){
                        self.stopNum = 0;
                     }
                    //every other time, delete the whole typed string
                     //else{
                        //self.stopNum = 0;
                     //}

                    // ----- continue important stuff ----- //
                    // replace text with current text + typed characters
                    self.el.text(self.text + curString.substr(0, curStrPos));

                    // if the number (id of character in current string) is
                    // less than the stop number, keep going
                    if (curStrPos > self.stopNum){
                        // subtract characters one by one
                        curStrPos--;
                        // loop the function
                        self.backspace(curString, curStrPos);
                    }
                    // if the stop number has been reached, increase
                    // array position to next string
                    else if (curStrPos <= self.stopNum){
                        clearTimeout(clear);
                        var clear = self.arrayPos = self.arrayPos+1;
                        // must pass new array position in this instance
                        // instead of using global arrayPos
                        self.typewrite(self.strings[self.arrayPos], curStrPos);
                    }

                // humanized value for typing
                }, humanize);

            }

        }

    $.fn.typed = function (option) {
        return this.each(function () {
          var $this = $(this)
            , data = $this.data('typed')
            , options = typeof option == 'object' && option
          if (!data) $this.data('typed', (data = new Typed(this, options)))
          if (typeof option == 'string') data[option]()
        });
    }

    $.fn.typed.defaults = {
        strings: ["Hello, hola, hi! ", "Welcome to my website ", "Go on, scroll down", ":)"],
        // typing and backspacing speed
        typeSpeed: 50, // speed decreases as number increased
        // time before backspacing
        backDelay: 100,
        // loop
        loop: true,
        // false = infinite
        loopCount: false,
        // ending callback function
        callback: function(){ null }
    }


}(window.jQuery);


$(function(){

        $("#typed").typed({
            strings: ["a teacher","a reader","a web developer","a lot more"], //Strings to display when typing
            typeSpeed: 40,
            backDelay: 600,
            loop: true,
            // defaults to false for infinite loop
            loopCount: false,
            callback: function(){ foo(); }
        });

        function foo(){ console.log("Callback"); }

    });
    let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

/* -- ↓↓↓ If you want the sparkle effect to only occur on hover, replace lines 16 and on with this code ↓↓↓ -- */

// let timeouts = [],
//     intervals = [];

// const magic = document.querySelector(".magic");

// magic.onmouseenter = () => {
//   let index = 1;
  
//   for(const star of document.getElementsByClassName("magic-star")) {
//     timeouts.push(setTimeout(() => {  
//       animate(star);
      
//       intervals.push(setInterval(() => animate(star), 1000));
//     }, index++ * 300));
//   };
// }

// magic.onmouseleave = onMouseLeave = () => {
//   for(const t of timeouts) clearTimeout(t);  
//   for(const i of intervals) clearInterval(i);
  
//   timeouts = [];
//   intervals = [];
// }
gsap.registerPlugin(ScrollTrigger);

const textElements = gsap.utils.toArray('.text');

textElements.forEach(text => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 90%',
      end: 'center 60%',
      scrub: true,
    },
  });
});
function initAccordion() {
    const accordion = document.querySelector(".js-accordion");
  
    if (!accordion) {
      return;
    } else {
      const groups = gsap.utils.toArray(".js-accordion__group");
      const menus = gsap.utils.toArray(".js-accordion__menu");
      const animations = [];
  
      groups.forEach((group) => createAnimation(group));
  
      menus.forEach((menu) => {
        menu.addEventListener("click", () => toggleAnimation(menu));
      });
  
      function toggleAnimation(menu) {
        // Save the current state of the clicked animation
        const selectedReversedState = menu.animation.reversed();
  
        // Reverse all animations
        animations.forEach((animation) => animation.reverse());
  
        // Set the reversed state of the clicked accordion element to the opposite of what it was before
        menu.animation.reversed(!selectedReversedState);
      }
  
      function createAnimation(element) {
        const menu = element.querySelector(".js-accordion__menu");
        const infos = element.querySelector(".js-accordion__content");
        const group = infos.parentElement;
        const icon = element.querySelector(".js-accordion__icon");
        const image = element.querySelector(".js-accordion__img");
  
        gsap.set(group, { flexGrow: 1 });
        gsap.set(icon, { rotation: 0 });
  
        const tlAccordion = gsap.timeline({
          reversed: true,
          paused: !0,
        });
  
        tlAccordion
          .to(group, {
            flexGrow: 10,
            duration: 0.5,
            ease: "power1.inOut",
          })
          .from(
            infos,
            {
              autoAlpha: 0,
              y: 80,
              duration: 0.5,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            image,
            {
              duration: 0.5,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(
            icon,
            {
              duration: 0.25,
              rotation: 90,
              ease: "linear",
            },
            "<"
          );
  
        menu.animation = tlAccordion;
        animations.push(tlAccordion);
      }
      toggleAnimation(menus[0])
    }
  }
  
  initAccordion();
  const headingTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 2,
    yoyo: true
  });
  
  headingTl
    .from(".heading", {
      duration: 1,
      scaleX: 0,
      transformOrigin: "left",
      ease: "expo.inOut"
    })
    .from(
      ".heading h1",
      {
        y: "100%",
        duration: 0.8,
        ease: "expo.out"
      },
      "-=0.2"
    )
    .from(
      ".heading",
      {
        css: { borderBottom: "4px solid black" },
        duration: 2,
        transformOrigin: "right",
        ease: "none"
      },
      "-=1"
    )
    .from(
      ".heading h1",
      {
        duration: 2,
        transformOrigin: "right",
        ease: "none",
        css: { color: "black" }
      },
      "-=2"
    );
  