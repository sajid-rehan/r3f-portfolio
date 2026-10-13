import PROJECTS from '../../data/projects';

const GROUPS = [
  {
    name: 'Languages',
    items: [
      'Java',
      'Python',
      'Go',
      'Rust',
      'Kotlin',
      'Dart',
      'TypeScript',
      'JavaScript',
    ],
  },
  {
    name: 'Frameworks',
    items: [
      'React',
      'Svelte',
      'Flutter',
      'Node.js',
      'Express',
      'Three.js',
      'React Three Fiber',
      'Tauri',
    ],
  },
  {
    name: 'DevOps',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'Git'],
  },
  { name: 'Creative', items: ['Blender', 'Unity', 'WebGL'] },
];

// Projects that list a skill in their stack; shown as a count and tooltip.
const projectsUsing = (skill) =>
  PROJECTS.filter((p) =>
    p.stack.some((s) => s.toLowerCase() === skill.toLowerCase()),
  );

const SkillsApp = () => (
  <div className='app-skills'>
    <p className='muted'>
      The number next to a skill shows how many of my projects use it.
    </p>
    {GROUPS.map((g) => (
      <section key={g.name}>
        <h3>{g.name}</h3>
        <div className='chips'>
          {g.items.map((skill) => {
            const used = projectsUsing(skill);
            return (
              <span
                key={skill}
                className='chip'
                title={
                  used.length ? used.map((p) => p.name).join(', ') : undefined
                }
              >
                {skill}
                {used.length > 0 && <b className='chip-count'>{used.length}</b>}
              </span>
            );
          })}
        </div>
      </section>
    ))}
  </div>
);

export default SkillsApp;
