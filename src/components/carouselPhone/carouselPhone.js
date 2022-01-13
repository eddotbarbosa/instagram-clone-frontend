import styles from './carouselPhone.module.scss';
import layout from '../../styles/layout.module.scss';

import phone from '../../assets/images/phone.png';
import phoneCarousel1 from '../../assets/images/carousel-phone-1.jpg';
import phoneCarousel2 from '../../assets/images/carousel-phone-2.jpg';
import phoneCarousel3 from '../../assets/images/carousel-phone-3.jpg';
import phoneCarousel4 from '../../assets/images/carousel-phone-4.jpg';
import phoneCarousel5 from '../../assets/images/carousel-phone-5.jpg';

export default function Phone ({className}) {
  return (
    <div className={className + `${styles['phone']}`}>
      <img className={`${layout['image-responsive']}`} src={phone} alt="phone"/>
      <div className={`${styles['carousel']}`}>
        <img className={`${styles['carousel-image-1']}`} src={phoneCarousel1} alt="first"/>
        <img className={`${styles['carousel-image-2']}`} src={phoneCarousel2} alt="first"/>
        <img className={`${styles['carousel-image-3']}`} src={phoneCarousel3} alt="first"/>
        <img className={`${styles['carousel-image-4']}`} src={phoneCarousel4} alt="first"/>
        <img className={`${styles['carousel-image-5']}`} src={phoneCarousel5} alt="first"/>
      </div>
    </div>
  );
}
