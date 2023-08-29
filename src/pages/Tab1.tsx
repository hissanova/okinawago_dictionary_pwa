import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonSearchbar, IonItem, IonLabel, IonList } from '@ionic/react';
import './Tab1.css';
const okiDict = require('../static/okinawa_01.json');
const indexToIDDict = okiDict.map((entry: any) => (entry['index'].map((index: string) => [index, entry['id']]))).flat();

function Search() {
  const [results, setResults] = React.useState([]);

  const handleInput = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    console.warn(query, target);
    if (target) query = target.value!;
    setResults(indexToIDDict.filter((d: any) => d[0].indexOf(query) > -1));
  };

  return (
    <>
      <IonSearchbar
        debounce={1000}
        onIonInput={(ev) => handleInput(ev)}
        animated={true}
        placeholder="かなで入力"
      ></IonSearchbar>
      <Message len={results.length}></Message>
      <IonList>
        {results.map((result, objectID) => (
          <IonItem key={objectID}>{result}</IonItem>
        ))}
      </IonList>
    </>
  );
}

type resultsLen = { len: number };
const Message = ({ len }: resultsLen) => {
  if (len == 0)
    return <p>検索ワードを入力して下さい。</p>;
  else
    return <p>{len} 件の見出し語がヒットしました。</p>;
}

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

export default Tab1;
