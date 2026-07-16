/* ===================================
   ADVANCED ANIMATIONS
   ================================== */

'use strict';

/* ===================================
   PARALLAX SCROLLING
   ================================== */

class ParallaxEffect {
    constructor(selector, speed = 0.5) {
        this.elements = document.querySelectorAll(selector);
        this.speed = speed;
        this.init();
    }
    
    init() {
        if (!this.elements.length) return;
        
        window.addEventListener('scroll', () => this.update());
        this.update();
    }
    
    update() {
        const scrollY = window.pageYOffset;
        
        this.elements.forEach(element => {
            const speed = element.dataset.speed || this.speed;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

/* ===================================
   MAGNETIC HOVER EFFECT
   ================================== */

class MagneticHover {
    constructor(selector, strength = 0.3) {
        this.elements = document.querySelectorAll(selector);
        this.strength = strength;
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleMove(e, element));
            element.addEventListener('mouseleave', () => this.handleLeave(element));
        });
    }
    
    handleMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * this.strength;
        const moveY = y * this.strength;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    
    handleLeave(element) {
        element.style.transform = 'translate(0, 0)';
    }
}

/* ===================================
   TILT EFFECT (3D Card Effect)
   ================================== */

class TiltEffect {
    constructor(selector, maxTilt = 15) {
        this.elements = document.querySelectorAll(selector);
        this.maxTilt = maxTilt;
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            element.style.transition = 'transform 0.3s ease';
            
            element.addEventListener('mousemove', (e) => this.handleMove(e, element));
            element.addEventListener('mouseleave', () => this.handleLeave(element));
        });
    }
    
    handleMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * this.maxTilt;
        const rotateY = ((x - centerX) / centerX) * -this.maxTilt;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    handleLeave(element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

/* ===================================
   TEXT REVEAL ANIMATION
   ================================== */

class TextReveal {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            const chars = text.split('');
            chars.forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.03}s`;
                element.appendChild(span);
            });
        });
    }
}

/* ===================================
   COUNTER ANIMATION
   ================================== */

class CounterAnimation {
    constructor(selector, duration = 2000) {
        this.elements = document.querySelectorAll(selector);
        this.duration = duration;
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });
        
        this.elements.forEach(element => observer.observe(element));
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.count || element.textContent);
        const increment = target / (this.duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
}

/* ===================================
   PROGRESS BAR ANIMATION
   ================================== */

class ProgressBarAnimation {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    this.animateBar(entry.target);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });
        
        this.elements.forEach(element => observer.observe(element));
    }
    
    animateBar(element) {
        const progress = element.dataset.progress || 0;
        const fill = element.querySelector('.progress-fill');
        
        if (fill) {
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.transition = 'width 1.5s ease';
                fill.style.width = progress + '%';
            }, 100);
        }
    }
}

/* ===================================
   STAGGER ANIMATION
   ================================== */

class StaggerAnimation {
    constructor(containerSelector, childSelector, delay = 100) {
        this.containers = document.querySelectorAll(containerSelector);
        this.childSelector = childSelector;
        this.delay = delay;
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('staggered')) {
                    this.animateChildren(entry.target);
                    entry.target.classList.add('staggered');
                }
            });
        }, { threshold: 0.2 });
        
        this.containers.forEach(container => observer.observe(container));
    }
    
    animateChildren(container) {
        const children = container.querySelectorAll(this.childSelector);
        
        children.forEach((child, index) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * this.delay);
        });
    }
}

/* ===================================
   MORPHING BACKGROUND
   ================================== */

class MorphingBackground {
    constructor(selector) {
        this.element = document.querySelector(selector);
        if (!this.element) return;
        
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.connect('2d');
        this.element.appendChild(this.canvas);
        
        this.resize();
        this.init();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    animate() {
        // Add custom canvas animation logic here
        requestAnimationFrame(() => this.animate());
    }
}

/* ===================================
   RIPPLE EFFECT
   ================================== */

function addRippleEffect(selector) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ===================================
   MOUSE TRAIL EFFECT
   ================================== */

class MouseTrail {
    constructor(color = 'rgba(99, 102, 241, 0.5)', particleCount = 20) {
        this.color = color;
        this.particleCount = particleCount;
        this.particles = [];
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => this.addParticle(e.clientX, e.clientY));
        this.animate();
    }
    
    addParticle(x, y) {
        if (this.particles.length >= this.particleCount) {
            this.particles.shift().remove();
        }
        
        const particle = document.createElement('div');
        particle.className = 'mouse-trail-particle';
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${this.color};
            border-radius: 50%;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            transform: translate(-50%, -50%);
            opacity: 1;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        this.particles.push(particle);
        
        setTimeout(() => {
            particle.style.transition = 'opacity 0.5s, transform 0.5s';
            particle.style.opacity = '0';
            particle.style.transform = 'translate(-50%, -50%) scale(2)';
        }, 10);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
    }
}

/* ===================================
   INITIALIZE ANIMATIONS
   ================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize parallax effects
    new ParallaxEffect('.parallax-element', 0.5);
    
    // Initialize magnetic hover on buttons
    new MagneticHover('.btn-magnetic', 0.4);
    
    // Initialize 3D tilt on cards
    new TiltEffect('.tilt-card', 10);
    
    // Initialize text reveal
    new TextReveal('.text-reveal');
    
    // Initialize counter animations
    new CounterAnimation('.counter', 2000);
    
    // Initialize progress bars
    new ProgressBarAnimation('.progress-bar');
    
    // Initialize stagger animations
    new StaggerAnimation('.stagger-container', '.stagger-item', 100);
    
    // Add ripple effect to buttons
    addRippleEffect('.btn-ripple');
    
    // Optional: Mouse trail (can be performance intensive)
    // new MouseTrail('rgba(99, 102, 241, 0.3)', 15);
});

/* ===================================
   EXPORT FOR USE
   ================================== */

window.animations = {
    ParallaxEffect,
    MagneticHover,
    TiltEffect,
    TextReveal,
    CounterAnimation,
    ProgressBarAnimation,
    StaggerAnimation,
    MouseTrail,
    addRippleEffect
};
