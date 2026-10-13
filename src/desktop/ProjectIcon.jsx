const base = import.meta.env.BASE_URL;

/** Project icon from public/assets/projects, or an initials badge fallback. */
const ProjectIcon = ({ project, size = 38 }) => {
  const style = { width: size, height: size, borderRadius: size * 0.24 };

  if (project.icon) {
    return (
      <img
        className='picon'
        style={style}
        src={`${base}assets/projects/${project.icon}`}
        alt=''
        draggable={false}
      />
    );
  }

  return (
    <span
      className='picon fallback'
      style={{ ...style, background: project.accent, fontSize: size * 0.4 }}
    >
      {project.short.slice(0, 2)}
    </span>
  );
};

export default ProjectIcon;
