import {Link} from 'react-router-dom';

import styles from './footer.module.scss';
import layout from '../../styles/layout.module.scss';

export default function Footer (props) {
  return (
    <footer className={`${layout['col-12']}`}>
      <div className={`${layout['flex']} ${layout['column']} ${layout['align-center']}`}>
        <div>
          <ul className={`${styles['list']} ${layout['flex']} ${layout['justify-center']} ${layout['wrap']}`}>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">About</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">Blog</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">Jobs</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">Help</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">API</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">Privacy</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">Terms</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">Top Accounts</Link>
            </li>
            <li className={`${layout['mr-2']}`}>
              <Link className={`${styles['list-link']}`} to="#">Hashtags</Link>
            </li>
            <li>
              <Link className={`${styles['list-link']}`} to="#">Locations</Link>
            </li>
          </ul>
        </div>
        {props.topics &&
          <div>
            <ul className={`${styles['list']} ${layout['flex']} ${layout['justify-center']} ${layout['wrap']}`}>
              <li className={`${layout['mr-2']}`}>
                <Link className={`${styles['list-link']}`} to="#">Beauty</Link>
              </li>
              <li className={`${layout['mr-2']}`}>
                <Link className={`${styles['list-link']}`} to="#">Dance & Performance</Link>
              </li>
              <li className={`${layout['mr-2']}`}>
                <Link className={`${styles['list-link']}`} to="#">Fitness</Link>
              </li>
              <li className={`${layout['mr-2']}`}>
                <Link className={`${styles['list-link']}`} to="#">Food & Drink</Link>
              </li>
              <li className={`${layout['mr-2']}`}>
                <Link className={`${styles['list-link']}`} to="#">Home & Garden</Link>
              </li>
              <li className={`${layout['mr-2']}`}>
                <Link className={`${styles['list-link']}`} to="#">Music</Link>
              </li>
              <li>
                <Link className={`${styles['list-link']}`} to="#">Visual Arts</Link>
              </li>
            </ul>
          </div>
        }
      </div>
      <div className={`${layout['flex']} ${layout['justify-center']} ${layout['align-end']} ${layout['mt-3']} ${layout['mb-6']}`}>
        <div>
          <select className={styles['select']} name="" id="" defaultValue="en">
            <option value="af">Afrikaans</option>
            <option value="cs">Čeština</option>
            <option value="da">Dansk</option>
            <option value="de">Deutsch</option>
            <option value="el">Ελληνικά</option>
            <option value="en">English</option>
            <option value="en-gb">English (UK)</option>
            <option value="es">Español (España)</option>
            <option value="es-la">Español</option>
            <option value="fi">Suomi</option>
            <option value="fr">Français</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="it">Italiano</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="nb">Norsk</option>
            <option value="nl">Nederlands</option>
            <option value="pl">Polski</option>
            <option value="pt-br">Português (Brasil)</option>
            <option value="pt">Português (Portugal)</option>
            <option value="ru">Русский</option>
            <option value="sv">Svenska</option>
            <option value="th">ภาษาไทย</option>
            <option value="tl">Filipino</option>
            <option value="tr">Türkçe</option>
            <option value="zh-cn">中文(简体)</option>
            <option value="zh-tw">中文(台灣)</option>
            <option value="bn">বাংলা</option>
            <option value="gu">ગુજરાતી</option>
            <option value="hi">हिन्दी</option>
            <option value="hr">Hrvatski</option>
            <option value="hu">Magyar</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="ml">മലയാളം</option>
            <option value="mr">मराठी</option>
            <option value="ne">नेपाली</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
            <option value="si">සිංහල</option>
            <option value="sk">Slovenčina</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="vi">Tiếng Việt</option>
            <option value="zh-hk">中文(香港)</option>
            <option value="bg">Български</option>
            <option value="fr-ca">Français (Canada)</option>
            <option value="ro">Română</option>
            <option value="sr">Српски</option>
            <option value="uk">Українська</option>
          </select>
        </div>
        <div className={`${layout['ml-2']}`}>
          <p className={`${styles['copyright']}`}>© 2021 Instagram from Facebook</p>
        </div>
      </div>
    </footer>
  );
}
