document.addEventListener("DOMContentLoaded", function () {

    const startBtn = document.getElementById("startupBtn");
    const startupSound = document.getElementById("startupSound");
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("mainContent");

    const progressBar = document.getElementById("progressBar");
    const loadingText = document.getElementById("loadingText");

    const clickSound = document.getElementById("clickSound");

    /* ================= CLICK SOUND ================= */
    const clickableElements = document.querySelectorAll("button, nav a");

    clickableElements.forEach(element => {
        element.addEventListener("click", () => {
            if (clickSound) {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });

    /* ================= START BUTTON ================= */
    if (startBtn) {
        startBtn.addEventListener("click", function () {

            startBtn.disabled = true; // prevent double click

            if (startupSound) {
                startupSound.play();
            }

            /* ================= AUDIO SYNC PROGRESS ================= */
            startupSound.addEventListener("timeupdate", function () {

                if (!startupSound.duration) return;

                const percent = (startupSound.currentTime / startupSound.duration) * 100;

                if (progressBar) {
                    progressBar.style.width = percent + "%";
                }

                if (loadingText) {
                    loadingText.innerText = Math.floor(percent) + "%";
                }

            });

            /* ================= WHEN SOUND ENDS ================= */
            startupSound.onended = function () {

                // Force progress to 100%
                if (progressBar) progressBar.style.width = "100%";
                if (loadingText) loadingText.innerText = "100%";

                // AI Greeting Voice
                const message = new SpeechSynthesisUtterance(
                    "welcome to... The future batman Mr Akash Portfolio........  MEN. ARE BRAVE .."
                );

                message.rate = 0.7;
                message.pitch = 0.2;
                message.volume = 2;

                speechSynthesis.speak(message);

                // Smooth fade
                loader.style.transition = "opacity 1s ease";
                loader.style.opacity = "0";

                setTimeout(() => {
                    loader.style.display = "none";
                    mainContent.style.display = "block";
                    document.body.style.overflow = "auto";

                    initParticles();
                    startTyping();

                }, 1000);
            };

        });
    }

    /* ================= PARTICLES ================= */
    function initParticles() {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80 },
                color: { value: "#00f2ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#8e2de2",
                    opacity: 0.4,
                    width: 1
                },
                move: { enable: true, speed: 2 }
            }
        });
    }

    /* ================= TYPING EFFECT ================= */
    function startTyping() {
        const text = "AI Developer | AIML Enthusiast | Future Engineer";
        let i = 0;
        const typingElement = document.querySelector(".typing");

        function typeEffect() {
            if (typingElement && i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeEffect, 50);
            }
        }

        typeEffect();
    }

});
