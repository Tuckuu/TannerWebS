async function renderNavigation() {
	const container = document.getElementById('nav');
	if (!container) return console.warn('Dynamic navigation script loaded, but no placeholder found.');

	const fragment = await fetch('./navBar.xml').then((v) => v.text());

	const next = container.nextElementSibling;
	container.outerHTML = fragment;
	fillDynamicsInNavigation(next.previousElementSibling);
}

renderNavigation();