main()

function main() {
        let feedbackMode = false
        let listener = null

        /** @type {HTMLInputElement} */
        const feedbackModeToggle = document.querySelector('.feedback-mode-toggle input')
        const feedbackApp = document.querySelector('.fb-app')

        feedbackModeToggle.addEventListener('change', function () {
                feedbackMode = !feedbackMode

                console.info(feedbackMode ? 'feedback mode enabled' : 'feedback mode disabled')

                if (feedbackMode) {
                        listener = enableFeedbackMode(feedbackApp, function (listener) {
                                feedbackMode = false
                                feedbackModeToggle.checked = false

                                disableFeedbackMode(feedbackApp, listener)
                        })
                }
                else {
                        disableFeedbackMode(feedbackApp, listener)
                }
        })
}

/**
 * @param {HTMLElement} elem
 */
function enableFeedbackMode(elem, cb) {
        elem.classList.add('fb-mode')

        /** @type {HTMLDialogElement} */
        const diag = document.getElementById('fb-dialog')
        /** @type {HTMLFormElement} */
        const form = document.getElementById('fb-form')
        /** @type {HTMLButtonElement} */
        const cancelBtn = form.querySelector('button[type=reset]')
        /** @type {HTMLButtonElement} */
        const submitBtn = form.querySelector('button[type=submit]')
        const preview = form.querySelector('.preview')

        function close() {
                diag.close()
        }
        
        /**
         * @param {SubmitEvent} ev
         */
        function submit(ev) {
                ev.preventDefault()

                diag.close()

                alert('Feedback submitted: ' + form.feedback.value)

                form.reset()

                if (typeof cb == 'function') cb(displayFeedbackForm)
        }

        /**
         * @param {PointerEvent} ev
         */
        function displayFeedbackForm(ev) {
                console.debug(ev)
                
                /** @type {HTMLElement} */
                const target = ev.target
                const isFeedbackTarget = target.classList.contains('fb-target')

                if (!isFeedbackTarget) return

                ev.stopImmediatePropagation()

                preview.innerHTML = target.outerHTML

                diag.showModal()
        }

        cancelBtn.addEventListener('click', close)
        submitBtn.addEventListener('click', submit)
        elem.addEventListener('click', displayFeedbackForm, true)

        return displayFeedbackForm
}

/**
 * @param {HTMLElement} elem
 * @param {any} listener
 */
function disableFeedbackMode(elem, listener) {
        elem.classList.remove('fb-mode')
        elem.removeEventListener('click', listener, true)
}
