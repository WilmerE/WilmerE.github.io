// ===================================
// MODERN SKILLS MANAGEMENT
// ===================================

// Skills data with modern ES6 structure
const skillsData = {
	diseño: [
		{ nombre: 'Photoshop', dominio: 90, icon: '🎨' },
		{ nombre: 'Illustrator', dominio: 85, icon: '✏️' },
		{ nombre: 'After Effects', dominio: 80, icon: '🎬' },
		{ nombre: 'Sony Vegas', dominio: 75, icon: '🎥' }
	],
	backend: [
		{ nombre: 'Java', dominio: 75, icon: '☕' },
		{ nombre: 'Python', dominio: 80, icon: '🐍' },
		{ nombre: 'PHP', dominio: 90, icon: '🐘' },
		{ nombre: 'C++', dominio: 75, icon: '⚙️' }
	],
	frontend: [
		{ nombre: 'HTML', dominio: 90, icon: '📄' },
		{ nombre: 'JavaScript', dominio: 85, icon: '⚡' },
		{ nombre: 'CSS', dominio: 90, icon: '🎨' },
		{ nombre: 'jQuery', dominio: 85, icon: '📚' }
	]
};

// ===================================
// SKILLS DISPLAY CLASS
// ===================================
class SkillsManager {
	constructor() {
		this.currentCategory = 'diseño';
		this.skillsGrid = document.getElementById('skills-grid');
		this.skillTabs = document.querySelectorAll('.skill-tab');
		this.init();
	}

	init() {
		this.setupTabs();
		this.displaySkills(this.currentCategory);
	}

	setupTabs() {
		this.skillTabs.forEach(tab => {
			tab.addEventListener('click', (e) => {
				this.handleTabClick(e.currentTarget);
			});
		});
	}

	handleTabClick(tab) {
		const category = tab.dataset.category;
		
		// Update active tab
		this.skillTabs.forEach(t => t.classList.remove('active'));
		tab.classList.add('active');
		
		// Update skills display
		this.currentCategory = category;
		this.displaySkills(category);
	}

	displaySkills(category) {
		const skills = skillsData[category];
		
		// Fade out current skills
		this.skillsGrid.style.opacity = '0';
		
		setTimeout(() => {
			// Clear current skills
			this.skillsGrid.innerHTML = '';
			
			// Create skill cards
			skills.forEach((skill, index) => {
				const card = this.createSkillCard(skill, index);
				this.skillsGrid.appendChild(card);
			});
			
			// Fade in new skills
			this.skillsGrid.style.opacity = '1';
			
			// Animate cards with stagger effect
			this.animateCards();
		}, 300);
	}

	createSkillCard(skill, index) {
		const card = document.createElement('div');
		card.className = 'skill-card';
		card.style.transitionDelay = `${index * 0.1}s`;
		
		card.innerHTML = `
			<div class="skill-icon">${skill.icon}</div>
			<div class="skill-name">${skill.nombre}</div>
			<div class="skill-bar">
				<div class="skill-progress" data-progress="${skill.dominio}"></div>
			</div>
			<span class="skill-percentage">${skill.dominio}%</span>
		`;
		
		return card;
	}

	animateCards() {
		const cards = this.skillsGrid.querySelectorAll('.skill-card');
		const progressBars = this.skillsGrid.querySelectorAll('.skill-progress');
		
		setTimeout(() => {
			cards.forEach(card => {
				card.classList.add('visible');
			});
			
			// Animate progress bars
			progressBars.forEach(bar => {
				const progress = bar.dataset.progress;
				bar.style.width = `${progress}%`;
			});
		}, 50);
	}
}

// ===================================
// SMOOTH SCROLL ENHANCEMENT
// ===================================
class SmoothScroll {
	constructor() {
		this.init();
	}

	init() {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', (e) => {
				e.preventDefault();
				const targetId = anchor.getAttribute('href');
				
				if (targetId === '#') return;
				
				const targetElement = document.querySelector(targetId);
				
				if (targetElement) {
					const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
					
					window.scrollTo({
						top: offsetTop,
						behavior: 'smooth'
					});
				}
			});
		});
	}
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
class AnimationObserver {
	constructor() {
		this.observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};
		this.init();
	}

	init() {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					
					// Optional: unobserve after animation
					// observer.unobserve(entry.target);
				}
			});
		}, this.observerOptions);

		// Observe elements
		const elementsToAnimate = document.querySelectorAll(
			'.fade-in, .project-card, .skill-card, .stat, .contact-item'
		);
		
		elementsToAnimate.forEach(el => observer.observe(el));
	}
}

// ===================================
// NAVBAR SCROLL BEHAVIOR
// ===================================
class NavbarController {
	constructor() {
		this.navbar = document.querySelector('.navbar');
		this.lastScroll = 0;
		this.init();
	}

	init() {
		window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
	}

	handleScroll() {
		const currentScroll = window.pageYOffset;
		
		if (currentScroll <= 0) {
			this.navbar.classList.remove('scroll-up');
			this.navbar.classList.remove('scroll-down');
			return;
		}
		
		if (currentScroll > this.lastScroll && !this.navbar.classList.contains('scroll-down')) {
			// Scrolling down
			this.navbar.classList.remove('scroll-up');
			this.navbar.classList.add('scroll-down');
		} else if (currentScroll < this.lastScroll && this.navbar.classList.contains('scroll-down')) {
			// Scrolling up
			this.navbar.classList.remove('scroll-down');
			this.navbar.classList.add('scroll-up');
		}
		
		this.lastScroll = currentScroll;
	}
}

// ===================================
// MOBILE MENU
// ===================================
class MobileMenu {
	constructor() {
		this.menuToggle = document.querySelector('.menu-toggle');
		this.navMenu = document.querySelector('.nav-menu');
		this.init();
	}

	init() {
		if (!this.menuToggle || !this.navMenu) return;

		this.menuToggle.addEventListener('click', () => this.toggleMenu());
		
		// Close menu when clicking on links
		this.navMenu.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => this.closeMenu());
		});
		
		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!this.navMenu.contains(e.target) && !this.menuToggle.contains(e.target)) {
				this.closeMenu();
			}
		});
	}

	toggleMenu() {
		this.navMenu.classList.toggle('active');
		this.menuToggle.classList.toggle('active');
		
		const isExpanded = this.menuToggle.classList.contains('active');
		this.menuToggle.setAttribute('aria-expanded', isExpanded);
	}

	closeMenu() {
		this.navMenu.classList.remove('active');
		this.menuToggle.classList.remove('active');
		this.menuToggle.setAttribute('aria-expanded', 'false');
	}
}

// ===================================
// CONTACT FORM HANDLER
// ===================================
class ContactForm {
	constructor() {
		this.form = document.getElementById('contactForm');
		this.init();
	}

	init() {
		if (!this.form) return;

		this.form.addEventListener('submit', (e) => this.handleSubmit(e));
	}

	async handleSubmit(e) {
		e.preventDefault();
		
		const submitButton = this.form.querySelector('button[type="submit"]');
		const originalText = submitButton.textContent;
		
		// Disable button and show loading state
		submitButton.disabled = true;
		submitButton.textContent = 'Enviando...';
		
		try {
			const formData = new FormData(this.form);
			const response = await fetch(this.form.action, {
				method: 'POST',
				body: formData,
				headers: {
					'Accept': 'application/json'
				}
			});
			
			if (response.ok) {
				this.showMessage('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
				this.form.reset();
			} else {
				const data = await response.json();
				if (data.errors) {
					this.showMessage('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
				}
			}
		} catch (error) {
			this.showMessage('Error de conexión. Verifica tu internet e intenta nuevamente.', 'error');
		} finally {
			// Re-enable button
			submitButton.disabled = false;
			submitButton.textContent = originalText;
		}
	}

	showMessage(message, type = 'success') {
		// Remove any existing messages
		const existingMessage = this.form.querySelector('.form-message');
		if (existingMessage) {
			existingMessage.remove();
		}
		
		// Create message element
		const messageEl = document.createElement('div');
		messageEl.className = `form-message form-message-${type}`;
		messageEl.textContent = message;
		messageEl.style.cssText = `
			padding: 1rem;
			margin-top: 1rem;
			border-radius: 8px;
			background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
			color: ${type === 'success' ? '#155724' : '#721c24'};
			border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
			animation: slideIn 0.3s ease-out;
		`;
		
		// Insert after form
		this.form.appendChild(messageEl);
		
		// Remove after 5 seconds
		setTimeout(() => {
			messageEl.style.opacity = '0';
			messageEl.style.transition = 'opacity 0.3s ease-out';
			setTimeout(() => messageEl.remove(), 300);
		}, 5000);
	}
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
class PerformanceOptimizer {
	constructor() {
		this.init();
	}

	init() {
		// Lazy load images
		this.lazyLoadImages();
		
		// Preload critical resources
		this.preloadResources();
	}

	lazyLoadImages() {
		const images = document.querySelectorAll('img[loading="lazy"]');
		
		if ('loading' in HTMLImageElement.prototype) {
			// Browser supports native lazy loading
			return;
		}
		
		// Fallback for browsers that don't support native lazy loading
		const imageObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.src = img.dataset.src;
					img.classList.remove('lazy');
					imageObserver.unobserve(img);
				}
			});
		});
		
		images.forEach(img => imageObserver.observe(img));
	}

	preloadResources() {
		// Preload fonts
		const fonts = [
			'/fonts/HelveticaNeueLTPro-BlkCn.otf',
			'/fonts/HelveticaNeueLTPro-MdCn.otf'
		];
		
		fonts.forEach(font => {
			const link = document.createElement('link');
			link.rel = 'preload';
			link.as = 'font';
			link.href = font;
			link.crossOrigin = 'anonymous';
			document.head.appendChild(link);
		});
	}
}

// ===================================
// CLIENTS ORBIT CONTROLLER
// ===================================
class ClientsOrbit {
	constructor() {
		this.orbitContainer = document.querySelector('.clients-orbit-container');
		this.clientNodes = document.querySelectorAll('.client-node');
		this.lines = document.querySelectorAll('.connection-lines line');
		this.init();
	}

	init() {
		if (!this.orbitContainer) return;

		// Update line coordinates to match node positions
		// this.updateLineCoordinates(); // Comentado - usando coordenadas HTML manuales

		// Add hover effects
		this.clientNodes.forEach((node, index) => {
			node.addEventListener('mouseenter', () => this.handleNodeHover(node, index));
			node.addEventListener('mouseleave', () => this.handleNodeLeave(node));
		});

		// Update line coordinates based on actual node positions
		this.updateLineCoordinates();

		// Optional: Enable automatic rotation
		// Uncomment the line below to enable slow rotation
		// this.orbitContainer.classList.add('animated');

		// Add entrance animation
		this.animateEntrance();
	}

	updateLineCoordinates() {
		// Get the actual position of nodes in the viewport
		const container = document.querySelector('.clients-orbit-container');
		const containerRect = container.getBoundingClientRect();
		const centerX = 350; // SVG center
		const centerY = 350;
		
		this.clientNodes.forEach((node, index) => {
			const nodeRect = node.getBoundingClientRect();
			const line = this.lines[index];
			
			// Calculate node center relative to container
			const nodeCenterX = nodeRect.left + nodeRect.width / 2 - containerRect.left;
			const nodeCenterY = nodeRect.top + nodeRect.height / 2 - containerRect.top;
			
			// Convert to SVG coordinates (container is 700x700)
			const svgX = (nodeCenterX / containerRect.width) * 700;
			const svgY = (nodeCenterY / containerRect.height) * 700;
			
			line.setAttribute('x1', centerX);
			line.setAttribute('y1', centerY);
			line.setAttribute('x2', svgX.toFixed(1));
			line.setAttribute('y2', svgY.toFixed(1));
		});
	}

	handleNodeHover(node, index) {
		// Increase z-index and dim other nodes
		node.style.zIndex = '10';
		this.clientNodes.forEach((otherNode, otherIndex) => {
			if (otherIndex !== index) {
				otherNode.style.opacity = '0.3';
			}
		});
		
		// Highlight ONLY the corresponding line
		const line = this.lines[index];
		if (line) {
			line.setAttribute('opacity', '0.8');
			line.setAttribute('stroke-width', '4');
		}
	}

	handleNodeLeave(node) {
		// Reset all nodes
		node.style.zIndex = '5';
		this.clientNodes.forEach(otherNode => {
			otherNode.style.opacity = '1';
		});
		
		// Hide all lines again
		this.lines.forEach(line => {
			line.setAttribute('opacity', '0');
			line.setAttribute('stroke-width', '2');
		});
	}

	animateEntrance() {
		this.clientNodes.forEach((node, index) => {
			node.style.opacity = '0';
			node.style.transform = node.style.transform + ' scale(0)';
			
			setTimeout(() => {
				node.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
				node.style.opacity = '1';
				
				// Get the current transform and update it
				const currentTransform = window.getComputedStyle(node).transform;
				const matrix = new DOMMatrix(currentTransform);
				
				// Extract rotation and translation
				const angle = Math.atan2(matrix.b, matrix.a);
				const positionAngle = (index * 60) * Math.PI / 180;
				const radius = 280;
				
				node.style.transform = `rotate(${positionAngle}rad) translate(${radius}px) rotate(-${positionAngle}rad) scale(1)`;
			}, index * 100);
		});
		
		// Lines stay invisible - only appear on hover
		this.lines.forEach((line) => {
			line.setAttribute('opacity', '0');
		});
	}

	// Method to toggle automatic rotation
	toggleRotation() {
		this.orbitContainer.classList.toggle('animated');
	}
}

// ===================================
// INITIALIZE ALL MODULES
// =================================== */
document.addEventListener('DOMContentLoaded', () => {
	// Initialize all modules
	new SkillsManager();
	new SmoothScroll();
	new AnimationObserver();
	new NavbarController();
	new MobileMenu();
	new ContactForm();
	new PerformanceOptimizer();
	new ClientsOrbit();
	
	console.log('✅ Portfolio initialized successfully!');
});

// ===================================
// EXPORT FOR TESTING (optional)
// ===================================
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		SkillsManager,
		SmoothScroll,
		AnimationObserver,
		NavbarController,
		MobileMenu,
		ContactForm,
		PerformanceOptimizer
	};
}
