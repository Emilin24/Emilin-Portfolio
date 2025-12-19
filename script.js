document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. EXISTING FUNCTIONALITIES (Navigation, Tilt, etc.)
       ========================================= */

    // --- Hero Text Typing Animation ---
    const animatedText = document.getElementById('animated-text');
    const titles = ["Full Stack Developer", "Front End Developer", "Back End Developer", "API Developer", "Problem Solver", "Tech Enthusiast"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 60;
    const delay = 2000;

    function type() {
        if (!animatedText) return;
        const currentTitle = titles[titleIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        animatedText.textContent = displayText;
        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentTitle.length) {
            speed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = typingSpeed;
        }
        setTimeout(type, speed);
    }
    type();

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-open')) {
                navMenu.classList.remove('nav-open');
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const allNavLinks = document.querySelectorAll('.nav-link');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    // --- Download Resume Button ---
    const downloadBtn = document.getElementById('download-resume-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'assets/resume.pdf';
            link.download = 'Emilin_Sana_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // --- 3D Tilt Card Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        const maxTilt = 15;
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;
            card.style.transform = `perspective(1000px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        });
    });

    // --- Aurora Scroll Effect ---
    const auroraBg = document.getElementById('aurora-bg');
    if (auroraBg) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        const parallaxFactor = 0.05;
        const updateAurora = () => {
            const moveY = lastScrollY * parallaxFactor;
            auroraBg.style.transform = `translateY(-${moveY}px)`;
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateAurora);
                ticking = true;
            }
        });
    }

    // --- Copy Email Functionality ---
function copyEmail() {
    const email = "sanasiju84@gmail.com";
    const btn = document.getElementById('emailBtn');
    const tooltip = btn.querySelector('.copy-tooltip');
    
    // Copy to clipboard
    navigator.clipboard.writeText(email).then(() => {
        // Visual Feedback
        const originalText = tooltip.textContent;
        tooltip.textContent = "Copied!";
        btn.style.borderColor = "#5eead4"; // Turn border Green/Teal
        
        // Reset after 2 seconds
        setTimeout(() => {
            tooltip.textContent = "Copy";
            btn.style.borderColor = "";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
// Make function globally available if script is module, 
// otherwise the onclick in HTML works automatically.
window.copyEmail = copyEmail;
    /* =========================================
       2. UPDATED REALISTIC FLOWER ANIMATION
       ========================================= */
    const canvas = document.getElementById('flower-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        const flowerColors = [
            '#5eead4', // Teal 
            '#a7b2d0', // Muted Blue
            '#e0e7ff', // White Blue
            '#c084fc', // Soft Purple
            '#2dd4bf'  // Cyan
        ];

        class Flower {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.speedX = Math.random() * 4 - 2;
                this.speedY = Math.random() * -3 - 2;
                this.size = Math.random() * 10 + 5;
                this.vs = Math.random() * 0.2 + 0.05; // Shrink speed
                this.angle = Math.random() * 6.2;
                this.va = Math.random() * 0.1 - 0.05;
                this.color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
                this.growing = true;
                
                // Randomize petal count (5 to 8 petals)
                this.petalCount = Math.floor(Math.random() * 4) + 5; 
                // Randomize petal length
                this.petalLength = Math.random() * 10 + 10; 
            }

            update() {
                if (!this.growing) return;

                this.x += this.speedX + Math.sin(this.angle);
                this.y += this.speedY;
                this.size -= this.vs;
                this.angle += this.va;

                if (this.size > 0) {
                    // Draw Stem (Wiggling Line)
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(20, 80, 60, 0.4)'; // Dark semi-transparent green
                    ctx.fill();
                    requestAnimationFrame(this.update.bind(this));
                } else {
                    this.growing = false;
                    this.bloom();
                }
            }

            bloom() {
                ctx.save(); // 1. Save current canvas state
                ctx.translate(this.x, this.y); // 2. Move origin to the top of the stem
                
                const angleStep = (Math.PI * 2) / this.petalCount;

                // Draw Petals
                for (let i = 0; i < this.petalCount; i++) {
                    ctx.rotate(angleStep); // 3. Rotate canvas for each petal
                    
                    ctx.beginPath();
                    // Draw an Ellipse (Oval) for the petal
                    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
                    ctx.ellipse(0, this.petalLength / 2 + 2, 3, this.petalLength, 0, 0, Math.PI * 2);
                    
                    // Add gradient to petal (Darker at center, lighter at tip)
                    // Note: Since we translated, (0,0) is the center of the flower
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = 0.8;
                    ctx.fill();
                }

                // Draw Glowing Center (Pistil)
                ctx.beginPath();
                ctx.arc(0, 0, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff'; // White center
                ctx.shadowBlur = 10;       // Glow effect
                ctx.shadowColor = '#ffffff';
                ctx.globalAlpha = 1;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow

                ctx.restore(); // 4. Restore canvas so next flower isn't messed up
            }
        }

        window.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) return;
            
            // Create 3 flowers for a cluster effect
            for(let i=0; i<2; i++){
                const flower = new Flower(e.clientX, e.clientY);
                flower.update();
            }
        });
    }
});