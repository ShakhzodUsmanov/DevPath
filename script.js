let translations = {};
let links = {};

async function loadLanguage(lang) {
  const t = await fetch(`locales/${lang}/translation.json`).then(res => res.json());
  const l = await fetch('links.json').then(res => res.json());

  document.getElementById('title').textContent = t.title;
  document.getElementById('description').textContent = t.description;

  const content = document.getElementById('content');
  content.innerHTML = '';

  Object.keys(t.sections).forEach(sectionKey => {
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.textContent = t.sections[sectionKey];
    section.appendChild(h2);

    const ul = document.createElement('ul');
    if (l[sectionKey]) {
      l[sectionKey].forEach(([url, labelObj]) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = labelObj[lang] || labelObj['ru'];
        li.appendChild(a);
        ul.appendChild(li);
      });
    }
    section.appendChild(ul);
    content.appendChild(section);
  });
}

function setLanguage(lang) {
  loadLanguage(lang);
}

setLanguage('ru');
