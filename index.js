    const popupLinks = document.querySelectorAll('.popup__link');
    const popups = document.querySelectorAll('.popup');
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll(".lock-padding");
    // ".lock-padding" надо добавлять ко всем фиксированным fixed элементам на странице

    let unlock = true;
    const timeout = 500;
    //Таймаут для анимации попапа

    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];

            popupLink.addEventListener("click", function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            });
        }
    }

    if (popups.length > 0) {
        for (let index = 0; index < popups.length; index++) {
            const popup = popups[index];
            popup.addEventListener("click", function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    const popupCloseIcon = document.querySelectorAll(".popup__close-button");
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup__open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('popup__open');
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('popup__open');
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }

    function bodyLock(){
        //const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        const lockPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';

        if (lockPadding.length>0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
    }

    function bodyUnlock(){
        setTimeout(function(){
            if (lockPadding.length > 0) {
                for (let index = 0; index < lockPadding.length; index++) {
                    const el = lockPadding[index];
                    el.style.paddingRight = '0px';
                }
            } 
            body.style.paddingRight = '0px';
            body.classList.remove("lock");
        },timeout);

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function(e) {
        if (e.which === 27) {
            const popupActive = document.querySelector(".popup__open");
            popupClose(popupActive);
        }
    });

    (function(ELEMENT) {
        ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
        ELEMENT.closest = ELEMENT.closest || function closest(selector) {
            if (!this) return null;
            if (this.matches(selector)) return this;
            if (!this.parentElement) {return null}
            else return this.parentElement.closest(selector)
          };
    }(Element.prototype));