import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>辞典の使い方</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">辞典の使い方</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h3>かな表記について</h3>
        <p>
          沖縄語のかなの表記は、沖縄県が策定した
          <ul>
            <li><a href="https://www.pref.okinawa.lg.jp/site/bunka-sports/bunka/shinko/simakutuba-hyouki.html" target="_blank" rel="noreferrer">『沖縄県における「しまくとぅば」の表記について』</a></li>
          </ul>
          の沖縄語の表記に基づいています。
        </p>
      </IonContent>
    </IonPage >
  );
};

export default Tab2;
