/* ===================================
   PARTICLE SYSTEM
   ================================== */

'use strict';

class ParticleSystem {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        
        // Default options
        this.options = {
            particleCount: options.particleCount || 100,
            particleColor: options.particleColor || '#6366f1',
            particleSize: options.particleSize || 2,
            connectionDistance: options.connectionDistance || 150,
            particleSpeed: options.particleSpeed || 0.5,
            connectionColor: options.connectionColor || 'rgba(99, 102, 241, 0.2)',
            connectionWidth: options.connectionWidth || 1,
            mouseInteraction: options.mouseInteraction !== false,
            mouseRadius: options.mouseRadius || 200
        };
        
        this.mouse = { x: null, y: null };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resize();
            this.particles = [];
            this.createParticles();
        });
        
        if (this.options.mouseInteraction) {
            this.canvas.addEventListener('mousemove', (e) => {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            });
            
            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(new Particle(
                this.canvas.width,
                this.canvas.height,
                this.options
            ));
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            particle.update(this.canvas.width, this.canvas.height, this.mouse, this.options);
            particle.draw(this.ctx);
        });
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = 1 - (distance / this.options.connectionDistance);
                    
                    this.ctx.strokeStyle = this.options.connectionColor.replace(
                        /[\d.]+\)$/,
                        `${opacity * 0.2})`
                    );
                    this.ctx.lineWidth = this.options.connectionWidth;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawParticles();
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight, options) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * options.particleSpeed;
        this.vy = (Math.random() - 0.5) * options.particleSpeed;
        this.size = options.particleSize + Math.random() * 2;
        this.color = options.particleColor;
    }
    
    update(canvasWidth, canvasHeight, mouse, options) {
        // Mouse interaction
        if (options.mouseInteraction && mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < options.mouseRadius) {
                const force = (options.mouseRadius - distance) / options.mouseRadius;
                const angle = Math.atan2(dy, dx);
                this.vx -= Math.cos(angle) * force * 0.5;
                this.vy -= Math.sin(angle) * force * 0.5;
            }
        }
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        if (this.x < 0 || this.x > canvasWidth) {
            this.vx *= -1;
            this.x = Math.max(0, Math.min(canvasWidth, this.x));
        }
        
        if (this.y < 0 || this.y > canvasHeight) {
            this.vy *= -1;
            this.y = Math.max(0, Math.min(canvasHeight, this.y));
        }
        
        // Damping to prevent particles from moving too fast
        this.vx *= 0.99;
        this.vy *= 0.99;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

/* ===================================
   CONSTELLATION EFFECT
   ================================== */

class ConstellationEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.starCount = 200;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createStars();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.stars = [];
            this.createStars();
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createStars() {
        for (let i = 0; i < this.starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                opacity: Math.random(),
                twinkleSpeed: 0.01 + Math.random() * 0.02
            });
        }
    }
    
    drawStars() {
        this.stars.forEach(star => {
            star.opacity += star.twinkleSpeed;
            
            if (star.opacity >= 1 || star.opacity <= 0) {
                star.twinkleSpeed *= -1;
            }
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawStars();
        requestAnimationFrame(() => this.animate());
    }
}

/* ===================================
   FLOATING SHAPES
   ================================== */

class FloatingShapes {
    constructor(containerId, shapeCount = 10) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.shapeCount = shapeCount;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.shapeCount; i++) {
            this.createShape();
        }
    }
    
    createShape() {
        const shape = document.createElement('div');
        const size = 50 + Math.random() * 100;
        const left = Math.random() * 100;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 5;
        
        const shapes = ['circle', 'square', 'triangle'];
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        shape.className = `floating-shape ${shapeType}`;
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            bottom: -${size}px;
            opacity: 0.1;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: ${shapeType === 'circle' ? '50%' : '0'};
            animation: floatUp ${duration}s ease-in infinite;
            animation-delay: ${delay}s;
            pointer-events: none;
        `;
        
        this.container.appendChild(shape);
    }
}

/* ===================================
   ANIMATED GRADIENT BACKGROUND
   ================================== */

class AnimatedGradient {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    animate() {
        this.time += 0.005;
        
        const gradient = this.ctx.createLinearGradient(
            0, 0,
            this.canvas.width * Math.cos(this.time),
            this.canvas.height * Math.sin(this.time)
        );
        
        gradient.addColorStop(0, '#0a0e27');
        gradient.addColorStop(0.5, '#1a1f3a');
        gradient.addColorStop(1, '#0f1729');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        requestAnimationFrame(() => this.animate());
    }
}

/* ===================================
   INITIALIZE
   ================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system if canvas exists
    const particleCanvas = document.getElementById('particles-canvas');
    if (particleCanvas) {
        new ParticleSystem('particles-canvas', {
            particleCount: 80,
            particleColor: '#6366f1',
            particleSize: 2,
            connectionDistance: 120,
            particleSpeed: 0.3,
            mouseInteraction: true,
            mouseRadius: 150
        });
    }
    
    // Initialize constellation effect
    const constellationCanvas = document.getElementById('constellation-canvas');
    if (constellationCanvas) {
        new ConstellationEffect('constellation-canvas');
    }
    
    // Initialize floating shapes
    const shapesContainer = document.getElementById('floating-shapes');
    if (shapesContainer) {
        new FloatingShapes('floating-shapes', 8);
    }
});

/* ===================================
   EXPORT FOR USE
   ================================== */

window.particles = {
    ParticleSystem,
    ConstellationEffect,
    FloatingShapes,
    AnimatedGradient
};
