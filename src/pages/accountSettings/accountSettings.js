import {useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import api from '../../services/api.js';

import styles from './accountSettings.module.scss';
import layout from '../../styles/layout.module.scss';

import SettingsCard from '../../components/settingsCard/settingsCard';
import EditProfile from '../../components/editProfile/editProfile';
import {Modal, ModalButton, ModalHeader, handleModal} from '../../components/modal/modal.js';


export default function AccountSettings ({children}) {
  const [uploadPhotoModal, setUploadPhotoModal] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const targetUploadPhoto = function (event) {
    document.getElementById('picture').click();
  }

  const handleUploadPhoto = async function (event) {
    const file = event.target.files[0];

    const formData = new FormData();

    formData.append('picture', file);

    const postCreation = await api.put('/users/change-avatar', formData);

    console.log(postCreation.data);

    return history.go('/accounts/edit');
  }

  return (
    <main className={`${styles['account-settings-container']} ${layout['flex']} ${layout['justify-center']} ${layout['align-center']}`}>
      <Modal display={uploadPhotoModal}>
        <ModalHeader>Change Profile Photo</ModalHeader>
        <ModalButton color="blue" onClick={targetUploadPhoto}>Upload Photo</ModalButton>
        <ModalButton color="red">Remove Current Photo</ModalButton>
        <form className={`${layout['hide']}`}>
          <input type="file" name="picture" id="picture" onChange={(event) => handleUploadPhoto(event)}/>
        </form>
        <ModalButton onClick={() => handleModal(uploadPhotoModal, setUploadPhotoModal)}>Cancel</ModalButton>
      </Modal>
      <SettingsCard className={`${styles['settings-card-container']} `}>
        {(location.pathname === '/accounts/edit') && (
          <EditProfile modalHandler={() => handleModal(uploadPhotoModal, setUploadPhotoModal)} />
        )}
      </SettingsCard>
    </main>
  );
}
