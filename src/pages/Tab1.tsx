import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonSearchbar, IonItem, IonLabel, IonList } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>沖縄語辞典</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">沖縄語辞典</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Search></Search>
      </IonContent>
    </IonPage>
  );
};

const data = [
  'なは',
  'こざ',
];

function Search() {
  const [results, setResults] = React.useState([...data]);

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
  };

  return (
    <>
      <IonSearchbar
        debounce={1000}
        onIonInput={(ev) => handleInput(ev)}
        animated={true}
        placeholder="かなで入力"
      ></IonSearchbar>
      <p>{results.length} 件の見出し語がヒットしました。</p>
      <IonList>
        {results.map((result, objectID) => (
          <IonItem key={objectID}>{result}</IonItem>
        ))}
      </IonList>
    </>
  );
}

export default Tab1;
