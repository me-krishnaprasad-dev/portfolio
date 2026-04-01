document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const resumeButton = document.getElementById('resume-button');
if (resumeButton) {
  resumeButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const texRawUrl = 'https://raw.githubusercontent.com/me-krishnaprasad-dev/portfolio/main/resume.tex';
    const compileUrl = `https://latexonline.cc/compile?url=${encodeURIComponent(texRawUrl)}`;

    try {
      const response = await fetch(compileUrl);
      if (!response.ok) throw new Error('Could not compile resume PDF');

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Krishna-Prasad-A-Resume.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(error);
      window.open(compileUrl, '_blank');
    }
  });
}

