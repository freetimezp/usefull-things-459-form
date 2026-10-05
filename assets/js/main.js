(() => {
    const $ = (selector, scope = document) => scope.querySelector(selector);

    const $$ = (selector, scope = document) => [
        ...scope.querySelectorAll(selector),
    ];

    const form = $("#idea-form");
    const topbar = $(".topbar");
    const artWrap = $(".art-wrap");
    const toast = $("#toast");
    const details = $("#details");
    const charCount = $("#char-count");
    const successPanel = $("#success-panel");
    const formHeading = $(".form-heading");
    const resetButton = $("#reset-button");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    const motion = {
        set: (target, vars) =>
            window.gsap && !prefersReducedMotion
                ? gsap.set(target, vars)
                : null,

        to: (target, vars) =>
            window.gsap && !prefersReducedMotion ? gsap.to(target, vars) : null,

        from: (target, vars) =>
            window.gsap && !prefersReducedMotion
                ? gsap.from(target, vars)
                : null,

        timeline: () =>
            window.gsap && !prefersReducedMotion ? gsap.timeline() : null,
    };

    // Intro: staggered, springy entrances.
    if (window.gsap && !prefersReducedMotion) {
        gsap.set(
            [
                ".intro-eyebrow",
                ".visual-copy",
                ".form-heading",
                "#idea-form .field",
                ".submit-button",
                ".side-index",
            ],
            { autoAlpha: 0, y: 22 },
        );

        gsap.set(topbar, {
            y: -100,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
        });

        gsap.set(".character-card", {
            autoAlpha: 0,
            scale: 0.86,
            rotation: -5,
        });

        gsap.set([".tag-code", ".tag-spark", ".tag-bubble"], {
            autoAlpha: 0,
            scale: 0.4,
        });

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
            .to(topbar, {
                y: 0,
                opacity: 1,
                duration: 0.65,
                ease: "power3.out",
            })

            .to(
                ".intro-eyebrow",
                { autoAlpha: 1, y: 0, duration: 0.65 },
                "-=0.25",
            )

            .to(
                ".character-card",
                {
                    autoAlpha: 1,
                    scale: 1,
                    rotation: 2,
                    duration: 0.9,
                    ease: "back.out(1.7)",
                },
                "-=1",
            )

            .to(
                [".tag-code", ".tag-spark", ".tag-bubble"],
                {
                    autoAlpha: 1,
                    scale: 1,
                    duration: 0.55,
                    stagger: 0.12,
                    ease: "back.out(2.5)",
                },
                "-=.5",
            )

            .to(
                ".visual-copy",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.65,
                },
                "-=.35",
            )

            .to(
                ".form-heading",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                },
                "-=.65",
            )

            .to(
                "#idea-form .field",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.45,
                    stagger: 0.08,
                },
                "-=.3",
            )

            .to(
                ".submit-button",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.5,
                },
                "-=.15",
            )

            .to(
                ".side-index",
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.4,
                },
                "-=.3",
            );

        gsap.to(".character-card", {
            y: -9,
            rotation: 1,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

        gsap.to(".tag-spark", {
            rotation: 18,
            scale: 1.13,
            duration: 1.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

        gsap.to(".tag-code", {
            y: -7,
            rotation: -5,
            duration: 2.1,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

        gsap.to(".tag-bubble", {
            y: 7,
            rotation: 4,
            duration: 1.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

        gsap.to(".sunburst", {
            rotation: 8,
            scale: 1,
            duration: 8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

        gsap.to(".orbit-one", {
            rotation: 12,
            duration: 18,
            ease: "none",
            repeat: -1,
            yoyo: true,
        });
    }

    // parallax
    if (window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion) {
        artWrap.addEventListener("pointermove", (event) => {
            const rect = artWrap.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            motion.to(".character-card", {
                x: x * 10,
                y: y * 8 - 5,
                duration: 0.5,
                ease: "power2.out",
            });

            motion.to(".tag-code", {
                x: x * -12,
                duration: 0.6,
                ease: "power2.out",
            });

            motion.to(".tag-bubble", {
                x: x * 13,
                y: y * -8,
                duration: 0.6,
                ease: "power2.out",
            });
        });

        artWrap.addEventListener("pointerleave", () => {
            motion.to([".character-card", ".tag-code", ".tag-bubble"], {
                x: 0,
                duration: 0.7,
                ease: "elastic.out(1,.5)",
            });
        });
    }

    // character reacts
    const characterReactions = {
        name: () => {
            if (!prefersReducedMotion)
                motion.to(".character-card", {
                    rotation: -1,
                    duration: 0.25,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                });
        },

        email: () => {
            if (!prefersReducedMotion)
                motion.to(".tag-spark", {
                    rotation: 360,
                    duration: 0.65,
                    ease: "back.out(1.8)",
                });
        },

        project: () => {
            if (!prefersReducedMotion)
                motion.to(".sunburst", {
                    scale: 1.08,
                    duration: 0.3,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                });
        },
    };

    $("#name").addEventListener("focus", characterReactions.name);

    $("#email").addEventListener("focus", characterReactions.email);

    $$('input[name="project"]').forEach((input) =>
        input.addEventListener("change", characterReactions.project),
    );

    details.addEventListener("input", () => {
        charCount.textContent = details.value.length;

        if (details.value.length > 240)
            details.value = details.value.slice(0, 240);

        charCount.textContent = details.value.length;
    });

    function showToast(message) {
        toast.textContent = message;

        toast.classList.add("show");

        if (window.gsap && !prefersReducedMotion) {
            gsap.fromTo(
                toast,
                {
                    y: 14,
                },
                {
                    y: 0,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                },
            );

            gsap.delayedCall(2.6, () => toast.classList.remove("show"));
        } else {
            window.setTimeout(() => toast.classList.remove("show"), 2600);
        }
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = $("#name").value.trim();
        const email = $("#email").value.trim();
        const project = $('input[name="project"]:checked');

        if (!name) {
            $("#name").focus();

            showToast("Psst… we need your legendary name first.");

            return;
        }
        if (!email || !$("#email").checkValidity()) {
            $("#email").focus();

            showToast("That email looks a little wonky. Check it?");

            return;
        }
        if (!project) {
            $(".choice").focus?.();

            showToast("Pick your flavor of magic first!");

            return;
        }

        $("#success-copy").textContent =
            `Okay, ${name}! Your ${project.value.toLowerCase()} 
                idea has officially entered the universe. This demo doesn't 
                send data anywhere — but the vibes are very real.`;

        if (window.gsap && !prefersReducedMotion) {
            const tl = gsap.timeline();

            tl.to(form, {
                autoAlpha: 0,
                y: -18,
                duration: 0.35,
                ease: "power2.in",
            })
                .to(
                    formHeading,
                    {
                        autoAlpha: 0,
                        y: -12,
                        duration: 0.25,
                    },
                    "-=.2",
                )

                .add(() => {
                    form.hidden = true;
                    formHeading.hidden = true;
                    successPanel.hidden = false;
                })

                .fromTo(
                    successPanel,
                    {
                        autoAlpha: 0,
                        y: 25,
                        scale: 0.97,
                    },
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.65,
                        ease: "back.out(1.4)",
                    },
                );

            gsap.fromTo(
                ".success-stamp",
                {
                    rotation: -30,
                    scale: 0,
                },
                {
                    rotation: 12,
                    scale: 1,
                    duration: 0.7,
                    ease: "elastic.out(1,.45)",
                    delay: 0.3,
                },
            );

            gsap.to(".character-card", {
                rotation: -2,
                y: -18,
                duration: 0.18,
                yoyo: true,
                repeat: 3,
                ease: "power2.inOut",
            });
        } else {
            form.hidden = true;
            formHeading.hidden = true;
            successPanel.hidden = false;
        }
    });

    resetButton.addEventListener("click", () => {
        form.reset();

        charCount.textContent = "0";
        successPanel.hidden = true;
        formHeading.hidden = false;
        form.hidden = false;

        if (window.gsap && !prefersReducedMotion) {
            gsap.fromTo(
                [formHeading, form],
                {
                    autoAlpha: 0,
                    y: 18,
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.55,
                    stagger: 0.1,
                    ease: "power3.out",
                    clearProps: "all",
                },
            );
        }

        $("#name").focus({ preventScroll: true });
    });
})();
