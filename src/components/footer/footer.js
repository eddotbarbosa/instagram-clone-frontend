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
            <option value="cs">??e??tina</option>
            <option value="da">Dansk</option>
            <option value="de">Deutsch</option>
            <option value="el">????????????????</option>
            <option value="en">English</option>
            <option value="en-gb">English (UK)</option>
            <option value="es">Espa??ol (Espa??a)</option>
            <option value="es-la">Espa??ol</option>
            <option value="fi">Suomi</option>
            <option value="fr">Fran??ais</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="it">Italiano</option>
            <option value="ja">?????????</option>
            <option value="ko">?????????</option>
            <option value="ms">Bahasa Melayu</option>
            <option value="nb">Norsk</option>
            <option value="nl">Nederlands</option>
            <option value="pl">Polski</option>
            <option value="pt-br">Portugu??s (Brasil)</option>
            <option value="pt">Portugu??s (Portugal)</option>
            <option value="ru">??????????????</option>
            <option value="sv">Svenska</option>
            <option value="th">?????????????????????</option>
            <option value="tl">Filipino</option>
            <option value="tr">T??rk??e</option>
            <option value="zh-cn">??????(??????)</option>
            <option value="zh-tw">??????(??????)</option>
            <option value="bn">???????????????</option>
            <option value="gu">?????????????????????</option>
            <option value="hi">??????????????????</option>
            <option value="hr">Hrvatski</option>
            <option value="hu">Magyar</option>
            <option value="kn">???????????????</option>
            <option value="ml">??????????????????</option>
            <option value="mr">???????????????</option>
            <option value="ne">??????????????????</option>
            <option value="pa">??????????????????</option>
            <option value="si">???????????????</option>
            <option value="sk">Sloven??ina</option>
            <option value="ta">???????????????</option>
            <option value="te">??????????????????</option>
            <option value="vi">Ti???ng Vi???t</option>
            <option value="zh-hk">??????(??????)</option>
            <option value="bg">??????????????????</option>
            <option value="fr-ca">Fran??ais (Canada)</option>
            <option value="ro">Rom??n??</option>
            <option value="sr">????????????</option>
            <option value="uk">????????????????????</option>
          </select>
        </div>
        <div className={`${layout['ml-2']}`}>
          <p className={`${styles['copyright']}`}>?? 2021 Instagram from Facebook</p>
        </div>
      </div>
    </footer>
  );
}
