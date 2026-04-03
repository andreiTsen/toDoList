const elements = [
    { id: 1, name: 'Все', active: true },
    { id: 2, name: 'К выполнению', active: false },
    { id: 3, name: 'В процессе', active: false },
    { id: 4, name: 'Готово', active: false },
];

function Filters() {
    return (
        <nav className="filter-nav">
          <ul className="filter-list">
            {elements.map((elements) => {
                return (
                    <li key={elements.id}><button className={`filter-btn ${elements.active ? 'active' : ''}`}>{elements.name}</button></li>
                )
            })}
          </ul>
        </nav>
    )
};

export default Filters;