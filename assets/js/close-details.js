// Close other project details when one is opened to avoid layout shifts
document.addEventListener('DOMContentLoaded', () => {
  const nodes = document.querySelectorAll('.project-grid details');
  nodes.forEach(d => d.addEventListener('toggle', () => {
    if (!d.open) return;
    nodes.forEach(other => { if (other !== d) other.open = false; });
  }));
});
