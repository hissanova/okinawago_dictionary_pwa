import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>この辞典について</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">この辞典について</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h3>この辞典について</h3>
        <p>
          本オンライン辞典のデータは、国立国語研究所が発行しているの以下の辞書データを元に作られています。
          <ul>
            <li><a href="https://mmsrv.ninjal.ac.jp/okinawago/" target="_blank" rel="noreferrer">沖縄語辞典</a></li>
            <li><a href="https://repository.ninjal.ac.jp/?action=repository_uri&item_id=3226&file_id=43&file_no=1">うちなーぐち活用辞典(宮良信詳著)</a></li>
          </ul>

        </p>
        <h3>リンク集</h3>
        <h5>ソースコード</h5>
        <p>
          <a href="https://github.com/hissanova/okinawago_dictionary_pwa">
            https://github.com/hissanova/okinawago_dictionary_pwa
          </a>
        </p>
        <h5>沖縄語辞典の電子データ</h5>
        <p>
          <a href="https://github.com/hissanova/okinawago_dictionary.git">
            https://github.com/hissanova/okinawago_dictionary.git
          </a>
        </p>
        <h5>Twitter アカウント</h5>
        <p><a href="https://twitter.com/okinawago_app">@okinawago_app </a></p>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
