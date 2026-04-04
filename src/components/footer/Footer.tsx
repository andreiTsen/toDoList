import icon from '../../assets/icon.svg';

function Footer() {
    return (
        <footer className="footer">
          <button className="add-task-btn" type="button">
            <img className="icon" src={icon} alt="" />
            <span>Новая задача</span>
          </button>
        </footer>
    )
};

export default Footer;