main()

function main() {
        let feedbackMode = false

        /** @type {HTMLButtonElement} */
        const feedbackBtn = document.querySelector('.fb-btn')
        const feedbackApp = document.querySelector('.fb-app')

        feedbackBtn.addEventListener('click', function () {
                feedbackMode = !feedbackMode

                console.info(feedbackMode ? 'feedback mode enabled' : 'feedback mode disabled')

                if (feedbackMode) {
                        enableFeedbackMode(feedbackApp)
                }
                else {
                        disableFeedbackMode(feedbackApp)
                }
        })
}

/**
 * @param {HTMLElement} elem
 */
function enableFeedbackMode(elem) {
        elem.classList.add('fb-mode')
}

/**
 * @param {HTMLElement} elem
 */
function disableFeedbackMode(elem) {
        elem.classList.remove('fb-mode')
}
