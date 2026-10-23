/* ===================== Loader ===================== */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 500);
});

/* ===================== Footer year ===================== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===================== Mobile nav toggle ===================== */
const navToggle = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});

/* ===================== Header scroll state + active link ===================== */
const header = document.getElementById('header');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);

  let current = sections[0]?.id;
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  sections.forEach(sec => {
    if (scrollPos >= sec.offsetTop) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ===================== Scroll reveal ===================== */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

/* ===================== Typed role text ===================== */
const roles = ['live e-commerce stores', 'brand creatives & logos', 'edited video content', 'responsive front-ends'];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

/* ===================== Counter animation ===================== */
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(el => counterObserver.observe(el));

/* ===================== 3D Tilt effect on cards ===================== */
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ===================== Three.js background ===================== */
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!window.THREE || !canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 32;

  /* Starfield particles */
  const starCount = window.innerWidth < 768 ? 700 : 1600;
  const starGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 120;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 10;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMat = new THREE.PointsMaterial({ color: 0x4fd6ff, size: 0.16, transparent: true, opacity: 0.7 });
  const stars = new THREE.Points(starGeo, starMat);
  scene.add(stars);

  /* Floating wireframe icosahedron */
  const icoGeo = new THREE.IcosahedronGeometry(9, 1);
  const icoMat = new THREE.MeshBasicMaterial({ color: 0x4fd6ff, wireframe: true, transparent: true, opacity: 0.35 });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  ico.position.set(18, 4, -8);
  scene.add(ico);

  /* Secondary smaller torus */
  const torusGeo = new THREE.TorusGeometry(5, 0.4, 8, 60);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x8a6bff, wireframe: true, transparent: true, opacity: 0.22 });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(-27, -9, -16);
  scene.add(torus);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animate() {
    requestAnimationFrame(animate);

    stars.rotation.y += 0.0003;
    stars.rotation.x += 0.0001;

    ico.rotation.x += 0.0016;
    ico.rotation.y += 0.0022;

    torus.rotation.x += 0.001;
    torus.rotation.y -= 0.0014;

    camera.position.x += (mouseX * 6 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 6 - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();
})();
