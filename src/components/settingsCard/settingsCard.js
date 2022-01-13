import {Link} from 'react-router-dom';

import styles from './settingsCard.module.scss';
import layout from '../../styles/layout.module.scss';

export default function SettingsCard ({children, className}) {
  return (
    <div className={className + `${styles['container-box']} ${layout['flex']} ${layout['mb-4']}`}>
      <ul className={`${styles['list']} ${layout['flex']} ${layout['column']} ${layout['justify-between']} ${layout['hide-sm']}`}>
        <div>
          <li className={`${styles['list-item']} ${styles['selected']}`}>
            <Link className={`${styles['link']} ${styles['selected']}`} to="#">Edit Profile</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Professional Account</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Change Password</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Apps and Websites</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Email and SMS</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Push Notifications</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Manage Contacts</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Privacy and Security</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Login Activity</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Emails from Instagram</Link >
          </li>
          <li className={`${styles['list-item']}`}>
            <Link className={`${styles['link']}`} to="#">Help</Link >
          </li>
          <div className={`${layout['mt-2']} ${layout['mb-2']} ${layout['pl-4']}`}>
            <button className={`${styles['blue-button']}`}>Switch to Personal Account</button>
          </div>
        </div>
        <div className={`${styles['account-center']} ${layout['flex']} ${layout['column']} ${layout['align-start']} ${layout['pl-4']}`}>
          <svg className={`${layout['mb-2']} ${layout['mt-4']}`} aria-label="Facebook wordmark and family of apps logo" height="12" viewBox="0 0 500 100" width="60" >
            <g>
              <path d="M182.141 3.213h18.808l31.98 57.849 31.979-57.849h18.401V98.27h-15.345V25.416l-28.042 50.448h-14.394l-28.042-50.448V98.27h-15.345V3.213ZM332.804 99.967c-7.107 0-13.353-1.573-18.739-4.718-5.387-3.146-9.586-7.504-12.595-13.07-3.011-5.569-4.515-11.95-4.515-19.148 0-7.287 1.47-13.738 4.413-19.35 2.942-5.613 7.027-10.004 12.255-13.173 5.229-3.168 11.238-4.753 18.027-4.753 6.744 0 12.55 1.596 17.416 4.787 4.865 3.191 8.611 7.661 11.237 13.41 2.624 5.749 3.938 12.492 3.938 20.233v4.21h-52.077c.95 5.794 3.292 10.354 7.027 13.68 3.735 3.328 8.453 4.991 14.157 4.991 4.571 0 8.509-.679 11.814-2.037 3.303-1.358 6.404-3.417 9.302-6.178l8.147 9.98c-8.103 7.425-18.038 11.136-29.807 11.136Zm11.204-56.389c-3.215-3.281-7.425-4.923-12.629-4.923-5.07 0-9.314 1.676-12.731 5.025-3.418 3.35-5.58 7.854-6.484 13.512h37.343c-.453-5.794-2.286-10.331-5.499-13.614ZM382.846 40.014h-14.123V27.453h14.123V6.676h14.802v20.777h21.455v12.561h-21.455v31.844c0 5.295.905 9.075 2.716 11.338 1.809 2.264 4.911 3.395 9.302 3.395 1.945 0 3.598-.078 4.956-.237a92.35 92.35 0 0 0 4.481-.646v12.425c-1.675.498-3.564.906-5.669 1.223a44.63 44.63 0 0 1-6.62.475c-15.979 0-23.968-8.735-23.968-26.208V40.014ZM496.236 98.27h-14.53v-9.913c-2.58 3.712-5.862 6.575-9.845 8.588-3.983 2.014-8.51 3.022-13.579 3.022-6.247 0-11.78-1.596-16.601-4.787s-8.612-7.581-11.373-13.172c-2.761-5.59-4.142-11.983-4.142-19.18 0-7.243 1.403-13.648 4.21-19.216 2.806-5.567 6.688-9.935 11.645-13.104 4.956-3.168 10.648-4.753 17.075-4.753 4.844 0 9.189.94 13.037 2.818a25.768 25.768 0 0 1 9.573 7.978v-9.098h14.53V98.27Zm-14.801-46.035c-1.585-4.028-4.085-7.207-7.503-9.54-3.418-2.33-7.367-3.496-11.848-3.496-6.338 0-11.384 2.128-15.141 6.382-3.758 4.255-5.635 10.004-5.635 17.246 0 7.289 1.809 13.06 5.431 17.314 3.621 4.255 8.532 6.382 14.734 6.382 4.571 0 8.645-1.176 12.222-3.53 3.575-2.353 6.155-5.522 7.74-9.506V52.235Z" fill="#1C2B33"></path>
              <path d="M108 0C95.66 0 86.015 9.294 77.284 21.1 65.284 5.821 55.25 0 43.24 0 18.76 0 0 31.862 0 65.586 0 86.69 10.21 100 27.31 100c12.308 0 21.16-5.803 36.897-33.31 0 0 6.56-11.584 11.072-19.564 1.582 2.553 3.243 5.3 4.997 8.253l7.38 12.414C102.03 91.848 110.038 100 124.551 100c16.659 0 25.931-13.492 25.931-35.034C150.483 29.656 131.301 0 108 0ZM52.207 59.241c-12.759 20-17.172 24.483-24.276 24.483-7.31 0-11.655-6.418-11.655-17.862 0-24.483 12.207-49.517 26.759-49.517 7.88 0 14.465 4.55 24.552 18.991-9.578 14.691-15.38 23.905-15.38 23.905Zm48.153-2.517-8.823-14.715a301.425 301.425 0 0 0-6.884-10.723c7.952-12.274 14.511-18.39 22.313-18.39 16.206 0 29.172 23.863 29.172 53.173 0 11.172-3.659 17.655-11.241 17.655-7.268 0-10.739-4.8-24.537-27Z" fill="#0180FA"></path>
              <path d="M145.586 35H130.66c3.452 8.746 5.478 19.482 5.478 31.069 0 11.172-3.659 17.655-11.241 17.655-1.407 0-2.672-.18-3.897-.631V99.82c1.143.122 2.324.18 3.552.18 16.659 0 25.931-13.492 25.931-35.034 0-10.737-1.774-20.95-4.897-29.966Z" fill="url(#b)"></path>
              <path d="M43.241 0c.254 0 .507.003.759.008v16.36c-.32-.015-.642-.023-.965-.023-14.183 0-26.139 23.782-26.736 47.655H.014C.59 30.87 19.143 0 43.24 0Z" fill="url(#c)"></path>
              <path d="M43.241 0c11.152 0 20.601 5.02 31.502 17.971 3.065 3.828 6.761 8.805 10.716 14.557l.017.025.025-.003a311.041 311.041 0 0 1 6.036 9.459l8.823 14.715c13.798 22.2 17.269 27 24.537 27H125v16.273c-.149.002-.298.003-.448.003-14.513 0-22.522-8.152-36.897-32.207l-7.38-12.414a596.368 596.368 0 0 0-2.294-3.834L78 51.5c-5.5-9-9-14.5-12-18.5l-.05.038c-9.18-12.63-15.47-16.693-22.916-16.693H43V0L43.241 0Z" fill="url(#d)"></path>
            </g>
          </svg>
          <button className={`${styles['blue-button']} ${layout['mb-2']}`}>Accounts Center</button>
          <div className={`${layout['mb-3']}`}>
            <p className={`${styles['account-center-text']} ${layout['pr-4']}`}>Control settings for connected experiences across Instagram, the Facebook app and Messenger, including story and post sharing and logging in.</p>
          </div>
        </div>
      </ul>
      <div className={`${styles['dynamic-container']}`}>
        {children}
      </div>
    </div>
  );
}
