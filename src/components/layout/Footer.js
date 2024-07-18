import "./Footer.css";
import appStore from "../../images/app stores.png";

function Footer() {
  return (
    <footer>
      <div className="leftFooter">
        <h4>Download our app</h4>
        <p>Download Apps for Android and IOS devices</p>
        <img src={appStore} alt="app store"/>
      </div>
      <div className="midFooter">
        <h1>Ecommerce</h1>
        <p>High quality is our first priority</p>
        <p>Copy right &copy; Amir Hussain Shah </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a>Instagram</a>
        <a>Facebook</a>
        <a>Youtube</a>
      </div>
    </footer>
  );
}

export default Footer;
